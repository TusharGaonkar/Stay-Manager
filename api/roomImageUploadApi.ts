import supabase, { supabaseUrl } from './supabaseClient';
import type { Database } from './supabase';

type RoomType = Database['public']['Tables']['rooms']['Row'];

export default async function uploadRoomImage(room: RoomType): Promise<string | undefined> {
  const ValidatedImageName = `${Math.random()}-${room.name}`.replace(/\//g, '');
  try {
    const { error } = await supabase.storage
      .from('rooms')
      .upload(ValidatedImageName, room.image[0]!);
    if (error) throw new Error(error.message);
    return `${supabaseUrl}/storage/v1/object/public/rooms/${ValidatedImageName}`;
  } catch (error) {
    await supabase.from('rooms').delete().eq('id', room.id);
    throw new Error((error as Error).message);
  }
}
