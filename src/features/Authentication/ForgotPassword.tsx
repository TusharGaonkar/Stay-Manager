import { useState } from 'react';
import { Badge } from '@/shadcn_components/ui/badge';
import { Button } from '@/shadcn_components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shadcn_components/ui/dialog';
import { Input } from '@/shadcn_components/ui/input';
import { Label } from '@/shadcn_components/ui/label';
import supabase from '../../../api/supabaseClient';
import { toast } from '@/shadcn_components/ui/use-toast';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  async function resetPassword() {
    try {
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      if (!emailRegex.test(email.trim())) {
        throw new Error('Please enter a valid email address');
      }
      toast({
        title: 'Resetting password...',
        description: 'Please wait while we reset your password.',
      });
      const { data, error } = await supabase.auth.resetPasswordForEmail(email.trim());

      if (error) throw error;

      if (data) {
        toast({
          title: 'Success',
          description: 'You will receive a password reset email shortly if your account exists.',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `${(error as Error)?.message || 'Something went wrong'}`,
      });
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Badge
          variant="outline"
          className="mx-auto cursor-pointer text-xstext-center text-primary max-w-max t-2"
        >
          Forgot Password?
        </Badge>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Account Recovery</DialogTitle>
          <DialogDescription>Enter your email below to reset your password.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              className="col-span-3"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => resetPassword()}>Reset Password</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
