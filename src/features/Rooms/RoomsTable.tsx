/* eslint-disable import/extensions */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/shadcn_components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shadcn_components/ui/table';
import getAllRooms from '../../../api/getAllRoomsApi';
import deleteRoomByID from '../../../api/deleteRoomByIDApi';
import type { Database } from '../../../api/supabase';
import { Skeleton } from '@/shadcn_components/ui/skeleton';
import { useToast } from '@/shadcn_components/ui/use-toast';
import DeleteFormModal from './DeleteRoomModal';

type RoomType = Database['public']['Tables']['rooms']['Row'];

export default function RoomsTable({
  setModalOpen,
  setFormDefaultValues,
}: {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFormDefaultValues: RoomType;
}) {
  const { toast } = useToast();

  const { isLoading, data, isSuccess } = useQuery<RoomType[]>({
    queryKey: ['rooms'],
    queryFn: getAllRooms,
  });

  const queryClient = useQueryClient();
  const { mutate: deleteRoom } = useMutation({
    mutationFn: deleteRoomByID,
    onSuccess: () => {
      toast({
        variant: 'default',
        title: 'Successfully deleted the room...',
      });

      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
    onError: (err: Error) => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: `${err.message}`,
      });
    },
  });

  return (
    <>
      {isLoading && <Skeleton className="w-full h-screen" />}
      {isSuccess && (
        <div className="w-full mx-auto max-w-7xl">
          <Table className="">
            <TableCaption className="">A list of all available rooms in the stay</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>{null}</TableHead>
                <TableHead className="">Room</TableHead>
                <TableHead>Max Capacity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="">Discount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((room: RoomType) => (
                <TableRow key={room.id}>
                  <TableCell className="w-48">
                    <img
                      src={room.image!}
                      alt={room.name!}
                      className="object-cover w-full rounded-xl"
                    />
                  </TableCell>
                  <TableCell>{room.name}</TableCell>
                  <TableCell>{room.maxCapacity}</TableCell>
                  <TableCell>
                    <span>₹</span>
                    {room.regularPrice}
                  </TableCell>
                  <TableCell>
                    <span>₹</span>
                    {room.discount}
                  </TableCell>
                  <TableCell className="">
                    <div className="flex items-center justfiy-center gap-2">
                      <div>
                        <Button
                          variant="default"
                          onClick={() => {
                            setModalOpen(true);
                            setFormDefaultValues(room);
                          }}
                        >
                          Edit
                        </Button>
                      </div>
                      <div>
                        <DeleteFormModal room={room} deleteRoom={deleteRoom} />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}
