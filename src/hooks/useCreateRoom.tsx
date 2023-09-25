import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import roomsCreateFormSchema from '../validators/roomsCreateFormSchema';

export default function useCreateRoom() {
  const form = useForm<z.infer<typeof roomsCreateFormSchema>>({
    resolver: zodResolver(roomsCreateFormSchema),
  });
  return [form, form.handleSubmit] as const;
}
