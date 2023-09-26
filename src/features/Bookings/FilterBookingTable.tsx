import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/shadcn_components/ui/tabs';

function FilterBookingTable({
  setBookingType,
}: {
  setBookingType: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [defaultType, setDefaultType] = useState('all bookings');
  return (
    <Tabs defaultValue={defaultType}>
      <TabsList>
        <TabsTrigger
          value="all bookings"
          onClick={() => {
            setBookingType('all-bookings');
            setBookingType('all bookings');
          }}
        >
          All Bookings
        </TabsTrigger>
        <TabsTrigger
          value="checked-in"
          onClick={() => {
            setBookingType('checked in');
            setDefaultType('checked in');
          }}
        >
          Checked In
        </TabsTrigger>
        <TabsTrigger
          value="checked-out"
          onClick={() => {
            setBookingType('checked out');
            setDefaultType('checked out');
          }}
        >
          Checked Out
        </TabsTrigger>
        {/* Add other tabs and their respective onClick handlers */}
        <TabsTrigger
          value="unconfirmed"
          onClick={() => {
            setBookingType('unconfirmed');
            setDefaultType('unconfirmed');
          }}
        >
          Unconfirmed
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export default FilterBookingTable;
