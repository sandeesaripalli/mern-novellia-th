import React, { useEffect, useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { getPets, deletePet } from "../services/petService";

const AdminPage = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    const data = await getPets();
    setPets(data);
    // console.log('Fetched pets:', data);
  };

  const handleDelete = async (id) => {
    await deletePet(id);
    // console.log('Deleted pet with id:', id);
    fetchPets();
  };

  // TODO: Add edit functionality
  // const handleEdit = (id) => {
  //   console.log('Edit pet with id:', id);
  // };

  const columns = useMemo(
    () => [
      {
        accessorKey: "imageUrl",
        header: "Profile Image",
        cell: ({ cell }) => (
          <img
            src={cell.getValue() || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "type",
        header: "Type",
      },
      {
        accessorKey: "owner",
        header: "Owner",
      },
      {
        accessorKey: "dateOfBirth",
        header: "Date of Birth",
        cell: ({ cell }) => new Date(cell.getValue()).toLocaleDateString(),
      },
      {
        accessorKey: "vaccines",
        header: "Vaccines",
        cell: ({ cell }) => (
          <ul>
            {cell.getValue().map((vaccine, index) => (
              <li key={index}>
                {vaccine.name} -{" "}
                {new Date(vaccine.dateAdministered).toLocaleDateString()}
              </li>
            ))}
          </ul>
        ),
      },
      {
        accessorKey: "allergies",
        header: "Allergies",
        cell: ({ cell }) => (
          <ul>
            {cell.getValue().map((allergy, index) => (
              <li key={index}>
                {allergy.name} - {allergy.reactions} ({allergy.severity})
              </li>
            ))}
          </ul>
        ),
      },
      {
        accessorKey: "_id",
        header: "Actions",
        cell: ({ cell }) => (
          <button
            onClick={() => handleDelete(cell.getValue())}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        ),
      },
    ],
    [handleDelete]
  );

  const table = useReactTable({
    data: pets,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // console.log('Table instance:', table);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin - Manage Pets</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;

// TODO: Add pagination
// TODO: Implement search functionality
