import { useState, useEffect } from "react";
import QueryInput from "./components/QueryInput";
import QueryResults from "./components/QueryResults";
import "./App.css";
import SqlQueryGenerator from "./components/SQLQueryGenerator";
import Overlay from "./components/Overlay";
import LearnOverlay from "./components/LearnOverlay";
import SavedQueryOverlay from "./components/SavedQueryOverlay";
import SaveQueryPopup from "./components/SaveQueryPopup";
import { FaTimes, FaTrash, FaHistory, FaAdjust, FaSun } from 'react-icons/fa';

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
  const HandleTheme = () => {
    if (root.style.getPropertyValue('--background-color') === 'white') {
      root.style.setProperty('--background-color', 'black');
      root.style.setProperty('--text-color', 'rgb(143, 143, 143)');
      root.style.setProperty('--blue-color', '#1e3a8a');
      root.style.setProperty('--dark-gray', '#1f2937');
      root.style.setProperty('--red-color', '#b91c1c');
      root.style.setProperty('--orange-color', '#ea580c');
      root.style.setProperty('--dark-orange', '#c2410c');
      root.style.setProperty('--input-bg', 'rgba(122, 122, 122, 0.21)');
    } else {
      root.style.setProperty('--background-color', 'white');
      root.style.setProperty('--text-color', 'black');
      root.style.setProperty('--blue-color', '#b7d2fd');
      root.style.setProperty('--dark-gray', '#f3f4f6');
      root.style.setProperty('--red-color', '#ef4444');
      root.style.setProperty('--orange-color', '#fbbf24');
      root.style.setProperty('--dark-orange', '#f59e0b');
      root.style.setProperty('--input-bg', 'white');
    }
  }

  return (
    <div className="app-container">
      {/* Main Content */}
      <div className={`main-content ${isHistoryOverlayOpen || isLearnOverlayOpen || isSavedQueryOverlayOpen ? "main-content-reduced" : ""}`}>
        <div className="content-container">
          <h1 className="title">SQL Query Simulator</h1>
          <div className="button-container">
            <button className="theme-button" onClick={HandleTheme}><FaSun/></button>
            <button className="history-button" onClick={() => { closeAllOverlays(); setIsHistoryOverlayOpen(true); }}><FaHistory/></button>
            <button className="learn-button" onClick={() => { closeAllOverlays(); setIsLearnOverlayOpen(true); }}>Learn SQL</button>
            <button className="saved-queries-button" onClick={() => { closeAllOverlays(); setIsSavedQueryOverlayOpen(true); }}>Saved Queries</button>
          </div>
        </div>
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