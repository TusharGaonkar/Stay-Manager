import { z } from 'zod';

const loginFormSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(40, { message: 'Password must be at most 40 characters' }),
});

type LoginFormSchemaType = z.infer<typeof loginFormSchema>;

export { loginFormSchema, type LoginFormSchemaType };

export default loginFormSchema;
