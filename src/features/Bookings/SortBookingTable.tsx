/* eslint-disable import/extensions */
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shadcn_components/ui/select';

function SortBookingTable({
  setSelectedSortOption,
}: {
  setSelectedSortOption: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [defaultSort, setDefaultSort] = useState('latest-bookings');

  return (
    <Select
      onValueChange={(value) => {
        setDefaultSort(value);
        setSelectedSortOption(value);
      }}
      value={defaultSort}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort Bookings By" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="latest-bookings">Latest Bookings</SelectItem>
        <SelectItem value="oldest-bookings">Oldest Bookings</SelectItem>
        <SelectItem value="booking-amount-asc">Amount (A-Z)</SelectItem>
        <SelectItem value="booking-amount-desc">Amount (Z-A)</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default SortBookingTable;
