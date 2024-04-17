/* eslint-disable import/extensions */
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/shadcn_components/ui/tabs';

function FilterBookingTable({
  setBookingType,
  setCurrentPage,
}: {
  setBookingType: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
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
            setCurrentPage(1);
          }}
        >
          All Bookings
        </TabsTrigger>
        <TabsTrigger
          value="checked-in"
          onClick={() => {
            setBookingType('checked in');
            setDefaultType('checked in');
            setCurrentPage(1);
          }}
        >
          Checked In
        </TabsTrigger>
        <TabsTrigger
          value="checked-out"
          onClick={() => {
            setBookingType('checked out');
            setDefaultType('checked out');
            setCurrentPage(1);
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
            setCurrentPage(1);
          }}
        >
          Unconfirmed
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export default FilterBookingTable;
