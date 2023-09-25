import supabase from './supabaseClient';
import type { Database } from './supabase';

type RoomType = Database['public']['Tables']['rooms']['Row'];
async function getAllRooms(): Promise<RoomType[]> {
  try {
    const { data, error } = await supabase.from('rooms').select('*');
    if (error) throw new Error(error.message);
    return data as RoomType[];
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export default getAllRooms;
