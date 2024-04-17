/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import supabase from './supabaseClient';
import type { Database } from './supabase';
import uploadRoomImage from './roomImageUploadApi';

type IDType = Database['public']['Tables']['rooms']['Row']['id'];
type RoomType = Database['public']['Tables']['rooms']['Row'];

export default async function editRoomByID(
  roomID: IDType,
  updatedRoomData: RoomType,
  isImageUpdated: boolean
): Promise<void | undefined> {
  if (isImageUpdated) {
    const imageURL = await uploadRoomImage(updatedRoomData);

    if (imageURL) {
      updatedRoomData.image = imageURL;
    } else {
      throw new Error('Failed to upload image');
    }

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
