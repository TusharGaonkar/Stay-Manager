/* eslint-disable react/jsx-props-no-spreading */
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import MoonLoader from 'react-spinners/MoonLoader';
import bookingsSettingsFormSchema, {
  type BookingSettingsFormSchema,
} from '../../validators/BookingSettingsFormSchema';
import { Card, CardContent, CardTitle, CardHeader } from '@/shadcn_components/ui/card';
import getBookingSettings from '../../../api/getBookingSettingsApi';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/shadcn_components/ui/form';
import { Input } from '@/shadcn_components/ui/input';
import { Button } from '@/shadcn_components/ui/button';
import updateBookingSettings from '../../../api/updateBookingSettingsApi';
import { toast } from '@/shadcn_components/ui/use-toast';

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <MoonLoader color="#cdc8ff" size={50} />
    </div>
  );
}

export default function BookingSettings() {
  const { data, isLoading, isSuccess } = useQuery({
    queryFn: getBookingSettings,
    queryKey: ['bookingSettings'],
  });

  const queryClient = useQueryClient();

  const form = useForm<BookingSettingsFormSchema>({
    resolver: zodResolver(bookingsSettingsFormSchema),
  });

  async function onSubmit(newBookingSettingsData: BookingSettingsFormSchema) {
    toast({
      title: 'Updating booking settings',
      description: 'Please wait while we update your booking settings',
    });
    try {
      const bookingSettingsData = await updateBookingSettings(newBookingSettingsData);

      if (bookingSettingsData) {
        queryClient.invalidateQueries(['bookingSettings']);
        toast({
          title: 'Success',
          description: 'Booking settings updated successfully',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: `${(error as Error)?.message || 'Something went wrong'}`,
      });
    }
  }
  return (
    <>
      {isLoading && <LoadingSpinner />}
      {isSuccess && (
        <Card className="p-4">
          <CardHeader>
            <CardTitle className="text-xl">Bookings Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-6 w-[500px]"
              >
                <FormField
                  control={form.control}
                  name="minBookingLength"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum booking duration in days</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter minimum booking  duration"
                          type="number"
                          {...field}
                          {...form.register('minBookingLength', { valueAsNumber: true })}
                          defaultValue={data?.minBookingLength}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maxBookingLength"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum booking duration in days</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter maximum booking duration"
                          type="number"
                          {...field}
                          {...form.register('maxBookingLength', { valueAsNumber: true })}
                          defaultValue={data?.maxBookingLength}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maxGuestsPerBooking"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum guests per booking</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter maximum guests per booking"
                          type="number"
                          {...field}
                          {...form.register('maxGuestsPerBooking', { valueAsNumber: true })}
                          defaultValue={data?.maxGuestsPerBooking}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="breakfastPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Breakfast price</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter breakfast price"
                          type="number"
                          defaultValue={data?.breakfastPrice}
                          {...field}
                          {...form.register('breakfastPrice', { valueAsNumber: true })}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="mt-6 font-semibold uppercase bg-gradient">
                  Update Booking Settings
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </>
  );
}
