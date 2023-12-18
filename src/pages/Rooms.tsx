import { useState } from 'react';
import RoomsCreateForm from '../features/Rooms/CreateRoomForm';
import RoomsTable from '../features/Rooms/RoomsTable';
import EditFormModal from '../features/Rooms/EditFormModal';
import FilterRoomTable from '../features/Rooms/FilterRoomTable';
import SortRoomTable from '../features/Rooms/SortRoomTable';

export default function Rooms() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formDefaultValues, setFormDefaultValues] = useState({});
  return (
    <div className="flex flex-col items-center justify-center mt-7 p-2">
      <h2 className="text-2xl font-semibold self-start"> Rooms</h2>
      <div className="flex flex-row justify-end items-end w-2/3 mb-3 p-3 space-x-2">
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
