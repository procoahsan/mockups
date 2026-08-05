const fs = require('fs');
const path = require('path');

const dir = 'f:/transcript';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace blue/indigo primary buttons with woah-500
    content = content.replace(/bg-blue-600 text-white/g, 'bg-woah-500 text-white');
    content = content.replace(/bg-indigo-600 text-white/g, 'bg-woah-500 text-white');
    content = content.replace(/hover:bg-blue-700/g, 'hover:bg-woah-600');
    content = content.replace(/hover:bg-indigo-700/g, 'hover:bg-woah-600');
    
    // Replace text colors on interactive elements to WOAH primary
    content = content.replace(/hover:text-blue-600/g, 'hover:text-woah-600');
    content = content.replace(/hover:text-indigo-600/g, 'hover:text-woah-600');

    // Ensure no dark backgrounds unless necessary
    content = content.replace(/bg-slate-800/g, 'bg-woah-dark');
    content = content.replace(/bg-slate-900/g, 'bg-woah-dark');
    content = content.replace(/bg-gray-800/g, 'bg-woah-dark');
    content = content.replace(/bg-gray-900/g, 'bg-woah-dark');

    // Ensure 12px rounded radius on white cards
    // This looks for bg-white class and rounded-lg, replacing with rounded-xl (12px)
    content = content.replace(/bg-white([^>]*)rounded-lg/g, 'bg-white$1rounded-xl');
    content = content.replace(/rounded-lg([^>]*)bg-white/g, 'rounded-xl$1bg-white');

    // Make sure we have subtle shadows (Tailwind shadow-sm)
    // Most cards already have shadow-sm, but let's change shadow-md to shadow-sm
    // to stick with "Soft shadows only"
    content = content.replace(/shadow-md/g, 'shadow-sm');
    content = content.replace(/shadow-lg/g, 'shadow-sm');

    fs.writeFileSync(filePath, content, 'utf8');
});
console.log('Applied WOAH pass 2: Buttons, Dark backgrounds, Cards, Shadows.');
