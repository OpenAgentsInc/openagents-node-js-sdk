const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'src');
const indexFile = path.join(__dirname, 'src/index.ts');

let ex = '';
fs.readdirSync(distDir).forEach(file => {
    if (path.extname(file) === '.ts') {
        const base = file.slice(0, -3);
        ex += `export * from './${base}';\n`;
        const content = fs.readFileSync(path.join(distDir, file), 'utf8');
        if (content.includes('export default')){
            ex += `export {default as ${base}} from './${base}';\n`;
        }
    }
});
console.log("Write index", indexFile);
fs.writeFileSync(indexFile, ex);