import React, { useState, useEffect } from "react";
import {
  getPets,
  createPet,
  updatePet,
  deletePet,
} from "../services/petService";
import PetForm from "../components/PetForm";
import PetList from "../components/PetList";

const HomePage = () => {
  const [pets, setPets] = useState([]);
  const [editingPet, setEditingPet] = useState(null);

  // Fetch pets on component mount
  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    const data = await getPets();
    setPets(data);
    // console.log('Fetched pets:', data);
  };

  const handleCreate = async (pet) => {
    if (editingPet) {
      await updatePet(editingPet._id, pet);
      setEditingPet(null);
      // console.log('Updated pet:', pet);
    } else {
      await createPet(pet);
      // console.log('Created new pet:', pet);
    }
    fetchPets();
  };

  const handleDelete = async (id) => {
    await deletePet(id);
    // console.log('Deleted pet with id:', id);
    fetchPets();
  };

  const handleEdit = (pet) => {
    setEditingPet(pet);
    // console.log('Editing pet:', pet);
  };

  // TODO: Add error handling for API calls
  // TODO: Implement pagination for large datasets
  // TODO: Add loading state while fetching data

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Pet Management</h1>
      <div className="mb-8">
        <PetForm onSubmit={handleCreate} initialData={editingPet || {}} />
      </div>
      <div>
        <PetList pets={pets} onDelete={handleDelete} onEdit={handleEdit} />
      </div>
    </div>
  );
};

export default HomePage;
