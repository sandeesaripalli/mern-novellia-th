import React, { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import {
  Button,
  Input,
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { Trash2 } from "lucide-react";

// TODO: Add prop-types for better type checking

const PetForm = ({ onSubmit, initialData = {} }) => {
  // Helper function to format dates
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return format(parseISO(dateString), "yyyy-MM-dd");
  };

  // State initialization
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    type: initialData.type || "",
    owner: initialData.owner || "",
    dateOfBirth: formatDate(initialData.dateOfBirth) || "",
    vaccines: initialData.vaccines || [],
    allergies: initialData.allergies || [],
    imageUrl: initialData.imageUrl || "", // Added imageUrl field
  });

  const [errors, setErrors] = useState({});

  // Update form data when initialData changes
  useEffect(() => {
    setFormData({
      name: initialData.name || "",
      type: initialData.type || "",
      owner: initialData.owner || "",
      dateOfBirth: formatDate(initialData.dateOfBirth) || "",
      vaccines: initialData.vaccines || [],
      allergies: initialData.allergies || [],
      imageUrl: initialData.imageUrl || "", // Added imageUrl field
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Vaccine handlers
  const handleAddVaccine = () => {
    setFormData({
      ...formData,
      vaccines: [...formData.vaccines, { name: "", dateAdministered: "" }],
    });
  };

  const handleRemoveVaccine = (index) => {
    const newVaccines = formData.vaccines.filter((_, i) => i !== index);
    setFormData({ ...formData, vaccines: newVaccines });
  };

  const handleVaccineChange = (index, field, value) => {
    const newVaccines = formData.vaccines.map((vaccine, i) =>
      i === index ? { ...vaccine, [field]: value } : vaccine
    );
    setFormData({ ...formData, vaccines: newVaccines });
  };

  // Allergy handlers
  const handleAddAllergy = () => {
    setFormData({
      ...formData,
      allergies: [
        ...formData.allergies,
        { name: "", reactions: "", severity: "" },
      ],
    });
  };

  const handleRemoveAllergy = (index) => {
    const newAllergies = formData.allergies.filter((_, i) => i !== index);
    setFormData({ ...formData, allergies: newAllergies });
  };

  const handleAllergyChange = (index, field, value) => {
    const newAllergies = formData.allergies.map((allergy, i) =>
      i === index ? { ...allergy, [field]: value } : allergy
    );
    setFormData({ ...formData, allergies: newAllergies });
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    const birthDate = new Date(formData.dateOfBirth);

    // Validate vaccines
    formData.vaccines.forEach((vaccine, index) => {
      const vaccineDate = new Date(vaccine.dateAdministered);
      if (vaccineDate < birthDate) {
        newErrors[`vaccine_${index}`] =
          "Vaccine date cannot be earlier than birthdate";
      }
    });

    // TODO: Add more validation (e.g., required fields, date formats)

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // console.log('Form submitted:', formData);
      onSubmit(formData);
    } else {
      console.error("Form validation failed");
    }
  };

  return (
    <Card className="w-full">
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="type"
              label="Type"
              value={formData.type}
              onChange={handleChange}
              required
            />
            <Input
              type="text"
              name="owner"
              label="Owner"
              value={formData.owner}
              onChange={handleChange}
              required
            />
            <Input
              type="date"
              name="dateOfBirth"
              label="Date of Birth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          <Input
            type="text"
            name="imageUrl"
            label="Image URL"
            value={formData.imageUrl}
            onChange={handleChange}
          />

          {/* Vaccine section */}
          <div className="space-y-4">
            <Typography variant="h6" color="blue-gray" className="font-medium">
              Vaccines
            </Typography>
            {formData.vaccines.map((vaccine, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center"
              >
                <Input
                  type="text"
                  placeholder="Vaccine Name"
                  label="Vaccine Name"
                  value={vaccine.name}
                  onChange={(e) =>
                    handleVaccineChange(index, "name", e.target.value)
                  }
                />
                <Input
                  type="date"
                  placeholder="Date Administered"
                  label="Date Administered"
                  value={formatDate(vaccine.dateAdministered)}
                  onChange={(e) =>
                    handleVaccineChange(
                      index,
                      "dateAdministered",
                      e.target.value
                    )
                  }
                />
                <Trash2
                  className="h-5 w-5 cursor-pointer text-red-500"
                  onClick={() => handleRemoveVaccine(index)}
                />
                {errors[`vaccine_${index}`] && (
                  <p className="text-red-500 mt-2">
                    {errors[`vaccine_${index}`]}
                  </p>
                )}
              </div>
            ))}
            <Button
              type="button"
              onClick={handleAddVaccine}
              color="blue"
              variant="outlined"
              fullWidth
            >
              Add Vaccine
            </Button>
          </div>

          {/* Allergy section */}
          <div className="space-y-4">
            <Typography variant="h6" color="blue-gray" className="font-medium">
              Allergies
            </Typography>
            {formData.allergies.map((allergy, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center"
              >
                <Input
                  type="text"
                  placeholder="Allergy Name"
                  label="Allergy Name"
                  value={allergy.name}
                  onChange={(e) =>
                    handleAllergyChange(index, "name", e.target.value)
                  }
                />
                <Input
                  type="text"
                  placeholder="Reactions"
                  label="Reactions"
                  value={allergy.reactions}
                  onChange={(e) =>
                    handleAllergyChange(index, "reactions", e.target.value)
                  }
                />
                <Input
                  type="text"
                  placeholder="Severity"
                  label="Severity"
                  value={allergy.severity}
                  onChange={(e) =>
                    handleAllergyChange(index, "severity", e.target.value)
                  }
                />
                <Trash2
                  className="h-5 w-5 cursor-pointer text-red-500"
                  onClick={() => handleRemoveAllergy(index)}
                />
              </div>
            ))}
            <Button
              type="button"
              onClick={handleAddAllergy}
              color="blue"
              variant="outlined"
              fullWidth
            >
              Add Allergy
            </Button>
          </div>

          <Button type="submit" color="blue" fullWidth>
            Submit
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

// TODO: Implement prop-types
// PetForm.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
//   initialData: PropTypes.shape({
//     name: PropTypes.string,
//     type: PropTypes.string,
//     // ... add other prop types
//   })
// };

export default PetForm;
