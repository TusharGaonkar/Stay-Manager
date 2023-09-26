/* eslint-disable import/extensions */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import formatToINR from '../../utils/currencyFormatter';
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

function renderSkeletonRow(index) {
  return (
    <TableRow key={index}>
      <TableCell>
        <Skeleton className="h-8 " />
      </TableCell>

      <TableCell>
        <Skeleton className="h-8" />
      </TableCell>

      <TableCell>
        <Skeleton className="h-8 " />
      </TableCell>

      <TableCell>
        <Skeleton className="h-8 " />
      </TableCell>

      <TableCell>
        <Skeleton className="h-8 " />
      </TableCell>

      <TableCell>
        <Skeleton className="h-8 " />
      </TableCell>
    </TableRow>
  );
}

export default function RoomsTable({
  setModalOpen,
  setFormDefaultValues,
}: {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFormDefaultValues: RoomType;
}) {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [filteredAndSortedData, setFilteredAndSortedData] = useState([]);

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

  // once we have the data , perform fitering and sorting !
  useEffect(() => {
    // Perform filtering and sorting when dependencies change
    if (isSuccess && data) {
      const filterCriteria = searchParams.get('roomType') ?? 'all-rooms';
      const sortCriteria = searchParams.get('sort') ?? 'price-asc';

      const filteredData = data.filter((room) => {
        if (filterCriteria === 'discount') {
          return room.discount > 0;
        }
        if (filterCriteria === 'no-discount') {
          return room.discount === 0;
        }
        return true;
      });

      const sortedData = filteredData.sort((a, b) => {
        if (sortCriteria === 'price-asc') {
          return a.regularPrice - b.regularPrice;
        }
        if (sortCriteria === 'price-desc') {
          return b.regularPrice - a.regularPrice;
        }
        if (sortCriteria === 'discount-asc') {
          return a.discount - b.discount;
        }
        if (sortCriteria === 'discount-desc') {
          return b.discount - a.discount;
        }
        if (sortCriteria === 'maxCapacity-asc') {
          return a.maxCapacity - b.maxCapacity;
        }
        if (sortCriteria === 'maxCapacity-desc') {
          return b.maxCapacity - a.maxCapacity;
        }
      });

      setFilteredAndSortedData(sortedData);
    }
  }, [isSuccess, data, searchParams]);
  return (
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
          {isLoading ? (
            <>{Array.from({ length: 9 }).map((_, i) => renderSkeletonRow(i))}</>
          ) : (
            filteredAndSortedData?.map((room: RoomType) => (
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
                <TableCell>{formatToINR(room.regularPrice)}</TableCell>
                <TableCell>
                  {room.discount! > 0 ? <span>{formatToINR(room.discount)} </span> : <span>-</span>}
                </TableCell>
                <TableCell className="">
                  <div className="flex items-center gap-2">
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
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
