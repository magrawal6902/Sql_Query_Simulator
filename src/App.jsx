import { useState, useEffect } from "react";
import QueryInput from "./components/QueryInput";
import QueryResults from "./components/QueryResults";
import "./App.css";
import SqlQueryGenerator from "./components/SQLQueryGenerator";
import Overlay from "./components/Overlay";
import LearnOverlay from "./components/LearnOverlay"; 
import SavedQueryOverlay from "./components/SavedQueryOverlay"; 
import SaveQueryPopup from "./components/SaveQueryPopup";

function App() {
  const [selectedQuery, setSelectedQuery] = useState("");
  const [temp, setTemp] = useState("");
  const [isHistoryOverlayOpen, setIsHistoryOverlayOpen] = useState(false);
  const [isLearnOverlayOpen, setIsLearnOverlayOpen] = useState(false);
  const [isSavedQueryOverlayOpen, setIsSavedQueryOverlayOpen] = useState(false); 
  const [isSaveQueryPopupOpen, setIsSaveQueryPopupOpen] = useState(false); 
  const [savedQueries, setSavedQueries] = useState(() => {
    const storedQueries = localStorage.getItem("savedQueries");
    return storedQueries ? JSON.parse(storedQueries) : {};
  }); // Initialize savedQueries from localStorage
  const [queryToSave, setQueryToSave] = useState("");

  // Categories are derived dynamically from savedQueries
  const categories = Object.keys(savedQueries);

  // Save savedQueries to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("savedQueries", JSON.stringify(savedQueries));
  }, [savedQueries]);

  
  // Manage query history in App.jsx
  const [queryHistory, setQueryHistory] = useState(() => {
    const savedHistory = localStorage.getItem("queryHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  // Save query history to localStorage on update
  useEffect(() => {
    localStorage.setItem("queryHistory", JSON.stringify(queryHistory));
  }, [queryHistory]);

  const handleUseQuery = (query) => {
    setSelectedQuery(query); // Set query for execution
  };

  const handleTemp = (query) => {

    setTemp(query); // Store temporary query
  };

  const handleSaveQuery = (query) => {
    setQueryToSave(query);
    setIsSaveQueryPopupOpen(true); // Open the Save Query Popup
  };

  const handleCreateCategory = (categoryName) => {
    if (!savedQueries[categoryName]) {
      const updatedSavedQueries = { ...savedQueries, [categoryName]: [] };
      setSavedQueries(updatedSavedQueries);
    }
  };

  const handleSaveToCategory = (categoryName, query) => {
    const updatedQueries = [...(savedQueries[categoryName] || []), query];
    const updatedSavedQueries = { ...savedQueries, [categoryName]: updatedQueries };
    setSavedQueries(updatedSavedQueries);
    setIsSaveQueryPopupOpen(false); // Close popup after saving
  };

  const handleDeleteQuery = (categoryName, query) => {
    const updatedQueries = savedQueries[categoryName].filter((q) => q !== query);
    const updatedSavedQueries = { ...savedQueries };

    if (updatedQueries.length > 0) {
      updatedSavedQueries[categoryName] = updatedQueries;
    } else {
      delete updatedSavedQueries[categoryName];
    }

    setSavedQueries(updatedSavedQueries);
  };

  const handleClearHistory = () => {
    setQueryHistory([]);
    localStorage.removeItem("queryHistory");
  };

  const closeAllOverlays = () => {
    setIsHistoryOverlayOpen(false);
    setIsLearnOverlayOpen(false);
    setIsSavedQueryOverlayOpen(false);
  };

  return (
    <div className="h-screen w-screen flex relative">
      {/* Main Content */}
      <div
        className={`transition-all duration-300 p-5 relative ${
          isHistoryOverlayOpen || isLearnOverlayOpen || isSavedQueryOverlayOpen
            ? "w-[60%]"
            : "w-full"
        }`}
      >
        {/* History, Learn SQL, and Saved Query Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            className="bg-blue-500 text-black px-4 py-2 rounded mb-4"
            onClick={() => {
              closeAllOverlays();
              setIsHistoryOverlayOpen(true);
            }}
          >
            History
          </button>
          <button
            className="bg-green-500 text-black px-4 py-2 rounded mb-4"
            onClick={() => {
              closeAllOverlays();
              setIsLearnOverlayOpen(true);
            }}
          >
            Learn SQL
          </button>
          <button
            className="bg-purple-500 text-black px-4 py-2 rounded mb-4"
            onClick={() => {
              closeAllOverlays();
              setIsSavedQueryOverlayOpen(true);
            }}
          >
            Saved Queries
          </button>
        </div>

        <div className="p-5">
          <h1 className="text-2xl font-bold mb-4">SQL Query Simulator</h1>
          <SqlQueryGenerator />
          <QueryInput
            onExecute={handleUseQuery}
            queryHistory={queryHistory}
            setQueryHistory={setQueryHistory}
            selectedQuery={temp}
            onSaveQuery={handleSaveQuery}
          />
          {selectedQuery && <QueryResults query={selectedQuery} />}
        </div>
      </div>

      {/* History Overlay */}
      {isHistoryOverlayOpen && (
        <Overlay
          isOpen={isHistoryOverlayOpen}
          onClose={() => setIsHistoryOverlayOpen(false)}
          queryHistory={queryHistory}
          onUseQuery={handleTemp}
          onClearHistory={handleClearHistory}
        />
      )}

      {/* Learn SQL Overlay */}
      {isLearnOverlayOpen && (
        <LearnOverlay
          isOpen={isLearnOverlayOpen}
          onClose={() => setIsLearnOverlayOpen(false)}
        />
      )}

      {/* Saved Query Overlay */}
      {isSavedQueryOverlayOpen && (
        <SavedQueryOverlay
          isOpen={isSavedQueryOverlayOpen}
          onClose={() => setIsSavedQueryOverlayOpen(false)}
          savedQueries={savedQueries}
          onUseQuery={handleTemp}
          onDeleteQuery={handleDeleteQuery}
        />
      )}

      {/* Save Query Popup */}
      {isSaveQueryPopupOpen && (
        <SaveQueryPopup
          query={queryToSave}
          categories={categories}
          onCreateCategory={handleCreateCategory}
          onSaveToCategory={handleSaveToCategory}
          onClose={() => setIsSaveQueryPopupOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
