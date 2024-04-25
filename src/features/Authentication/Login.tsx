/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
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
import { toast } from '@/shadcn_components/ui/use-toast';
import { type LoginFormSchemaType, loginFormSchema } from '@/validators/LoginFormSchema';
import { Toaster } from '@/shadcn_components/ui/toaster';
import supabase from '../../../api/supabaseClient';
import ForgotPassword from './ForgotPassword';

function LoginForm() {
  const form = useForm<LoginFormSchemaType>({
    defaultValues: {
      email: import.meta.env.VITE_ADMIN_EMAIL,
      password: import.meta.env.VITE_ADMIN_PASSWORD,
    },
    resolver: zodResolver(loginFormSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormSchemaType) => {
    const { email, password } = data;
    try {
      if (!email || !password) throw new Error('Please enter email and password');

      setIsLoading(true);
      toast({
        title: 'Signing in...',
        description: 'Please wait while we sign you in.',
      });

      const {
        data: { user },
        error,
      } = await supabase.auth.signInWithPassword({ email, password });

      setIsLoading(false);
      if (error) throw new Error(error.message);

      toast({
        title: 'Logged in successfully',
        description: 'Welcome back to Stay Manager!',
      });

      navigate('/', { replace: true });

      return user;
    } catch (error) {
      toast({
        title: 'Error',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <section className="flex items-center justify-center w-full h-screen gap-5">
        <img
          src="/login.gif"
          alt="login"
          className="w-[500px] h-auto rounded bg-primary/30 hidden lg:block"
        />
        <div className="flex flex-col gap-2">
          <h1 className="p-6 text-6xl text-center font-dancing">
            Stay Manager
            <span className="ml-2 text-sm font-inter">v-1.0</span>
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 w-[500px]">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="mt-6 font-semibold uppercase bg-gradient" disabled={isLoading}>
                Sign in
              </Button>
            </form>
          </Form>
          <div className="mx-auto mt-2">
            <ForgotPassword />
          </div>
          <Toaster />
        </div>
      </section>
      <footer className="fixed bottom-0 left-0 right-0 flex justify-start gap-1 bg-secondary/30">
        <div className="flex flex-col items-center gap-1 p-3 ml-3">
          <a
            className="underline font-dancing text-slate-200/50"
            href="https://github.com/TusharGaonkar/Stay-Manager"
            target="_blank"
          >
            &copy;&nbsp;Stay Manager
            <span className="ml-1 text-xs font-inter">{new Date().getFullYear()}</span>
          </a>
          <a
            className="text-xs underline font-inter text-slate-200/50"
            href="https://github.com/TusharGaonkar"
            target="_blank"
          >
            By Tushar Gaonkar
          </a>
        </div>
      </footer>
    </>
  );
}

export default function Login() {
  const { data: sessionData } = useQuery({
    queryFn: async () => {
      const result = await supabase.auth.getSession();
      return result;
    },
  });

  return sessionData?.data?.session ? <Navigate to="/" /> : <LoginForm />;
}
