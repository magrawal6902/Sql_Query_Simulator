import { useState, useEffect } from "react";

const QueryInput = ({ onExecute }) => {
    // Load history from localStorage on mount
    const [queryHistory, setQueryHistory] = useState(() => {
        const savedHistory = localStorage.getItem("queryHistory");
        return savedHistory ? JSON.parse(savedHistory) : [];
    });

    const [query, setQuery] = useState("");

    // Save history to localStorage whenever it updates
    useEffect(() => {
        localStorage.setItem("queryHistory", JSON.stringify(queryHistory));
    }, [queryHistory]);

    const handleRunQuery = () => {
        if (query.trim() === "") return; // Prevent empty queries

        // Remove duplicate query before adding the new one
        const updatedHistory = [query, ...queryHistory.filter((q) => q !== query)];
        setQueryHistory(updatedHistory);
        onExecute(query); // Execute query
    };

    const handleClearHistory = () => {
        setQueryHistory([]); // Clear history
        localStorage.removeItem("queryHistory"); // Remove from localStorage
    };

    const handleUseQuery = (selectedQuery) => {
        setQuery(selectedQuery); // Copy selected query to textarea
    };

    return (
        <div>
            <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type SQL query here..."
                className="w-full h-24 p-2 border rounded"
            />
            <button onClick={handleRunQuery} className="mt-2 px-4 py-2 bg-blue-500 text-black rounded">
                Run Query
            </button>
            <button onClick={handleClearHistory} className="mt-2 ml-2 px-4 py-2 bg-red-500 text-black rounded">
                Clear History
            </button>

            {queryHistory.length > 0 && (
                <QueryHistory history={queryHistory} onUseQuery={handleUseQuery} />
            )}
        </div>
    );
};

// QueryHistory Component with "Use" Buttons
const QueryHistory = ({ history, onUseQuery }) => {
    return (
        <div className="mt-4 p-2 border rounded">
            <h3 className="font-bold">Query History</h3>
            <ul className="list-disc pl-4">
                {history.map((query, index) => (
                    <li key={index} className="flex justify-between items-center">
                        <span>{query}</span>
                        <button onClick={() => onUseQuery(query)} className="ml-2 px-2 py-1 bg-yellow-500 text-black rounded">
                            Use
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QueryInput;
