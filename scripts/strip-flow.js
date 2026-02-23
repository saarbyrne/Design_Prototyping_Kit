/**
 * Strips Flow types from src/playbook-components and writes to src/playbook-components-build.
 * Run before dev/build so Vite never sees Flow syntax.
 * Files containing JSX are written with .jsx extension so Vite parses them correctly.
 */
const path = require('path');
const fs = require('fs');
const flowRemoveTypes = require('flow-remove-types');

const srcDir = path.join(__dirname, '../src/playbook-components');
const outDir = path.join(__dirname, '../src/playbook-components-build');

/** Heuristic: content has JSX if it contains tags or return <... */
function hasJSX(code) {
  return /<[A-Za-z][\w.]*\s*[\s/>]|<\s*\/|return\s+</.test(code);
}

function stripDir(dir, outPath) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const src = path.join(dir, e.name);
    const dest = path.join(outPath, e.name);
    if (e.isDirectory()) {
      if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
      stripDir(src, dest);
    } else if (e.name.endsWith('.js') || e.name.endsWith('.jsx')) {
      const code = fs.readFileSync(src, 'utf8');
      let outCode;
      if (!/@flow|\bimport\s+type\s|\btype\s+\w+\s*=/.test(code)) {
        outCode = code;
      } else {
        outCode = flowRemoveTypes(code, { pretty: false }).toString();
      }
      const useJsx = hasJSX(outCode);
      const base = e.name.slice(0, -(e.name.endsWith('.jsx') ? 4 : 3));
      const outName = useJsx ? base + '.jsx' : base + '.js';
      const outDest = path.join(outPath, outName);
      fs.writeFileSync(outDest, outCode);
    } else {
      fs.copyFileSync(src, dest);
    }
  }
}

if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true });
}
fs.mkdirSync(outDir, { recursive: true });
stripDir(srcDir, outDir);
console.log('Flow stripped to src/playbook-components-build');
