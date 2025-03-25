import React, { useState } from 'react';
import axios from 'axios';

const SqlQueryGenerator = () => {
    const [prompt, setPrompt] = useState('');
    const [sqlQuery, setSqlQuery] = useState('');

    const handleGenerateQuery = async () => {
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-4o-mini',
                    messages: [
                        { role: 'user', content: `Give only SQL query for: ${prompt}` }
                    ],
                    temperature: 0.5,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
                    },
                }
            );
            setSqlQuery(response.data.choices[0].message.content.trim());
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
