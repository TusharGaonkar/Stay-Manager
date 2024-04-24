import BookingSettings from '@/features/Settings/BookingSettings';
import AccountSettings from '@/features/Settings/AccountSettings';

export default function Settings() {
  return (
    <div className="flex flex-col gap-6 p-1 mt-8">
      <h1 className="text-2xl font-bold text-gradient">Settings</h1>
      <div className="flex flex-col gap-6 ml-4 mr-4">
        <BookingSettings />
        <AccountSettings />
      </div>
    </div>
  );
}
