import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://vmhotzmovgfkkcbozoey.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtaG90em1vdmdma2tjYm96b2V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUyMjI3MzAsImV4cCI6MjAxMDc5ODczMH0.vCl9xdI8A2vlpeVS8vApQogGkDc_DnJpHkcIXqq3DQc';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
