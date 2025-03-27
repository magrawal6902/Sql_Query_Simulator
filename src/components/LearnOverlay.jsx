import React, { useState } from "react";

const LearnOverlay = ({ isOpen, onClose }) => {
  const [selectedTag, setSelectedTag] = useState(null); // Track the selected tag

  // Data for SQL tags with definitions and example queries
  const sqlTags = {
    "SELECT": {
      definition: "The SELECT statement is used to retrieve data from a database table.",
      example: "SELECT * FROM Employees;",
    },
    "INSERT": {
      definition: "The INSERT statement is used to add new rows of data to a database table.",
      example: "INSERT INTO Employees (Name, Age, Department) VALUES ('Alice', 30, 'HR');",
    },
    "UPDATE": {
      definition: "The UPDATE statement modifies existing data in a table based on a condition.",
      example: "UPDATE Employees SET Age = 31 WHERE Name = 'Alice';",
    },
    "DELETE": {
      definition: "The DELETE statement removes data from a table based on a condition.",
      example: "DELETE FROM Employees WHERE Name = 'Alice';",
    },
    "WHERE": {
      definition: "The WHERE clause is used to filter records based on specific conditions.",
      example: "SELECT * FROM Employees WHERE Department = 'HR';",
    },
    "JOIN": {
      definition: "JOIN is used to combine rows from two or more tables based on a related column.",
      example: "SELECT Employees.Name, Departments.DepartmentName FROM Employees JOIN Departments ON Employees.DepartmentID = Departments.ID;",
    },
    "GROUP BY": {
      definition: "The GROUP BY clause groups rows that share a property, enabling aggregate functions like COUNT or AVG.",
      example: "SELECT Department, COUNT(*) FROM Employees GROUP BY Department;",
    },
    "ORDER BY": {
      definition: "The ORDER BY clause is used to sort data in ascending or descending order.",
      example: "SELECT * FROM Employees ORDER BY Age DESC;",
    },
    "HAVING": {
      definition: "The HAVING clause filters grouped data, typically used with aggregate functions.",
      example: "SELECT Department, COUNT(*) FROM Employees GROUP BY Department HAVING COUNT(*) > 5;",
    },
    "CREATE TABLE": {
      definition: "The CREATE TABLE statement is used to create a new table in a database.",
      example: "CREATE TABLE Employees (ID INT PRIMARY KEY, Name VARCHAR(100), Age INT, Department VARCHAR(50));",
    },
    "ALTER TABLE": {
      definition: "The ALTER TABLE statement is used to modify the structure of an existing table.",
      example: "ALTER TABLE Employees ADD COLUMN Salary INT;",
    },
    "DROP TABLE": {
      definition: "The DROP TABLE statement is used to delete a table and its data from the database.",
      example: "DROP TABLE Employees;",
    },
  };

  // Handler to open tag definitions
  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  // Handler to go back to LearnOverlay
  const handleBackClick = () => {
    setSelectedTag(null);
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
          <h2 className="font-bold text-lg">{selectedTag ? selectedTag : "Learn SQL"}</h2>
          <button
            onClick={selectedTag ? handleBackClick : onClose}
            className="px-3 py-1 bg-blue-500 text-black rounded"
          >
            {selectedTag ? "Back" : "Close"}
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-1 overflow-y-auto pr-2">
          {selectedTag ? (
            // Display definition and example query for the selected tag
            <div>
              <p className="mb-4"><strong>Definition:</strong> {sqlTags[selectedTag].definition}</p>
              <p className="mb-4"><strong>Example Query:</strong></p>
              <code className="block bg-gray-100 p-2 rounded">{sqlTags[selectedTag].example}</code>
            </div>
          ) : (
            // Display the list of SQL topics
            <ul className="list-disc pl-5 mt-4">
              {Object.keys(sqlTags).map((tag) => (
                <li key={tag} className="mt-2">
                  <a
                    href="#"
                    onClick={() => handleTagClick(tag)}
                    className="text-blue-500 underline"
                  >
                    {tag}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearnOverlay;
