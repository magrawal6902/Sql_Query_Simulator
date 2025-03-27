import React, { useState, useEffect } from "react";

const SaveQueryPopup = ({ query, categories, onCreateCategory, onSaveToCategory, onClose }) => {
  const [newCategory, setNewCategory] = useState(""); // State for the new category name
  const [filteredCategories, setFilteredCategories] = useState(categories); // Maintain up-to-date list of categories

  // Sync filtered categories with categories passed as props
  useEffect(() => {
    setFilteredCategories(categories);
  }, [categories]);

  const handleCreateCategory = () => {
    if (newCategory.trim() === "") return; // Prevent empty category names

    // Create new category and add query to it
    onCreateCategory(newCategory); // Add new category to the list
    onSaveToCategory(newCategory, query); // Save the query to the newly created category

    // Clear input field after creation
    setNewCategory("");
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-60 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Save Query</h2>
        <p className="mb-4">
          Query: <strong>{query}</strong>
        </p>

        {/* List existing categories */}
        <h3 className="font-bold mb-2">Categories:</h3>
        <ul className="mb-4">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <li key={category} className="mt-1">
                <a
                  href="#"
                  onClick={() => onSaveToCategory(category, query)} // Save query when category is clicked
                  className="text-blue-500 underline cursor-pointer"
                >
                  {category}
                </a>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No available categories.</p>
          )}
        </ul>

        {/* Create new category */}
        <div className="flex mt-4">
          <input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New Category Name"
            className="flex-1 border rounded px-2 py-1 mr-2"
          />
          <button
            onClick={handleCreateCategory} // Create category and save query
            className="px-4 py-1 bg-green-500 text-black rounded"
          >
            Create
          </button>
        </div>

        {/* Close Popup */}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-black rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SaveQueryPopup;
