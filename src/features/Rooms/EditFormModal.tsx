/* eslint-disable import/extensions */
import RoomsEditForm from './EditRoomForm';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shadcn_components/ui/alert-dialog';
import { Database } from '../../../api/supabase';

type RoomType = Database['public']['Tables']['rooms']['Row'];

export default function EditFormModal({
  modalOpen,
  setModalOpen,
  formDefaultValues,
}: {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formDefaultValues: RoomType | null;
}) {
  return (
    <AlertDialog open={modalOpen}>
      <AlertDialogContent className="md:min-w-[600px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Room</AlertDialogTitle>
          <AlertDialogDescription className="">
            <RoomsEditForm formDefaultValues={formDefaultValues} setModalOpen={setModalOpen} />
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
