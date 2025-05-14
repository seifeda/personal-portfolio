import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runDiagnostic() {
  console.log('=== Project Diagnostic ===');

  // Check configuration files
  const configFiles = [
    'tailwind.config.js',
    'postcss.config.js',
    'package.json',
    'src/index.css'
  ];

  configFiles.forEach(file => {
    const fullPath = path.join(__dirname, file);
    console.log(`\n${file}:`);
    try {
      const content = fs.readFileSync(fullPath, 'utf8');
      console.log('File exists and is readable');
      console.log('First 100 characters:', content.slice(0, 100));
    } catch (error) {
      console.error(`Error reading ${file}:`, error.message);
    }
  });

  // Check Tailwind CSS installation
  try {
    const tailwindPkgPath = path.join(__dirname, 'node_modules', 'tailwindcss', 'package.json');
    const tailwindPkgContent = fs.readFileSync(tailwindPkgPath, 'utf8');
    const tailwindPkg = JSON.parse(tailwindPkgContent);
    console.log('\nTailwind CSS Version:', tailwindPkg.version);
  } catch (error) {
    console.error('Tailwind CSS not found:', error.message);
  }
}

// Run the diagnostic
runDiagnostic().catch(console.error);