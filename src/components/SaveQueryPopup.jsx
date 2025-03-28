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
    <div className="save-query-overlay">
        <div className="save-query-content">
            <h2 className="save-query-title">Save Query</h2>
            <p className="save-query-description">
                Query: <strong>{query}</strong>
            </p>

            {/* List existing categories */}
            <h3 className="categories-title">Categories:</h3>
            <ul className="categories-list">
                {filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                        <li key={category} className="category-item">
                            <a
                                href="#"
                                onClick={() => onSaveToCategory(category, query)} // Save query when category is clicked
                                className="category-link"
                            >
                                {category}
                            </a>
                        </li>
                    ))
                ) : (
                    <p className="no-categories">No available categories.</p>
                )}
            </ul>

            {/* Create new category */}
            <div className="new-category">
                <input
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="New Category Name"
                    className="new-category-input"
                />
                <button
                    onClick={handleCreateCategory} // Create category and save query
                    className="create-category-button"
                >
                    Create
                </button>
            </div>

            {/* Close Popup */}
            <button
                onClick={onClose}
                className="close-button"
            >
                Close
            </button>
        </div>
    </div>
);
};

export default SaveQueryPopup;
