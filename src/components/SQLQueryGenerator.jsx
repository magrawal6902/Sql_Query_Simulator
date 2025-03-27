import React, { useState } from 'react';
import axios from 'axios';
import { HfInference } from "@huggingface/inference";


const SqlQueryGenerator = () => {
    const [prompt, setPrompt] = useState('');
    const [sqlQuery, setSqlQuery] = useState('');

    const handleGenerateQuery = async () => {
        try {
            const HF_API_KEY = "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"; // Load API Key from environment variables
            const inference = new HfInference(HF_API_KEY);
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
        <div>
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt here..."
            />
            <button onClick={handleGenerateQuery}>Generate SQL Query</button>
            {sqlQuery && (
                <div>
                    <h2>Generated SQL Query:</h2>
                    <pre>{sqlQuery}</pre>
                </div>
            )}
        </div>
    );

};

export default SqlQueryGenerator;
