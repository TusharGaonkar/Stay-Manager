import supabase from './supabaseClient';
import type { Database } from './supabase';
import uploadRoomImage from './roomImageUploadApi';

type IDType = Database['public']['Tables']['rooms']['Row']['id'];

export default async function editRoomByID(
  roomID: IDType,
  updatedRoomData: any,
  isImageUpdated: boolean
): Promise<void | undefined> {
  if (isImageUpdated) {
    const imageURL = await uploadRoomImage(updatedRoomData);
    updatedRoomData.image = imageURL;
    const { error } = await supabase
      .from('rooms')
      .update(updatedRoomData)
      .eq('id', roomID)
      .select();
    if (error) throw new Error(error.message);
  } else {
    const { name, maxCapacity, regularPrice, discount, description } = updatedRoomData;
    const { error } = await supabase
      .from('rooms')
      .update({ name, maxCapacity, regularPrice, discount, description }) // skip updating image here
      .eq('id', roomID)
      .select();
    if (error) throw new Error(error.message);
  }
}
