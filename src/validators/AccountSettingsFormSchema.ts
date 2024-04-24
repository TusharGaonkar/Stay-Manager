import { z } from 'zod';

const accountSettingsFormSchema = z
  .object({
    email: z.string().email().optional(),
    newPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must be at most 40 characters'),
    confirmNewPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must be at most 40 characters'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ['confirmNewPassword'],
  });

export type AccountSettingsFormSchema = z.infer<typeof accountSettingsFormSchema>;

export default accountSettingsFormSchema;
