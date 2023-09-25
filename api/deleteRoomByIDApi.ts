import supabase from './supabaseClient';
import type { Database } from './supabase';

type IDType = Database['public']['Tables']['rooms']['Row']['id'];

export default async function deleteRoomByID(id: IDType): Promise<void> {
  const { error } = await supabase.from('rooms').delete().eq('id', id);
  if (error) throw new Error(error.message);
}
