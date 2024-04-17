import { differenceInDays } from 'date-fns';
import { z } from 'zod';
import {
  DEFAULT_MAX_NO_OF_NIGHTS,
  DEFAULT_MAX_GUESTS_PER_BOOKING,
} from '@/constants/bookingFormDefaults';
import getMaxGuestsPerBooking from '../../api/getMaxGuestsPerBookingApi';
import getMaxNumOfNightsPerBooking from '../../api/getMaxNumOfNightsPerBookingApi';

async function generateBookingFormSchema() {
  try {
    const maxNumOfNights = await getMaxNumOfNightsPerBooking();
    const maxGuestsPerBooking = await getMaxGuestsPerBooking();

    const schema = z
      .object({
        startDate: z.date(),
        endDate: z.date(),
        numGuests: z
          .number()
          .min(0)
          .max(maxGuestsPerBooking ?? DEFAULT_MAX_GUESTS_PER_BOOKING, {
            message: `No rooms available, We have rooms for ${maxGuestsPerBooking}`,
          }),
        hasBreakfast: z.boolean().default(false),
        observations: z.string().max(200).optional(),
        room: z.any(),
      })
      .refine(
        (data) => {
          if (data.room !== undefined || data.room != null) return true;
        },
        {
          message: 'Please select a room',
          path: ['room'],
        }
      )
      .refine(
        (data) => {
          const diffDates = differenceInDays(new Date(data.endDate), new Date(data.startDate));
          return diffDates > 0;
        },
        {
          message: 'End date cannot be before start date',
          path: ['endDate'],
        }
      )
      .refine(
        (data) => {
          const diffDates = differenceInDays(new Date(data.endDate), new Date(data.startDate));
          return diffDates <= maxNumOfNights ?? DEFAULT_MAX_NO_OF_NIGHTS;
        },
        {
          message: `We have restricted booking to a maximum of ${maxNumOfNights} nights due to high demand..`,
          path: ['endDate'],
        }
      );

    return schema;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

const bookingFormSchema = await generateBookingFormSchema();
export default bookingFormSchema;
