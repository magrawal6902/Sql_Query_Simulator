import React, { useState, useEffect } from "react";
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

const QueryInput = ({ onExecute, queryHistory, setQueryHistory, selectedQuery, onSaveQuery }) => {
  const [query, setQuery] = useState(""); // Keeps the current input query
  const [newtemp, setNewTemp] = useState(""); // Keeps the selected text from textarea

  useEffect(() => {
    setQuery(selectedQuery); // Synchronize selected query with parent state
  }, [selectedQuery]);

  const handleRunQuery = () => {
    const data = newtemp || query; // Prioritize selected text, fallback to query

    if (data.trim() === "") return; // Prevent empty queries
    const timestamp = new Date().toISOString(); // Add current timestamp
    const updatedHistory = [
      { query, timestamp }, // Save query with timestamp for history only
      ...queryHistory.filter((item) => item.query !== query),
    ];
    setQueryHistory(updatedHistory);

    // Add query to history and avoid duplicates
    // const updatedHistory = [data, ...queryHistory.filter((q) => q !== data)];


    setQueryHistory(updatedHistory);
    onExecute(data); // Execute the query

    // Clear selected text after execution
    setNewTemp("");
  };

  const handleMouseUp = (e) => {
    const textarea = e.target;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    if (start === end) return; // No text selected

    const selectedText = textarea.value.substring(start, end).trim();
    if (selectedText === "") return; // Prevent empty selections

    setNewTemp(selectedText); // Update selected text state
  };

  return (
    <div>
      {/* SQL Input Textarea */}
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onMouseUp={handleMouseUp}
        placeholder="Type SQL query here..."
        className="w-full h-24 p-2 border rounded"
      />

      {/* Run Query Button */}
      <button
        onClick={handleRunQuery}
        disabled={query.trim() === ""} // Disable button if textarea is empty
        className={`mt-2 px-4 py-2 rounded ${query.trim() === "" ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-black"
          }`}
      >
        Run Query
      </button>

      {/* Save Query Button */}
      <button
        onClick={() => onSaveQuery(query)} // Trigger save query logic
        disabled={query.trim() === ""} // Disable button if textarea is empty
        className={`mt-2 ml-2 px-4 py-2 rounded ${query.trim() === "" ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-purple-500 text-black"
          }`}
      >
        Save Query
      </button>
    </div>
  );
};

export default QueryInput;
