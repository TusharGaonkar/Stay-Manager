/* eslint-disable import/extensions */
import RegisterNewGuestForm from '@/features/NewBooking/RegisterNewGuestForm';

export default function RegisterNewGuest() {
  return (
    <div className="flex flex-col items-center justify-start h-screen gap-10 p-1 mt-8">
      <h2 className="self-start text-2xl font-bold text-gradient">New Booking </h2>
      <RegisterNewGuestForm />
    </div>
  );
}
