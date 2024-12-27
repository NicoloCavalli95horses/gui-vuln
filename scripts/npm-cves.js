//=====================
// Import
//=====================
import { readFilterDatabase } from './read-utils.js';

//=====================
// Functions
//=====================
function isIssueRelevant( {keywords, data} ) {
  return keywords.some(keyword => data.includes(keyword));
}

readFilterDatabase( {folderName: 'npm', isIssueRelevant} );