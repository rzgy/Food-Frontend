import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAllCategories, createCategory } from "../api/auth";
import Modal from "react-modal";
import { Link } from "react-router-dom";

Modal.setAppElement("#root");

const Categories = () => {
  const {
    data: categories,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchAllCategories,
  });

  const queryClient = useQueryClient();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", image: null });

  const handleOpenModal = () => setModalIsOpen(true);
  const handleCloseModal = () => setModalIsOpen(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewCategory((prevState) => ({ ...prevState, image: files[0] }));
    } else {
      setNewCategory((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const createCategoryMutation = useMutation({
    mutationFn: (formData) => createCategory(formData),
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
      setModalIsOpen(false);
    },
  });

  const handleCreateCategory = async () => {
    const formData = new FormData();
    formData.append("name", newCategory.name);
    formData.append("image", newCategory.image);
    createCategoryMutation.mutate(formData);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading categories</div>;
  }

  return (
    <div className="min-h-screen bg-[#252526] text-white font-serif flex flex-col items-center">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
        <h3 className="text-3xl font-bold mb-6 text-center">Categories</h3>
        <button
          onClick={handleOpenModal}
          className="bg-orange-500 text-white p-2 rounded"
        >
          Add Category
        </button>
        <div className="flex flex-wrap justify-center gap-10 mt-4">
          {categories.map((category) => (
            <div key={category._id} className="flex flex-col items-center">
              <Link to={`/category/${category._id}`}>
                <div className="bg-white text-black p-4 rounded-full shadow-md w-40 h-40 border-2 border-transparent transform transition-transform duration-300 hover:scale-110 flex items-center justify-center">
                  <img
                    src={`http://localhost:8000/${category.image}`}
                    alt={category.name}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                </div>
              </Link>
              <p className="text-lg font-medium text-white hover:text-orange-500 mt-2">
                {category.name}
              </p>
            </div>
          ))}
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleCloseModal}
          contentLabel="Add Category"
          className="bg-white p-8 rounded shadow-md max-w-md mx-auto mt-10"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <h2 className="text-2xl mb-4">Add Category</h2>
          <label className="block mb-2 text-orange-600">
            Name:
            <input
              type="text"
              name="name"
              value={newCategory.name}
              onChange={handleChange}
              className="block w-full mt-1 p-2 border rounded"
            />
          </label>
          <label className="block mb-2 text-orange-600">
            Image:
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="block w-full mt-1 p-2 border rounded"
            />
          </label>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleCloseModal}
              className="bg-gray-500 text-white p-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateCategory}
              className="bg-orange-500 text-white p-2 rounded"
            >
              Save
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Categories;
