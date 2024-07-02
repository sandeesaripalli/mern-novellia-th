const Pet = require("../models/Pet");

// Get all pets
const getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific pet
const getPetById = (req, res) => {
  res.json(res.pet);
};

// Create a pet
const createPet = async (req, res) => {
  const pet = new Pet({
    name: req.body.name,
    type: req.body.type,
    owner: req.body.owner,
    dateOfBirth: req.body.dateOfBirth,
    vaccines: req.body.vaccines,
    allergies: req.body.allergies,
    imageUrl: req.body.imageUrl, // Added imageUrl field
  });
  try {
    const newPet = await pet.save();
    res.status(201).json(newPet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a pet
const updatePet = async (req, res) => {
  if (req.body.name != null) {
    res.pet.name = req.body.name;
  }
  if (req.body.type != null) {
    res.pet.type = req.body.type;
  }
  if (req.body.owner != null) {
    res.pet.owner = req.body.owner;
  }
  if (req.body.dateOfBirth != null) {
    res.pet.dateOfBirth = req.body.dateOfBirth;
  }
  if (req.body.vaccines != null) {
    res.pet.vaccines = req.body.vaccines;
  }
  if (req.body.allergies != null) {
    res.pet.allergies = req.body.allergies;
  }
  if (req.body.imageUrl != null) {
    res.pet.imageUrl = req.body.imageUrl; // Added imageUrl field
  }
  try {
    const updatedPet = await res.pet.save();
    res.json(updatedPet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a pet
const deletePet = async (req, res) => {
  try {
    await res.pet.remove();
    res.json({ message: "Deleted Pet" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Middleware to get pet by ID
const getPet = async (req, res, next) => {
  let pet;
  try {
    pet = await Pet.findById(req.params.id);
    if (pet == null) {
      return res.status(404).json({ message: "Cannot find pet" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.pet = pet;
  next();
};

module.exports = {
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
  getPet,
};
