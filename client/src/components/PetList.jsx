import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const PetList = ({ pets, onDelete, onEdit }) => {
  // console.log('Rendering PetList with', pets.length, 'pets');

  return (
    <div className="container mx-auto p-4">
      <Typography variant="h4" className="text-center mb-6 font-bold">
        Pet List
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <Card key={pet._id} className="overflow-hidden shadow-lg rounded-lg">
            {/* console.log('Rendering pet:', pet.name); */}
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={pet.imageUrl || "https://via.placeholder.com/150"}
                alt={pet.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardBody className="p-4">
              <Typography className="text-xl font-bold mb-1">
                {pet.name}
              </Typography>
              <Typography className="text-sm text-gray-600 mb-3">
                {pet.type} - Owned by {pet.owner}
                <br />
                Born: {new Date(pet.dateOfBirth).toLocaleDateString()}
              </Typography>
              <div className="space-y-2">
                <div>
                  <Typography className="text-sm font-semibold">
                    Latest Vaccine:
                  </Typography>
                  <Typography className="text-sm text-gray-600">
                    {pet.vaccines && pet.vaccines.length > 0 ? (
                      <ul className="list-disc pl-5">
                        {pet.vaccines.map((vaccine, index) => (
                          <li key={index}>
                            {vaccine.name} -{" "}
                            {new Date(
                              vaccine.dateAdministered
                            ).toLocaleDateString()}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "No vaccines recorded"
                    )}
                  </Typography>
                </div>
                <div>
                  <Typography className="text-sm font-semibold">
                    Allergies:
                  </Typography>
                  <Typography className="text-sm text-gray-600">
                    {pet.allergies && pet.allergies.length > 0 ? (
                      <ul className="list-disc pl-5">
                        {pet.allergies.map((allergy, index) => (
                          <li key={index}>
                            {allergy.name} - {allergy.reactions} (
                            {allergy.severity})
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "No allergies recorded"
                    )}
                  </Typography>
                </div>
              </div>
            </CardBody>
            <CardFooter className="flex justify-end space-x-2 py-2 px-4 bg-gray-50">
              <Button
                color="blue"
                size="sm"
                onClick={() => onEdit(pet)}
                className="text-xs"
              >
                EDIT
              </Button>
              <Button
                color="red"
                size="sm"
                onClick={() => onDelete(pet._id)}
                className="text-xs"
              >
                DELETE
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

// TODO: Add prop types for better type checking

export default PetList;
