const predefinedQueries = [
    { id: 1, query: "SELECT * FROM users;" },
    { id: 2, query: "SELECT * FROM orders WHERE status='shipped';" },
];

const PredefinedQueries = ({ onSelect }) => {
    return (
        <div>
            <h3>Select a Query:</h3>
            {predefinedQueries.map((q) => (
                <button
                    key={q.id}
                    onClick={() => onSelect(q.query)}
                    className="block p-2 m-1 bg-gray-200 rounded"
                >
                    {q.query}
                </button>
            ))}
        </div>
    );
};

export default PredefinedQueries;