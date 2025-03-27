import React, { useState } from "react";

const SavedQueryOverlay = ({ isOpen, onClose, savedQueries, onUseQuery, onDeleteQuery }) => {
  const [expandedCategories, setExpandedCategories] = useState({}); // Track expanded/collapsed categories

  // Toggle the visibility of a category
  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category], // Toggle current category's state
    }));
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white w-[40%] shadow-lg transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 h-full flex flex-col">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg">Saved Queries</h2>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-red-500 text-black rounded"
          >
            Close
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-1 overflow-y-auto pr-2">
          {Object.keys(savedQueries).length > 0 ? (
            // Loop through all categories and display queries
            Object.entries(savedQueries).map(([category, queries]) => (
              <div key={category} className="mb-4">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category)} // Toggle category dropdown
                  className="w-full text-left font-bold text-blue-500 bg-gray-200 px-3 py-2 rounded"
                >
                  {category}
                </button>
                {/* Expand/Collapse Queries */}
                {expandedCategories[category] && (
                  <div className="mt-2">
                    {queries.length > 0 ? (
                      <ul className="list-disc pl-5">
                        {queries.map((query, index) => (
                          <li key={index} className="mt-1 flex justify-between items-center">
                            <span>{query}</span>
                            <div className="flex space-x-2">
                              {/* Use Button */}
                              <button
                                onClick={() => onUseQuery(query)} // Handle query usage
                                className="px-2 py-1 bg-green-500 text-black rounded"
                              >
                                Use
                              </button>
                              {/* Delete Button */}
                              <button
                                onClick={() => onDeleteQuery(category, query)} // Pass category and query
                                className="px-2 py-1 bg-red-500 text-black rounded"
                              >
                                Delete
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 mt-2">No queries saved in this category.</p>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No saved queries available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedQueryOverlay;
