/* eslint-disable @typescript-eslint/comma-dangle */
import { PostgrestError } from '@supabase/supabase-js';
import supabase, { supabaseUrl } from './supabaseClient';
import type { Database } from './supabase';

type RoomType = Database['public']['Tables']['rooms']['Row'];

export default async function uploadRoomImage(
  room: Omit<RoomType, 'created_at'>
): Promise<string | undefined> {
  const ValidatedImageName = `${Math.random()}-${room.name}`.replace(/\//g, '');
  try {
    if (!room.image || !room.image[0]) {
      throw new Error('No image provided');
    }
    const { error } = await supabase.storage
      .from('rooms')
      .upload(ValidatedImageName, room.image[0]!);
    if (error) throw new Error(error.message);
    return `${supabaseUrl}/storage/v1/object/public/rooms/${ValidatedImageName}`;
  } catch (error) {
    await supabase.from('rooms').delete().eq('id', room.id);
    throw new Error((error as Error | PostgrestError).message);
  }
}
