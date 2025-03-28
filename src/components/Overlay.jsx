import React from "react";
import { FaPlay, FaTimes, FaTrash } from "react-icons/fa";

const Overlay = ({ isOpen, onClose, queryHistory, onUseQuery, onClearHistory }) => {
  // Group queries by time categories
  const groupQueriesByDate = (history) => {
    const today = new Date();
    const yesterday = new Date(today);
    const sevenDaysAgo = new Date(today);
    const thirtyDaysAgo = new Date(today);

    yesterday.setDate(today.getDate() - 1);
    sevenDaysAgo.setDate(today.getDate() - 7);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const grouped = {
      Today: [],
      Yesterday: [],
      "Last 7 Days": [],
      "30 Days or More": [],
    };

    history.forEach(({ query, timestamp }) => {
      const queryDate = new Date(timestamp);

      if (queryDate.toDateString() === today.toDateString()) {
        grouped.Today.push(query);
      } else if (queryDate.toDateString() === yesterday.toDateString()) {
        grouped.Yesterday.push(query);
      } else if (queryDate > sevenDaysAgo) {
        grouped["Last 7 Days"].push(query);
      } else {
        grouped["30 Days or More"].push(query);
      }
    });

    return grouped;
  };

  // Grouped queries using the function above
  const groupedQueries = groupQueriesByDate(queryHistory);

  return (
    <div className={`overlay ${isOpen ? "overlay-open" : ""}`}>
      <div className="overlay-content">
        {/* Header Section */}
        <div className="overlay-header">
          <h2 className="overlay-title">Query History</h2>
          <div className="overlay-buttons">
            {/* Clear History Button */}
            <button
              onClick={onClearHistory}
              className="clear-history-button"
            >
              <FaTrash/>
            </button>
            {/* Close Overlay Button */}
            <button
              onClick={onClose}
              className="close-overlay-button"
            >
              <FaTimes/>
            </button>
          </div>
        </div>

        {/* Scrollable Query History List */}
        <div className="overlay-body">
          {Object.keys(groupedQueries)
            .filter((category) => groupedQueries[category].length > 0) // Filter out empty groups
            .map((category) => (
              <div key={category} className="overlay-category">
                {/* Category Header */}
                <h3 className="overlay-category-title">{category}</h3>
                <ul className="overlay-query-list">
                  {groupedQueries[category].map((query, index) => (
                    <li
                      key={index}
                      className="overlay-query-item"
                    >
                      <span>{query}</span>
                      <button
                        onClick={() => onUseQuery(query)}
                        className="use-query-button"
                      >
                        <FaPlay/>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Overlay;