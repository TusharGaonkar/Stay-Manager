/* eslint-disable @typescript-eslint/no-throw-literal */
import supabase from './supabaseClient';
import { type BookingSettingsFormSchema } from '../src/validators/BookingSettingsFormSchema';

export default async function updateBookingSettings(
  updatedBookingsSettings: BookingSettingsFormSchema
) {
  const { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } =
    updatedBookingsSettings;

  const { data, error } = await supabase
    .from('settings')
    .update({
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    })
    .eq('id', 1)
    .select();

  if (error) throw error;

  return data;
}
