import { useState } from 'react';
import RoomsCreateForm from '../features/Rooms/CreateRoomForm';
import RoomsTable from '../features/Rooms/RoomsTable';
import EditFormModal from '../features/Rooms/EditFormModal';
import FilterRoomTable from '../features/Rooms/FilterRoomTable';
import SortRoomTable from '../features/Rooms/SortRoomTable';
import { Database } from '../../api/supabase';

type RoomsType = Database['public']['Tables']['rooms']['Row'];

export default function Rooms() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formDefaultValues, setFormDefaultValues] = useState<RoomsType | null>(null);
  return (
    <div className="flex flex-col items-end justify-center p-1 mt-8">
      <h2 className="self-start text-2xl font-bold text-gradient">Rooms</h2>
      <div className="flex flex-row items-center justify-start p-6 mb-3 space-x-2">
        <FilterRoomTable />
        <SortRoomTable />
        <RoomsCreateForm />
      </div>
      <RoomsTable setModalOpen={setModalOpen} setFormDefaultValues={setFormDefaultValues} />
      <EditFormModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        formDefaultValues={formDefaultValues}
      />
    </div>
  );
}
