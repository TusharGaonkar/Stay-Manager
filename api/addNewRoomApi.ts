import supabase from './supabaseClient';
import type { Database } from './supabase';
import uploadRoomImage from './roomImageUploadApi';

type RoomType = Database['public']['Tables']['rooms']['Row'];

async function addNewRoom(room: RoomType): Promise<void | undefined> {
  try {
    const imageURl = await uploadRoomImage(room);
    const { error } = await supabase
      .from('rooms')
      .insert([{ ...room, image: imageURl }])
      .select();
    if (error) throw new Error(error.message);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export default addNewRoom;
