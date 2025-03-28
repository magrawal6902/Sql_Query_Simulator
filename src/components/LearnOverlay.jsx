import React, { useState } from "react";
import { FaArrowLeft, FaTimes } from "react-icons/fa";

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
    <div className={`learn-overlay ${isOpen ? "learn-overlay-open" : ""}`}>
      <div className="learn-overlay-content">
        {/* Header Section */}
        <div className="learn-overlay-header">
          <h2 className="learn-overlay-title">{selectedTag ? selectedTag : "Learn SQL"}</h2>
          <button
            onClick={selectedTag ? handleBackClick : onClose}
            className="learn-overlay-button"
          >
            {selectedTag ? <FaArrowLeft/> : <FaTimes/>}
          </button>
        </div>

        {/* Content Section */}
        <div className="learn-overlay-body">
          {selectedTag ? (
            // Display definition and example query for the selected tag
            <div className="learn-overlay-tag-content">
              <p className="learn-overlay-definition"><strong>Definition:</strong> {sqlTags[selectedTag].definition}</p>
              <p className="learn-overlay-example-title"><strong>Example Query:</strong></p>
              <code className="learn-overlay-example">{sqlTags[selectedTag].example}</code>
            </div>
          ) : (
            // Display the list of SQL topics
            <ul className="learn-overlay-tag-list">
              {Object.keys(sqlTags).map((tag) => (
                <li key={tag} className="learn-overlay-tag-item">
                  <a
                    href="#"
                    onClick={() => handleTagClick(tag)}
                    className="learn-overlay-tag-link"
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