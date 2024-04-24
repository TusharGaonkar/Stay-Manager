import supabase from './supabaseClient';
import { type AccountSettingsFormSchema } from '../src/validators/AccountSettingsFormSchema';

export default async function updateAccountSettings(
  updatedSettingsData: AccountSettingsFormSchema
) {
  const { newPassword, confirmNewPassword } = updatedSettingsData;

  if (!newPassword || !confirmNewPassword)
    throw new Error('Please provide new password and confirm new password');

  if (newPassword !== confirmNewPassword) throw new Error("Passwords don't match");

  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw new Error('Something went wrong while updating the password');

  return data;
}
