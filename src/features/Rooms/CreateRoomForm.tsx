/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/extensions */
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useCreateRoom from '../../hooks/useCreateRoom';
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
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shadcn_components/ui/alert-dialog';
import addNewRoom from '../../../api/addNewRoomApi';
import { toast } from '@/shadcn_components/ui/use-toast';

type RoomType = Database['public']['Tables']['rooms']['Row'];

export default function RoomsCreateForm() {
  const [modalOpen, setModalOpen] = useState(false);
  const [createForm, handleSubmit] = useCreateRoom();
  const queryClient = useQueryClient();

  const { mutate: addRoom } = useMutation({
    mutationFn: async (data: RoomType) => {
      toast({
        variant: 'default',
        title: `Adding new room ${data.name}...`,
      });
      await addNewRoom(data);
    },
    onSuccess: () => {
      toast({
        variant: 'default',
        title: 'Successfully added new room.',
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
      <div className="">
        <Button
          className="bg-white hover:bg-white/90"
          onClick={() => {
            setModalOpen(true);
            createForm.reset();
          }}
        >
          Add new room
        </Button>
      </div>

      <AlertDialog open={modalOpen}>
        <AlertDialogContent className="md:min-w-[600px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Add new room</AlertDialogTitle>
            <AlertDialogDescription className="">
              <Form {...createForm}>
                <form
                  onSubmit={handleSubmit((data: RoomType) => {
                    setModalOpen(false);
                    addRoom({ ...data, image: data?.image });
                  })}
                  className="w-full space-y-6"
                >
                  <FormField
                    control={createForm.control}
                    name="name"
                    render={() => (
                      <FormItem>
                        <FormLabel>Room</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter the room name"
                            className="resize-none"
                            type="text"
                            {...createForm.register('name', {
                              required: true,
                            })}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={createForm.control}
                    name="maxCapacity"
                    render={() => (
                      <FormItem>
                        <FormLabel>Max capacity of the room</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter maximum capacity"
                            className="resize-none"
                            type="number"
                            {...createForm.register('maxCapacity', {
                              valueAsNumber: true,
                              required: true,
                            })}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={createForm.control}
                    name="regularPrice"
                    render={() => (
                      <FormItem>
                        <FormLabel>Regular Price</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter the room price"
                            className="resize-none"
                            type="number"
                            step="any"
                            {...createForm.register('regularPrice', {
                              valueAsNumber: true,
                              required: true,
                            })}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={createForm.control}
                    name="discount"
                    render={() => (
                      <FormItem>
                        <FormLabel>Discount</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter the discount price"
                            className="resize-none"
                            type="number"
                            step="any"
                            defaultValue={0}
                            {...createForm.register('discount', {
                              valueAsNumber: true,
                            })}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={createForm.control}
                    name="description"
                    render={() => (
                      <FormItem>
                        <FormLabel>Room Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us a little bit about the room"
                            className="resize-none"
                            {...createForm.register('description', {
                              required: true,
                            })}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={createForm.control}
                    name="image"
                    render={() => (
                      <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl className="mx-auto">
                          <div className="max-w-max">
                            <Input
                              type="file"
                              className="resize-none"
                              {...createForm.register('image', {
                                required: true,
                              })}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end space-x-2">
                    <Button
                      type="reset"
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
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
