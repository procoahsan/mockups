const fs = require('fs');
const path = require('path');

const dir = 'f:/transcript';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Update Tailwind Config script
    content = content.replace(
        /fontFamily:\{sans:\['Inter','system-ui','sans-serif'\]\}/g,
        "fontFamily:{sans:['Söhne','Inter','Arial','sans-serif']}"
    );

    const oldColors = "colors:{woah:{50:'#fff7ed',100:'#ffedd5',200:'#fed7aa',300:'#fdba74',400:'#fb923c',500:'#ff4815',600:'#ea580c',700:'#c2410c',800:'#9a3412',900:'#7c2d12'}}";
    const newColors = "colors:{woah:{50:'#fff7ed',100:'#ffedd5',200:'#fed7aa',300:'#fdba74',400:'#fb923c',500:'#ff4815',600:'#ea580c',700:'#c2410c',800:'#9a3412',900:'#7c2d12',dark:'#27282A',beige:'#EFEEE8'},pastel:{blue:'#DCE9F4',green:'#DDF3E6',yellow:'#FFF2CE',pink:'#FFE7F0'}}";
    content = content.replace(oldColors, newColors);

    // Update inline CSS font-family
    content = content.replace(
        /body\{font-family:'Inter',system-ui,sans-serif;-webkit-font-smoothing:antialiased\}/g,
        "body{font-family:'Söhne','Inter','Arial',sans-serif;-webkit-font-smoothing:antialiased;color:'#27282A'}"
    );

    // Update typography classes across HTML (Slate text to woah-dark, but not bg-slate which might be borders/backgrounds)
    content = content.replace(/text-slate-800/g, 'text-woah-dark');
    content = content.replace(/text-slate-900/g, 'text-woah-dark');
    
    // Convert rounded-lg or rounded-md to rounded-xl where appropriate to meet 10-14px guideline?
    // Tailwind's rounded-xl is 12px. rounded-lg is 8px. rounded-2xl is 16px.
    // The instructions say "Rounded corners (10-14px). Cards: 12px radius."
    // Let's replace 'rounded-lg' with 'rounded-xl' globally in HTML files.
    // Except when it's specific icons that need rounded-lg (8px). 8px is fine too.
    
    // Status colors mapping
    // Green -> #16a34a (green-600) -> is fine.
    // Amber -> amber-500 -> fine.
    // Red -> red-500 -> fine.
    // Blue -> sky-500 or blue-500 -> fine.

    // Let's ensure background is not dark.
    // bg-slate-900 -> bg-woah-dark
    content = content.replace(/bg-slate-900/g, 'bg-woah-dark');

    fs.writeFileSync(filePath, content, 'utf8');
});
console.log('Applied WOAH branding config updates.');
