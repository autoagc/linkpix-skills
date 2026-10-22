import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// 从实际技能目录生成索引和 README，避免新技能遗漏在发布清单之外。
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const skills = path.join(root, 'skills');
const slugs = fs.readdirSync(skills).filter(slug =>
  fs.existsSync(path.join(skills, slug, 'SKILL.md'))).sort();
const known = new Set(slugs);
const readmePath = path.join(root, 'README.md');
let readme = fs.readFileSync(readmePath, 'utf8').split('\n').filter(line => {
  const match = line.match(/^\| `((?:linkpix|qinghu)[^`]*)` \|/);
  return !match || known.has(match[1]);
}).join('\n');
const rows = new Map();
for (const line of readme.split('\n')) {
  const match = line.match(/^\| `((?:linkpix|qinghu)[^`]*)` \|/);
  if (match && known.has(match[1])) rows.set(match[1], line);
}
const escape = value => value.replaceAll('|', '&#124;').replace(/[\r\n]+/g, ' ');
const missing = slugs.filter(slug => !rows.has(slug));
if (missing.length) {
  const added = missing.map(slug => {
    const meta = JSON.parse(fs.readFileSync(path.join(skills, slug, '_meta.json'), 'utf8'));
    const counterpart = slug === 'qinghu-ai' ? 'linkpix' : slug.replace(/^qinghu-/, 'linkpix-');
    const original = rows.get(counterpart);
    const body = fs.readFileSync(path.join(skills, slug, 'SKILL.md'), 'utf8');
    const dependency = original ? original.split(' | ')[2]
      : /qhkit mcp /.test(body) ? '`qhkit mcp`'
      : /qhkit \w[\w-]* (?:generate|options|script)/.test(body) ? '`qhkit`' : '`本地`';
    // 品牌副本沿用原技能的简要说明，避免把推广长文案塞进清单。
    const description = original ? original.split(' | ').slice(3).join(' | ').replace(/ \|$/, '') : escape(meta.desc);
    const row = `| \`${slug}\` | ${escape(meta.displayName)} | ${dependency} | ${description} |`;
    rows.set(slug, row);
    return row;
  });
  const section = `<details>\n<summary><b>青虎AI 素材与全能入口（${added.length} 个）</b></summary>\n\n`
    + '| 技能 | 名称 | 依赖 | 说明 |\n|---|---|---|---|\n' + added.join('\n') + '\n\n</details>\n\n';
  readme = readme.replace('## 其他分发渠道', section + '## 其他分发渠道');
}
readme = readme.replace(/(<details>[\s\S]*?<summary><b>[^\n]*?（)\d+( 个[^\n]*<\/summary>[\s\S]*?<\/details>)/g,
  (section, before, after) => before + [...section.matchAll(/^\| `(?:linkpix|qinghu)[^`]*` \|/gm)].length + after);
readme = readme.replace(/共 \*\*\d+ 个技能\*\*/, `共 **${slugs.length} 个技能**`)
  .replace(/— \d+ Agent Skills/, `— ${slugs.length} Agent Skills`);
const count = token => [...rows.values()].filter(row => row.split(' | ')[2].includes(token)).length;
const cli = count('`qhkit`'), data = count('`qhkit mcp`');
const mcp = count('`MCP`'), local = count('`本地`');
const overlap = [...rows.values()].filter(row => row.split(' | ')[2].includes(' + ')).length;
readme = readme.replace(/按技能正文实际调用的工具统计[^\n]*：/,
  `按技能正文实际调用的工具统计（有 ${overlap} 个技能同时需要两种，故合计大于 ${slugs.length}）：`);
readme = readme.replace(/\| `qhkit` CLI \| \d+ \|/, `| \`qhkit\` CLI | ${cli} |`)
  .replace(/\| 青虎 MCP \| \d+ \|/, `| 青虎 MCP | ${mcp} |`)
  .replace(/\| `qhkit mcp`（青虎数据工具） \| \d+ \|/, `| \`qhkit mcp\`（青虎数据工具） | ${data} |`)
  .replace(/\| ImageMagick \/ ffmpeg \| \d+ \|/, `| ImageMagick / ffmpeg | ${local} |`);
const oldOrder = JSON.parse(fs.readFileSync(path.join(skills, '_slugs.json'), 'utf8'));
const order = [...new Set([...oldOrder.filter(slug => known.has(slug)), ...slugs])];
const outputs = new Map([
  [readmePath, readme],
  [path.join(skills, '_slugs.json'), JSON.stringify(order, null, 2) + '\n'],
  [path.join(skills, '_slugs.txt'), order.join('\n') + '\n'],
]);
let stale = false;
for (const [file, expected] of outputs) {
  if (fs.readFileSync(file, 'utf8') === expected) continue;
  stale = true;
  if (!process.argv.includes('--check')) fs.writeFileSync(file, expected, 'utf8');
}
if (process.argv.includes('--check') && stale) throw new Error('技能清单未同步，请运行 node scripts/sync_catalog.mjs');
console.log(JSON.stringify({skills: slugs.length, cli, data, mcp, local, overlap, changed: stale}));
