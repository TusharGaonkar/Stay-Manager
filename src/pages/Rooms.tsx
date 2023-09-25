import { useState } from 'react';
import RoomsCreateForm from '../features/Rooms/CreateRoomForm';
import RoomsTable from '../features/Rooms/RoomsTable';
import EditFormModal from '../features/Rooms/EditFormModal';

export default function Rooms() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formDefaultValues, setFormDefaultValues] = useState({});
  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <h2 className="text-2xl font-semibold self-start"> Rooms</h2>
      <RoomsTable setModalOpen={setModalOpen} setFormDefaultValues={setFormDefaultValues} />
      <RoomsCreateForm />
      <EditFormModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        formDefaultValues={formDefaultValues}
      />
    </div>
  );
}
