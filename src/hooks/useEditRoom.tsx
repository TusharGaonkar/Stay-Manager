import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import roomsEditFormSchema from '../validators/roomsEditFormSchema';

export default function useEditRoom() {
  const form = useForm<z.infer<typeof roomsEditFormSchema>>({
    resolver: zodResolver(roomsEditFormSchema),
    defaultValues: {},
  });

  return [form, form.handleSubmit] as const;
}
