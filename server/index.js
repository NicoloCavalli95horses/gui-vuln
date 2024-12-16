//=====================
// Import
//=====================
import fs from 'fs';
import { req } from './server.js';
import { queries } from './query.js';


//=====================
// Main
//=====================
const allVulns = [];

const processQueries = async (queries) => {
  // Wait for each request to be executed and populate allVulns
  await Promise.allSettled(
    queries.map(async (q) => {
      const { vulns } = await req(q);
      vulns.forEach(v => {
        if (Object.keys(v).length) {
          allVulns.push(v);
        }
      });
    })
  );

  // Save a JSON file with the data
  const jsonData = JSON.stringify(allVulns, null, 2);
  fs.writeFile('../public/data.json', jsonData, (err) => {
    err ? console.error('Error writing file:', err.message) : console.log('File saved');
  });
};

processQueries(queries);



