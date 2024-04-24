import { PostgrestError } from '@supabase/supabase-js';
import supabase from './supabaseClient';

type LoginInfo = {
  email: string;
  password: string;
};

export default async function LoginUser({ email, password }: LoginInfo) {
  try {
    if (!email || !password) throw new Error('Please provide email and password');
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) throw error;

    return data;
  } catch (error) {
    throw new Error((error as PostgrestError | Error)?.message || 'Something went wrong');
  }
}
