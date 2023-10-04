import BookingTable from '../features/Bookings/BookingTable';

export default function Bookings() {
  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <h2 className="text-2xl font-semibold self-start"> All Bookings</h2>
      <BookingTable />
    </div>
  );
}
