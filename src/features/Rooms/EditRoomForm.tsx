/* eslint-disable import/extensions */
/* eslint-disable react/jsx-props-no-spreading */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useEditRoom from '@/hooks/useEditRoom';
import { Button } from '@/shadcn_components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shadcn_components/ui/form';
import { Input } from '@/shadcn_components/ui/input';
import { Textarea } from '@/shadcn_components/ui/textarea';
import { Database } from '../../../api/supabase';
import editRoomByID from '../../../api/editRoomApi';
import { toast } from '@/shadcn_components/ui/use-toast';

type RoomType = Database['public']['Tables']['rooms']['Row'];

export default function RoomsEditForm({
  setModalOpen,
  formDefaultValues,
}: {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formDefaultValues: RoomType;
}) {
  const [editForm, handleSubmit] = useEditRoom();
  const queryClient = useQueryClient();

  const { mutate: editRoom } = useMutation({
    mutationFn: async (data: RoomType) => {
      toast({
        variant: 'default',
        title: 'Editing the room...',
      });

      const isImageUpdated = data?.image?.length > 0;
      await editRoomByID(data.id, { ...data, name: formDefaultValues.name }, isImageUpdated);
    },
    onSuccess: () => {
      toast({
        variant: 'default',
        title: 'Successfully edited the room.',
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
    <Form {...editForm}>
      <form
        onSubmit={handleSubmit((data: RoomType) => {
          setModalOpen(false);
          const updatedRoomData = { ...formDefaultValues, ...data };
          editRoom(updatedRoomData);
        })}
        className="w-full space-y-6"
      >
        <FormField
          control={editForm.control}
          name="name"
          disabled
          defaultValue={formDefaultValues.name!}
          render={() => (
            <FormItem>
              <FormLabel>Room</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the room name"
                  className="resize-none"
                  disabled
                  defaultValue={formDefaultValues.name!}
                  {...editForm.register('name')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={editForm.control}
          name="maxCapacity"
          render={() => (
            <FormItem>
              <FormLabel>Max capacity of the room</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter maximum capacity"
                  className="resize-none"
                  defaultValue={formDefaultValues.maxCapacity!}
                  {...editForm.register('maxCapacity', {
                    valueAsNumber: true,
                  })}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={editForm.control}
          name="regularPrice"
          render={() => (
            <FormItem>
              <FormLabel>Regular Price</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the room price"
                  className="resize-none"
                  {...editForm.register('regularPrice', {
                    valueAsNumber: true,
                  })}
                  defaultValue={formDefaultValues.regularPrice!}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={editForm.control}
          name="discount"
          render={() => (
            <FormItem>
              <FormLabel>Discount</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the discount price"
                  className="resize-none"
                  {...editForm.register('discount', {
                    valueAsNumber: true,
                  })}
                  defaultValue={formDefaultValues.discount!}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={editForm.control}
          name="description"
          render={() => (
            <FormItem>
              <FormLabel>Room Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about the room"
                  defaultValue={formDefaultValues.description!}
                  className="resize-none"
                  {...editForm.register('description')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={editForm.control}
          name="image"
          render={() => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl className="mx-auto">
                <div className="max-w-max">
                  <Input type="file" className="resize-none" {...editForm.register('image')} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setModalOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="default">
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
}
