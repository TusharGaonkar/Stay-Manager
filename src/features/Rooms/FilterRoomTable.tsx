import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from '@/shadcn_components/ui/tabs';

export default function FilerRoomTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [roomType, setRoomType] = useState(searchParams.get('roomType') ?? 'all-rooms');

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('roomType', roomType);
    setSearchParams(newSearchParams);
  }, [roomType, searchParams, setSearchParams]);
  // causes flickering issue if you don't wrap it inside useEffect()

  return (
    <Tabs defaultValue={searchParams.get('roomType') ?? 'all-rooms'}>
      <TabsList>
        <TabsTrigger value="all-rooms" onClick={() => setRoomType('all-rooms')}>
          All Rooms
        </TabsTrigger>
        <TabsTrigger value="discount" onClick={() => setRoomType('discount')}>
          Discount
        </TabsTrigger>
        <TabsTrigger value="noDiscount" onClick={() => setRoomType('no-discount')}>
          No Discount
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
