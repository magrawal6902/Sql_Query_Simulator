import React, { useState } from "react";
import { FaPlay, FaTimes, FaTrash } from "react-icons/fa";

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
    <div className={`saved-queries-overlay ${isOpen ? "saved-queries-overlay-open" : ""}`}>
        <div className="saved-queries-content">
            {/* Header Section */}
            <div className="saved-queries-header">
                <h2 className="saved-queries-title">Saved Queries</h2>
                <button
                    onClick={onClose}
                    className="close-button"
                >
                    <FaTimes/>
                </button>
            </div>

            {/* Content Section */}
            <div className="saved-queries-body">
                {Object.keys(savedQueries).length > 0 ? (
                    // Loop through all categories and display queries
                    Object.entries(savedQueries).map(([category, queries]) => (
                        <div key={category} className="category-section">
                            {/* Category Header */}
                            <button
                                onClick={() => toggleCategory(category)} // Toggle category dropdown
                                className="category-button"
                            >
                                {category}
                            </button>
                            {/* Expand/Collapse Queries */}
                            {expandedCategories[category] && (
                                <div className="queries-list">
                                    {queries.length > 0 ? (
                                        <ul className="queries-ul">
                                            {queries.map((query, index) => (
                                                <li key={index} className="query-item">
                                                    <span>{query}</span>
                                                    <div className="query-buttons">
                                                        {/* Use Button */}
                                                        <button
                                                            onClick={() => onUseQuery(query)} // Handle query usage
                                                            className="use-button"
                                                        >
                                                            <FaPlay/>
                                                        </button>
                                                        {/* Delete Button */}
                                                        <button
                                                            onClick={() => onDeleteQuery(category, query)} // Pass category and query
                                                            className="delete-button"
                                                        >
                                                            <FaTrash/>
                                                        </button>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="no-queries">No queries saved in this category.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="no-saved-queries">No saved queries available.</p>
                )}
            </div>
        </div>
    </div>
);
};

export default SavedQueryOverlay;
