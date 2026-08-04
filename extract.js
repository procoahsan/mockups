const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// docx is a zip file. Extract document.xml and parse text from it.
const AdmZip = require('adm-zip');

const zip = new AdmZip('f:\\transcript\\FR10-Design-Review-Complete.docx');
const entry = zip.getEntry('word/document.xml');
const xml = entry.getData().toString('utf8');

// Extract text content from XML by removing tags
const text = xml.replace(/<w:br[^>]*\/>/g, '\n')
    .replace(/<\/w:p>/g, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/\n{3,}/g, '\n\n');

fs.writeFileSync('f:\\transcript\\review-text.txt', text, 'utf8');
console.log('Done');
