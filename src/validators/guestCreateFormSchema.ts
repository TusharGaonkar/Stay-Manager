import { z } from 'zod';

const guestCreateFormSchema = z.object({
  firstName: z.string().min(2).max(20),
  lastName: z.string().min(2).max(20),
  email: z.string().email().optional(),
  nationality: z.string(),
  nationalID: z.string().min(2).max(30),
});

export default guestCreateFormSchema;
