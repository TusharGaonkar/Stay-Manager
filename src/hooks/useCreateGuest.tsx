import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import guestCreateFormSchema from '../validators/guestCreateFormSchema';

export default function UseCreateGuest() {
  const form = useForm<z.infer<typeof guestCreateFormSchema>>({
    resolver: zodResolver(guestCreateFormSchema),
  });

  return [form, form.handleSubmit] as const;
}
