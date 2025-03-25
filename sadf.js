const fs = require('fs');
const csv = require('csv-parser');

function csvToJson(filePath) {
    const results = [];

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            console.log(JSON.stringify(results, null, 2));
        });
}

// Provide the path to your CSV file
const filePath = './customers.csv';
csvToJson(filePath);