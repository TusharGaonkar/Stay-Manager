/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import MoonLoader from 'react-spinners/MoonLoader';
import accountSettingsFormSchema, {
  type AccountSettingsFormSchema,
} from '@/validators/AccountSettingsFormSchema';
import { Card, CardContent, CardTitle, CardHeader } from '@/shadcn_components/ui/card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/shadcn_components/ui/form';
import { Input } from '@/shadcn_components/ui/input';
import updateAccountSettings from '../../../api/updateAccountSettingsApi';
import { Button } from '@/shadcn_components/ui/button';
import supabase from '../../../api/supabaseClient';
import { toast } from '@/shadcn_components/ui/use-toast';

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <MoonLoader color="#cdc8ff" size={50} />
    </div>
  );
}

export default function AccountSettings() {
  const form = useForm<AccountSettingsFormSchema>({
    resolver: zodResolver(accountSettingsFormSchema),
  });

  const queryClient = useQueryClient();
  const {
    data: userData,
    isLoading,
    isSuccess,
  } = useQuery({
    queryFn: async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) throw new Error(error.message);
      return user;
    },

    queryKey: ['account-settings'],
  });

  async function onSubmit(newSettingsData: AccountSettingsFormSchema) {
    // @ts-ignore
    if (import.meta.env.VITE_PREVIEW_MODE === 'true') {
      toast({
        title: 'Error',
        description: 'Updating account settings is disabled in public preview mode',
        variant: 'destructive',
      });

      return;
    }
    try {
      toast({
        title: 'Updating account settings',
        description: 'Please wait while we update your account settings',
      });

      const data = await updateAccountSettings(newSettingsData);

      if (data) {
        queryClient.invalidateQueries(['account-settings']);
        form.reset();
        toast({
          title: 'Success',
          description: 'Account settings updated successfully',
        });
      }
    } catch (error) {
      toast({
        title: 'Error while updating account settings',
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
            <CardTitle className="text-xl">Account Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-6 w-[500px]"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Registered Email"
                          type="email"
                          {...field}
                          value={userData?.email}
                          disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter your new password</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your password" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmNewPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm your new password</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your password" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="mt-6 font-semibold uppercase bg-gradient">
                  Update Password
                </Button>
              </form>
            </Form>
            <div className="flex flex-col gap-2 mt-6">
              <p className="text-xs text-primary">
                Password last updated:
                {` ${format(new Date(userData?.updated_at as string), 'dd/MM/yyyy HH:mm:ss')}`}
              </p>
              <p className="text-xs text-primary">
                Last sign in at:
                {` ${format(new Date(userData?.last_sign_in_at as string), 'dd/MM/yyyy HH:mm:ss')}`}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
