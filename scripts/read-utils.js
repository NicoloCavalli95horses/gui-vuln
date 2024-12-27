//=====================
// Import
//=====================
import fs from 'fs';
import path from 'path';
import { queries } from '../server/query.js';

// A flat array is obtained from queries.js by including unique names and ecosystems
const DEF_GUI_KEYWORDS = [...new Set(queries.flatMap(q => [q.package.name, q.package.ecosystem]))];

export function readFilterDatabase( {folderName = 'npm', isIssueRelevant = () => true} ) {
  const cd = process.cwd();
  const folderPath = path.join(cd, '..', '..', 'osv-data', folderName);

  try {
    const files = fs.readdirSync(folderPath).filter(file => file.endsWith('.json')); // read .json files
    const merged = [];

    files.forEach(file => {
      const filePath = path.join(folderPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const jsonData = JSON.parse(fileContent);
      const text = `${jsonData.details || ''} ${jsonData.id || ''}`.toLowerCase(); // text is combined to optimize the search

      // The consumer of this funciton will filter the .json data according to its needs. Default keywords are provided
      if (isIssueRelevant( {keywords: DEF_GUI_KEYWORDS, data: text} )) {
        merged.push(jsonData);
      }
    });

    const outputFileName = folderName.toLowerCase();
    const outputFilePath = path.join(cd, '..', `public/${outputFileName}.json`);
    fs.writeFileSync(outputFilePath, JSON.stringify(merged, null, 2));
    console.log(`Successfully saved ${outputFileName} CVEs in ${outputFilePath}`);
  } catch (error) {
    console.error(`An error occur: ${error.message}`);
  }
}

