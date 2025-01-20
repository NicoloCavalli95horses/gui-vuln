//=====================
// Import
//=====================
import fs from 'fs';
import path from 'path';
import {
  CVE_KEYWORDS,
  FOLDER_NAMES,
  DEF_GUI_KEYWORDS,
} from './keywords.js';
import {
  cves_database,
} from './database.js';

//=====================
// Consts
//=====================
const cd = process.cwd();
const uniqueIds = new Set();
const cves = [];

//=====================
// Functions
//=====================
function containsWord(text, words = []) {
  return words.some(w => {
    const regex = new RegExp(`\\b${w}\\b`, 'i'); // word delimitation, case-insensitive
    return regex.test(text);
  })
}


function getRelevantCVEs( folderName ) {
  const folderPath = folderName ? path.join(cd, '..', '..', 'osv-data', folderName) : path.join(cd, '..', '..', 'osv-data');

  try {
    // Read .json files
    const files = fs.readdirSync(folderPath).filter(file => file.endsWith('.json'));
  
    files.forEach((file, index) => {
      console.log(`Processing file ${index + 1}/${files.length}: ${file}`);
      const filePath = path.join(folderPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const jsonData = JSON.parse(fileContent);
      
      // Combine details + summary + ids in one text to optimize the search
      const details = (jsonData.details || '').slice(0, 2000); // limited to 2000 chars
      const summary = (jsonData.summary || '').slice(0, 2000);
      const id = jsonData.id || `ID-${index + 1}/${files.length}`;
      const text = ` ${id}, ${details}, ${summary}`.toLowerCase();

      // Remove duplicates
      if ( uniqueIds.has(id) ) { return; } 
      uniqueIds.add(id);

      // Filter relevant CVEs
      if ( !containsWord(text, DEF_GUI_KEYWORDS) ) { return; }
      cves.push( jsonData );
    });
    console.log(`Successfully read ${folderName}`);
    
  } catch (error) {
    console.error(`An error occur: ${error.message}`);
  }
}


async function seedDatabase() {
  if ( !cves.length ) { return; }

  console.log('Seeding database, please wait...');

  cves.forEach((cve, index) => {
    const details = (cve.details || '').slice(0, 2000);
    const summary = (cve.summary || '').slice(0, 2000);
    const id = cve.id || `ID-${index + 1}`;
    const text = `${id}, ${details}, ${summary}`.toLowerCase();
    

    for (const [key, categoryArr] of Object.entries(CVE_KEYWORDS)) {
      if (Object.prototype.hasOwnProperty.call(CVE_KEYWORDS, key)) {
        if ( containsWord(text, categoryArr) ) {
          addCVEToCategory( {name: key, cve} );
        }
      }
    }
  });
}

export async function addCVEToCategory( {name, cve} ) {
  try {
    // MongoDB automatically create the collection if does not exist
    const collection = cves_database.collection(name);
    await collection.insertOne(cve);
  } catch (error) {
    console.error(`Error while inserting CVE into category "${name}":`, error.message);
  }
}


//=====================
// Main
//=====================
async function main() {
  FOLDER_NAMES.forEach(name => getRelevantCVEs(name));
  getRelevantCVEs();
  await seedDatabase();
  console.log('Database successfully seeded!');
}

main();
