// Angka Indonesia — small SVG charts, drawn from the figures in data.js.
// No libraries: every chart is plain SVG built by these two helpers, so the
// site has nothing to fetch and nothing to load over the network.

const NAVY = '#0a2e4d';
const RED = '#c8102e';
const TEAL = '#0e7a6b';
const GOLD = '#c98a1b';
const GRID = '#d8dee4';

// A vertical bar chart. points: [{ label, value }]. The tallest bar is navy,
// the rest are a lighter steel blue; negative bars (a contraction year) are
// drawn below the zero line in red.
export function barChart(points, { height = 220, unit = '%', decimals = 2 } = {}) {
  const width = 640;
  const padL = 44;
  const padB = 28;
  const padT = 18;
  const innerH = height - padT - padB;
  const innerW = width - padL - 12;
  const values = points.map((p) => p.value);
  const max = Math.max(0, ...values);
  const min = Math.min(0, ...values);
  const span = max - min || 1;
  const zeroY = padT + (max / span) * innerH;
  const slot = innerW / points.length;
  const barW = Math.min(46, slot * 0.58);
  const fmt = (v) =>
    v.toLocaleString('id-ID', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  let svg = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Diagram batang">`;
  svg += `<line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + innerH}" stroke="${GRID}" />`;
  svg += `<line x1="${padL}" y1="${zeroY}" x2="${width - 12}" y2="${zeroY}" stroke="#9aa7b4" stroke-width="1.5" />`;
  points.forEach((p, i) => {
    const x = padL + i * slot + (slot - barW) / 2;
    const top = padT + ((max - Math.max(p.value, 0)) / span) * innerH;
    const bottom = padT + ((max - Math.min(p.value, 0)) / span) * innerH;
    const color = p.value < 0 ? RED : p.value === max ? NAVY : '#4a7ba6';
    svg += `<rect x="${x.toFixed(1)}" y="${top.toFixed(1)}" width="${barW}" height="${Math.max(1, bottom - top).toFixed(1)}" fill="${color}" rx="2" />`;
    const labelY = p.value < 0 ? bottom + 14 : top - 6;
    svg += `<text x="${(x + barW / 2).toFixed(1)}" y="${labelY.toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="${NAVY}">${fmt(p.value)}${unit}</text>`;
    svg += `<text x="${(x + barW / 2).toFixed(1)}" y="${height - 8}" text-anchor="middle" font-size="12" fill="#40536a">${p.label}</text>`;
  });
  svg += '</svg>';
  return svg;
}

// A horizontal bar chart for rankings (provinces). points: [{ label, value }].
export function hbarChart(points, { unit = ' jt' } = {}) {
  const rowH = 34;
  const height = points.length * rowH + 12;
  const width = 640;
  const padL = 132;
  const max = Math.max(...points.map((p) => p.value));
  const fmt = (v) =>
    v.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  let svg = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Diagram batang horizontal">`;
  points.forEach((p, i) => {
    const y = 6 + i * rowH;
    const w = ((p.value / max) * (width - padL - 78)).toFixed(1);
    const color = i === 0 ? NAVY : i < 3 ? '#2c5f8a' : '#6d9bc0';
    svg += `<text x="${padL - 8}" y="${y + 15}" text-anchor="end" font-size="13" fill="#1a2b3c">${p.label}</text>`;
    svg += `<rect x="${padL}" y="${y}" width="${w}" height="20" fill="${color}" rx="3" />`;
    svg += `<text x="${padL + Number(w) + 8}" y="${y + 15}" font-size="13" font-weight="700" fill="${NAVY}">${fmt(p.value)}${unit}</text>`;
  });
  svg += '</svg>';
  return svg;
}

// A line chart with dots and value labels. points: [{ label, value }].
export function lineChart(points, { height = 220, unit = '%', decimals = 2 } = {}) {
  const width = 640;
  const padL = 48;
  const padR = 16;
  const padB = 28;
  const padT = 20;
  const innerH = height - padT - padB;
  const innerW = width - padL - padR;
  const values = points.map((p) => p.value);
  let min = Math.min(...values);
  let max = Math.max(...values);
  const pad = (max - min) * 0.25 || 1;
  min -= pad;
  max += pad;
  const x = (i) => padL + (i / (points.length - 1)) * innerW;
  const y = (v) => padT + ((max - v) / (max - min)) * innerH;
  const fmt = (v) =>
    v.toLocaleString('id-ID', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  let svg = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Diagram garis">`;
  for (let g = 0; g <= 3; g++) {
    const gv = min + ((max - min) * g) / 3;
    const gy = y(gv);
    svg += `<line x1="${padL}" y1="${gy.toFixed(1)}" x2="${width - padR}" y2="${gy.toFixed(1)}" stroke="${GRID}" />`;
    svg += `<text x="${padL - 8}" y="${(gy + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="#6b7c8d">${fmt(gv)}</text>`;
  }
  svg += `<path d="${line}" fill="none" stroke="${TEAL}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" />`;
  points.forEach((p, i) => {
    svg += `<circle cx="${x(i).toFixed(1)}" cy="${y(p.value).toFixed(1)}" r="5" fill="#fff" stroke="${TEAL}" stroke-width="3" />`;
    svg += `<text x="${x(i).toFixed(1)}" y="${(y(p.value) - 11).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="${NAVY}">${fmt(p.value)}${unit}</text>`;
    svg += `<text x="${x(i).toFixed(1)}" y="${height - 8}" text-anchor="middle" font-size="12" fill="#40536a">${p.label}</text>`;
  });
  svg += '</svg>';
  return svg;
}

export { GOLD, NAVY, RED, TEAL };
