/* eslint-disable operator-linebreak */
import { createClient } from '@supabase/supabase-js';

export const supabaseUrl =
  (import.meta as ImportMeta & { env: Record<string, string> }).env.VITE_SUPABASE_URL || '';

const supabaseKey =
  (import.meta as ImportMeta & { env: Record<string, string> }).env.VITE_SUPABASE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
