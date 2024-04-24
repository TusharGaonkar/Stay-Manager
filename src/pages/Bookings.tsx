import BookingTable from '../features/Bookings/BookingTable';

export default function Bookings() {
  return (
    <div className="flex flex-col p-1 mt-8 mb-6">
      <h2 className="self-start text-2xl font-bold text-gradient">Bookings</h2>
      <BookingTable />
    </div>
  );
}
