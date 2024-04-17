/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable import/extensions */
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shadcn_components/ui/select';

export default function SortRoomTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedSortOption, setSelectedSortOption] = useState(
    searchParams.get('sort') || 'price-desc'
  );

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('sort', selectedSortOption);
    setSearchParams(newSearchParams);
  }, [selectedSortOption, searchParams, setSearchParams]);

  return (
    <Select onValueChange={(value) => setSelectedSortOption(value)} value={selectedSortOption}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort Rooms By" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="price-asc">Price (A-Z)</SelectItem>
        <SelectItem value="price-desc">Price (Z-A)</SelectItem>
        <SelectItem value="discount-asc">Discount (A-Z)</SelectItem>
        <SelectItem value="discount-desc">Discount(Z-A)</SelectItem>
        <SelectItem value="maxCapacity-asc">Max Capacity (A-Z)</SelectItem>
        <SelectItem value="maxCapacity-desc">Max Capacity (Z-A)</SelectItem>
      </SelectContent>
    </Select>
  );
}
