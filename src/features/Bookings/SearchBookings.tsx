import { useState, useRef } from 'react';
import { Badge } from '@/shadcn_components/ui/badge';
import { Button } from '@/shadcn_components/ui/button';
import { Input } from '@/shadcn_components/ui/input';

export default function SearchBookings({
  setSearchTerm,
}: {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) {
  const inputRef = useRef<null | HTMLInputElement>(null);
  const [searchString, setSearchString] = useState('');
  function clearSearch() {
    inputRef.current!.value = '';
    setSearchTerm('');
    setSearchString('');
  }
  function handleSearch() {
    if (inputRef?.current?.value) {
      setSearchString(inputRef.current.value);
      setSearchTerm(inputRef.current.value);
    }
  }
  return (
    <div className="flex flex-col  w-full max-w-sm space-y-1">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="text"
          placeholder="Search Bookings by Guest Name..."
          ref={inputRef}
          className="border-2 border-slate-700"
        />
        <Button onClick={() => handleSearch()} type="submit" className="">
          Search
        </Button>
      </div>
      <div>
        {searchString && (
          <Badge className="bg-yellow-200 hover:bg-yellow-200">
            {`Showing all matched bookings for "${searchString}"`}
            <svg
              onClick={() => clearSearch()}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-4 w-4 inline-block ml-2 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Badge>
        )}
      </div>
    </div>
  );
}
