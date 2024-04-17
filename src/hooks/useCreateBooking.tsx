/* eslint-disable import/extensions */
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import bookingFormSchema from '@/validators/newBookingFormSchema';

export default function useCreateBooking() {
  const form = useForm<z.infer<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),
  });

  return [form, form.handleSubmit] as const;
}

export type BookingFormSchemaType = z.infer<typeof bookingFormSchema>;
