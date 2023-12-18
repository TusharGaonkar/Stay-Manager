import { Check, ChevronsUpDown } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@/shadcn_components/ui/button';
import { Card, CardContent } from '@/shadcn_components/ui/card';
import { cn } from '@/lib/utils';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shadcn_components/ui/form';
import { Input } from '@/shadcn_components/ui/input';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/shadcn_components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/shadcn_components/ui/popover';
import countriesWithCode from '../constants/allCountriesWithAlpha2Code';
import UseCreateGuest from '@/hooks/useCreateGuest';
import createGuest from '../../api/addNewGuestApi';
import { toast } from '@/shadcn_components/ui/use-toast';
import guestCreateFormSchema from '@/validators/guestCreateFormSchema';
import receptionist from '/receptionist.svg';

const capitalizeFirstLetter = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export default function NewGuest() {
  const [form, handleSubmit] = UseCreateGuest();
  const [timeoutId, setTimeoutId] = useState(null);
  const navigate = useNavigate();
  const { mutate: addNewGuest, isLoading } = useMutation({
    mutationFn: createGuest,

    onSuccess: (guestID) => {
      toast({
        variant: 'default',
        title: 'Guest added successfully',
      });

      const id = setTimeout(() => {
        navigate(`${guestID}`);
      }, 2000);
      setTimeoutId(id);
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: error.message,
      });
    },
  });

  async function onSubmit(value: z.infer<typeof guestCreateFormSchema>) {
    const { firstName, lastName, email, nationality, nationalID } = value;
    const fullName = `${capitalizeFirstLetter(firstName)} ${capitalizeFirstLetter(lastName)}`;
    const countryCode = countriesWithCode.find((country) => country.Name === nationality)?.Code;
    if (!countryCode) {
      throw new Error('Country Code not found');
    }
    const countryFlag = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    addNewGuest({
      fullName,
      email,
      nationality,
      nationalID,
      countryFlag,
    });
  }

  useEffect(
    () => () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    },
    [timeoutId]
  );

  return (
    <div className="flex flex-col mt-8 width-[90%] mx-auto ">
      <div className="">
        <h2 className="text-3xl font-semibold mb-2">New Booking </h2>
        <Card className="flex p-10 ">
          <CardContent className="flex mx-auto ">
            <div className="flex w-[550px]  h-full items-center ">
              <img src={receptionist} alt="receptionist" />
            </div>
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="min-w-fit">Guest First Name</FormLabel>
                      <FormControl className="max-w-md">
                        <Input className="" placeholder="Enter first name..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="min-w-fit">Guest Last Name</FormLabel>
                      <FormControl className="max-w-md">
                        <Input placeholder="Enter last name..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="min-w-fit">Email</FormLabel>
                      <FormControl className="max-w-md">
                        <Input type="email" placeholder="Enter email..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nationality"
                  render={({ field }) => (
                    <FormItem className=" w-full">
                      <FormLabel className="">Nationality</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                'w-full justify-between',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value
                                ? countriesWithCode.find((country) => country.Name === field.value)
                                    ?.Name
                                : 'Select Country'}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 max-h-[250px] overflow-y-scroll">
                          <Command>
                            <CommandInput placeholder="Search Countries..." />
                            <CommandEmpty>No Countries found.</CommandEmpty>
                            <CommandGroup>
                              {countriesWithCode.map((country) => (
                                <CommandItem
                                  value={country.Name}
                                  key={country.Code}
                                  onSelect={() => {
                                    form.setValue('nationality', country.Name);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      country.Name === field.value ? 'opacity-100' : 'opacity-0'
                                    )}
                                  />
                                  {country.Name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nationalID"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="">National ID</FormLabel>
                      <FormControl className="">
                        <Input placeholder="Enter the National ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-end justify-end space-x-3 mt-36">
                  <Button
                    className="w-[150px] bg-blue-400 hover:bg-blue-400"
                    type="button"
                    disabled={isLoading}
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="w-[150px] bg-cyan-100 hover:bg-cyan-300"
                    type="submit"
                    disabled={isLoading}
                  >
                    {'Next->'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
