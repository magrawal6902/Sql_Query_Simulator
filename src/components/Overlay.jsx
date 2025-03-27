import React from "react";

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
    <div
      className={`fixed top-0 right-0 h-full bg-white w-[40%] shadow-lg transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 h-full flex flex-col">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg">Query History</h2>
          <div className="flex space-x-2">
            {/* Clear History Button */}
            <button
              onClick={onClearHistory}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Clear History
            </button>
            {/* Close Overlay Button */}
            <button
              onClick={onClose}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>

        {/* Scrollable Query History List */}
        <div className="flex-1 overflow-y-auto pr-2">
          {Object.keys(groupedQueries)
            .filter((category) => groupedQueries[category].length > 0) // Filter out empty groups
            .map((category) => (
              <div key={category} className="mb-4">
                {/* Category Header */}
                <h3 className="font-bold text-blue-600">{category}</h3>
                <ul className="list-disc pl-4">
                  {groupedQueries[category].map((query, index) => (
                    <li
                      key={index}
                      className="flex justify-between mt-2 items-center p-2 border rounded-md"
                    >
                      <span>{query}</span>
                      <button
                        onClick={() => onUseQuery(query)}
                        className="ml-2 px-3 py-1 bg-yellow-500 text-black rounded hover:bg-yellow-400"
                      >
                        Use
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
