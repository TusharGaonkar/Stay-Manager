/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-throw-literal */
import supabase from './supabaseClient';
import type { Database } from './supabase';

type IDType = Database['public']['Tables']['rooms']['Row']['id'];

export default async function deleteRoomByID(id: IDType): Promise<void> {
  // @ts-ignore
  if (import.meta.env.VITE_PREVIEW_MODE === 'true') {
    throw new Error('Deleting rooms is disabled in preview mode');
  }

  const { error } = await supabase.from('rooms').delete().eq('id', id);
  if (error) {
    if (error?.code === '23503') {
      throw new Error('This room is associated with a booking. Please delete the booking first.');
    } else throw error;
  }
}
