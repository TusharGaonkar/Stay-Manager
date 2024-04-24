import { z } from 'zod';

const bookingSettingsFormSchema = z.object({
  minBookingLength: z.number().min(1),
  maxBookingLength: z.number().min(1),
  maxGuestsPerBooking: z.number().min(0),
  breakfastPrice: z.number().min(0),
});

export type BookingSettingsFormSchema = z.infer<typeof bookingSettingsFormSchema>;

export default bookingSettingsFormSchema;
