import { useState } from "react";
import QueryInput from "./components/QueryInput";
import QueryResults from "./components/QueryResults";
import PredefinedQueries from "./components/PredefinedQueries";
import "./App.css";
import SqlQueryGenerator from "./components/SQLQueryGenerator";

function App() {
  const [selectedQuery, setSelectedQuery] = useState("");

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">SQL Query Simulator</h1>
      <SqlQueryGenerator />
      <QueryInput onExecute={setSelectedQuery} />
      {/* <PredefinedQueries onSelect={setSelectedQuery} /> */}
      <span className="mb-4"></span>
      {selectedQuery && <QueryResults query={selectedQuery} />}
    </div>
  );
}

export default App;