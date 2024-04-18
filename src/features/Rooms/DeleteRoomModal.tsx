/* eslint-disable import/extensions */
import { Database } from 'api/supabase';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shadcn_components/ui/alert-dialog';
import { Button, buttonVariants } from '@/shadcn_components/ui/button';

type RoomType = Database['public']['Tables']['rooms']['Row'];

export default function DeleteFormModal({
  room,
  deleteRoom,
}: {
  room: RoomType;
  deleteRoom: (id: RoomType['id']) => void;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-danger text-danger-foreground hover:bg-danger-200">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {`This action cannot be undone. This will permanently delete your Room-
                              ${room.name} data from the servers.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-danger text-danger-foreground hover:bg-danger-200"
            onClick={() => deleteRoom(room.id)}
          >
            Delete Room
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
