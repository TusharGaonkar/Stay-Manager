import BookingTable from '../features/Bookings/BookingTable';

export default function Bookings() {
  return (
    <div className="flex flex-col items-center justify-center mt-8 p-1">
      <h2 className="self-start text-2xl font-bold text-gradient">Bookings</h2>
      <BookingTable />
    </div>
  );
}
