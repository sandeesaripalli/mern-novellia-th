// TODO: Move this to an environment variable
const API_URL = "http://localhost:4000/pets";

export const getPets = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch pets");
    return await response.json();
  } catch (error) {
    console.error("Error fetching pets:", error);
    throw error;
  }
};

export const createPet = async (pet) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pet),
    });
    if (!response.ok) throw new Error("Failed to create pet");
    return await response.json();
  } catch (error) {
    console.error("Error creating pet:", error);
    throw error;
  }
};

export const updatePet = async (id, pet) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pet),
    });
    if (!response.ok) throw new Error("Failed to update pet");
    return await response.json();
  } catch (error) {
    console.error("Error updating pet:", error);
    throw error;
  }
};

export const deletePet = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete pet");
    // console.log('Pet deleted successfully');
  } catch (error) {
    console.error("Error deleting pet:", error);
    throw error;
  }
};

// TODO: Implement pagination for getPets
