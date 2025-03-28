import React, { useState } from "react";
import * as XLSX from "xlsx";
import mockResults from "../data/mockResults";

const QueryResults = ({ query}) => {
    const result = mockResults[query] || [{ message: "No data found" }];
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const totalPages = Math.ceil(result.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentRows = result.slice(startIndex, startIndex + rowsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const downloadCSV = () => {
        const csvHeaders = Object.keys(result[0] || {}).join(",");
        const csvRows = result.map(row =>
            Object.values(row).map(val => `"${val}"`).join(",")
        );
        const csvContent = [csvHeaders, ...csvRows].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "query_results.csv";
        a.click();
        URL.revokeObjectURL(url);
    };

    const downloadJSON = () => {
        const jsonContent = JSON.stringify(result, null, 2);
        const blob = new Blob([jsonContent], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "query_results.json";
        a.click();
        URL.revokeObjectURL(url);
    };

    const downloadExcel = () => {
        const headers = Object.keys(result[0] || {});
        const rows = result.map(row => Object.values(row));

        const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Query Results");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "query_results.xlsx";
        a.click();
        URL.revokeObjectURL(url);
    };

    const downloadPDF = () => {
        import("jspdf").then(jsPDF => {
            import("jspdf-autotable").then(autoTable => {
                const doc = new jsPDF.default({ orientation: "landscape" });
                const headers = [Object.keys(result[0] || {})];
                const rows = result.map(row => Object.values(row));
        
                autoTable.default(doc, {
                    head: headers,
                    body: rows,
                });
        
                doc.save("query_results.pdf");
            });
        });
    };

    return (
        <div className="container">
            <div className="button-group">
                <button
                    onClick={downloadCSV}
                    className="download-csv-button"
                >
                    Download CSV
                </button>
                <button
                    onClick={downloadJSON}
                    className="download-json-button"
                >
                    Download JSON
                </button>
                <button
                    onClick={downloadExcel}
                    className="download-excel-button"
                >
                    Download Excel
                </button>
                <button
                    onClick={downloadPDF}
                    className="download-pdf-button"
                >
                    Download PDF
                </button>
            </div>
            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            {Object.keys(currentRows[0] || {}).map((key) => (
                                <th key={key} className="table-header">{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentRows.map((row, index) => (
                            <tr key={index}>
                                {Object.values(row).map((val, i) => (
                                    <td key={i} className="table-cell">{val}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="pagination-button"
                >
                    Previous
                </button>
                <span className="pagination-info">Page {currentPage} of {totalPages}</span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="pagination-button"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default QueryResults;