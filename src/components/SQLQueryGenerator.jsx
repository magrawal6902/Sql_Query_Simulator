import React, { useState } from 'react';
import axios from 'axios';
import { HfInference } from "@huggingface/inference";


const SqlQueryGenerator = () => {
    const [prompt, setPrompt] = useState('');
    const [sqlQuery, setSqlQuery] = useState('');

    const handleGenerateQuery = async () => {
        try {
            const key = import.meta.env.VITE_HF_API_KEY
            const inference = new HfInference(key);
            const model = "cssupport/t5-small-awesome-text-to-sql";

            const response = await inference.textGeneration({
                model: model,
                inputs: prompt,
            });
            setSqlQuery(response.generated_text);
            
        } catch (error) {
            console.error('Error generating SQL query:', error);
        }
    };

    return (
        <div className="prompt-container">
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt here..."
                className="prompt-textarea"
            />
            <button onClick={handleGenerateQuery} className="generate-button">
                Generate SQL Query
            </button>
            {sqlQuery && (
                <div className="sql-query-container">
                    <h2 className="sql-query-title">Generated SQL Query:</h2>
                    <pre className="sql-query">{sqlQuery}</pre>
                </div>
            )}
        </div>
    );

};

export default SqlQueryGenerator;
