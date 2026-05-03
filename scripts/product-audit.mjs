import fs from 'node:fs';

const source = fs.readFileSync('src/main.jsx', 'utf8');
const channelBlock = source.match(/const channels = \[([\s\S]*?)\n\];/)?.[1] || '';
const channels = [...channelBlock.matchAll(/\{[\s\S]*?id: '([^']+)'[\s\S]*?name: '([^']+)'[\s\S]*?region: '([^']+)'[\s\S]*?language: '([^']+)'[\s\S]*?type: '([^']+)'[\s\S]*?description: '([^']+)'[\s\S]*?officialUrl: '([^']*)'[\s\S]*?streamUrl: '([^']*)'/g)]
  .map((m) => ({ id: m[1], name: m[2], region: m[3], language: m[4], type: m[5], description: m[6], officialUrl: m[7], streamUrl: m[8] }));

const duplicateIds = channels.map((c) => c.id).filter((id, index, ids) => ids.indexOf(id) !== index);
const duplicateNames = channels.map((c) => c.name.toLowerCase()).filter((name, index, names) => names.indexOf(name) !== index);
const playable = channels.filter((c) => c.streamUrl);
const listed = channels.filter((c) => !c.streamUrl);
const weakDescriptions = channels.filter((c) => c.description.length < 42);
const suspiciousUrls = channels.filter((c) => {
  const urls = [c.officialUrl, c.streamUrl].filter(Boolean);
  return urls.some((url) => !/^https:\/\//.test(url));
});
const regions = [...new Set(channels.map((c) => c.region))].sort();
const languages = [...new Set(channels.flatMap((c) => c.language.split('/')))].sort();

const recommendations = [];
if (playable.length < 15) recommendations.push('Find 4+ additional clearly legal public HLS streams, prioritising Swiss regional/local sources.');
if (listed.length > playable.length) recommendations.push('For listed-only channels, add better official-source context and “why not playable” transparency.');
if (!source.includes('keydown')) recommendations.push('Add keyboard/remote navigation for Apple TV / lean-back usage.');
if (!source.includes('verified')) recommendations.push('Add per-channel verification metadata: last checked date, source type, reliability note.');
if (!source.includes('onboarding')) recommendations.push('Add first-run onboarding explaining legal playback, favorites, and private streams.');
if (!source.includes('provider comparison')) recommendations.push('Add provider comparison content for SEO and future affiliate/business path.');

const report = `# Continuous Product Audit\n\nGenerated: ${new Date().toISOString()}\n\n## Snapshot\n\n- Channels tracked: ${channels.length}\n- Playable in-app: ${playable.length}\n- Official-source only: ${listed.length}\n- Regions covered: ${regions.length}\n- Languages covered: ${languages.join(', ')}\n\n## Quality checks\n\n- Duplicate IDs: ${duplicateIds.length ? duplicateIds.join(', ') : 'none'}\n- Duplicate names: ${duplicateNames.length ? duplicateNames.join(', ') : 'none'}\n- Weak descriptions: ${weakDescriptions.length ? weakDescriptions.map((c) => c.name).join(', ') : 'none'}\n- Non-HTTPS/suspicious URLs: ${suspiciousUrls.length ? suspiciousUrls.map((c) => c.name).join(', ') : 'none'}\n\n## Next improvement candidates\n\n${recommendations.map((item) => `- ${item}`).join('\n') || '- No obvious gaps detected. Focus on customer validation and deployment.'}\n\n## Guardrails\n\n- Do not add pirated streams.\n- Do not scrape protected broadcaster content.\n- Do not bypass ads, paywalls, DRM, or geoblocks.\n- Prefer official links and explicitly verified public HLS streams.\n`;

fs.writeFileSync('reports/continuous-improvement.md', report);

if (duplicateIds.length || suspiciousUrls.length) {
  console.error(report);
  process.exit(1);
}

console.log(report);
