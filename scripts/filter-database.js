//=====================
// Import
//=====================
import fs from 'fs';
import path from 'path';


//=====================
// Consts
//=====================
const cd = process.cwd();
const outputFilePath = path.join(cd, '..', 'public', 'data.json');
const uniqueIds = new Set();
const jsonOutput = {
  data: []
};

const DEF_GUI_KEYWORDS = [
  'gui',
  'ui',
  'hci',
  'canvas',
  'html',
  'vue',
  'npm',
  'react',
  'angular',
  'flutter',
  'android',
  'jquery',
  'dart',
  'electron',
  'react-native',
  'three.js',
  'babylon',
  'next.js',
  'svelte',
  'ember',
  'preact',
  'webgl',
  'd3',
  'pixi.js',
  'sanitize-html',
  'dompurify',
  'xss-clean',
  'glslify',
  'twgl.js',
  'moderngl',
  'i18next',
  'react-intl',
  'formatjs',
  'react-aria',
  'vue-a11y'
];

const FOLDER_NAMES = [
  'AlmaLinux',
  'Alpine',
  'Android',
  'GIT',
  'Go',
  'Hex',
  'JavaScript',
  'Maven',
  'npm',
  'NuGet',
  'PyPI',
  'RubyGems',
];

//=====================
// Functions
//=====================
function containsWord(text, words = []) {
  return words.some(w => {
    const regex = new RegExp(`(?<!\\.)\\b${w}\\b`, 'i'); // word delimitation, case-insensitive
    return regex.test(text);
  })
}

function readFolder(folderName) {
  const folderPath = folderName ? path.join(cd, '..', '..', 'osv-data', folderName) : path.join(cd, '..', '..', 'osv-data');

  try {
    const files = fs.readdirSync(folderPath).filter(file => file.endsWith('.json')); // read .json files

    files.forEach((file, index) => {
      console.log(`Processing file ${index + 1}/${files.length}: ${file}`);
      const filePath = path.join(folderPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const jsonData = JSON.parse(fileContent);
      
      const details = (jsonData.details || '').slice(0, 1000); // limited to 1000 chars
      const text = `${details} ${id}`.toLowerCase(); // text is combined to optimize the search
      const id = jsonData.id || `ID-${index + 1}/${files.length}`;
      if ( uniqueIds.has(id) ) { return; } 
      uniqueIds.add(id);

      if ( containsWord(text, DEF_GUI_KEYWORDS) ) {
        jsonOutput.data.push(jsonData);
      }
    });
    console.log(`Successfully read ${folderName}`);
    
  } catch (error) {
    console.error(`An error occur: ${error.message}`);
  }
}

function mergeData() {
  if ( !jsonOutput.data.length ) { return; }

  try {
    fs.writeFileSync(outputFilePath, JSON.stringify(jsonOutput, null, 2));
    console.log(`Successfully saved data in ${outputFilePath}`);
  } catch (error) {
    console.error(`An error occur: ${error.message}`);
  }
}

function main() {
  FOLDER_NAMES.forEach(name => readFolder(name));
  mergeData();
}

main();
