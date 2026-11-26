// Angka Indonesia — the router and the controls.
//
// The site is one page (index.html) with hash routes: #/ is the home page,
// #/penduduk, #/ekonomi, #/tenaga-kerja, #/kemiskinan and #/tentang are the
// sections. After a view renders, bindView wires up the controls that view
// offers: the home search box, the province table sort, and the GDP chart
// toggle. Every control does what it says — nothing is decorative.

import { FIGURES as F } from './data.js';
import { barChart, lineChart } from './charts.js';
import { GDP_CHARTS, ekonomiView, homeView, kemiskinanView, pendudukView, tentangView, tenagaKerjaView } from './views.js';

const routes = {
  '/': homeView,
  '/penduduk': pendudukView,
  '/ekonomi': ekonomiView,
  '/tenaga-kerja': tenagaKerjaView,
  '/kemiskinan': kemiskinanView,
  '/tentang': tentangView,
};

const titles = {
  '/': 'Beranda',
  '/penduduk': 'Penduduk',
  '/ekonomi': 'Ekonomi',
  '/tenaga-kerja': 'Tenaga Kerja',
  '/kemiskinan': 'Kemiskinan & Kesejahteraan',
  '/tentang': 'Tentang',
};

function currentRoute() {
  const hash = window.location.hash.replace(/^#/, '') || '/';
  return routes[hash] ? hash : '/';
}

function render() {
  const route = currentRoute();
  const view = document.getElementById('view');
  view.innerHTML = routes[route]();
  document.querySelectorAll('nav a').forEach((a) => {
    a.classList.toggle('active', a.getAttribute('href') === `#${route}`);
    if (route === '/' && a.getAttribute('href') === '#/') a.classList.add('active');
  });
  document.title = `Angka Indonesia — ${titles[route]}`;
  window.scrollTo(0, 0);
  bindView(route);
}

function bindView(route) {
  if (route === '/') bindHomeSearch();
  if (route === '/penduduk') bindProvinceSort();
  if (route === '/ekonomi') bindGdpToggle();
}

// Home: filter the indicator cards as the visitor types.
function bindHomeSearch() {
  const input = document.getElementById('home-search');
  const cards = [...document.querySelectorAll('#indicator-cards .card')];
  const empty = document.getElementById('search-empty');
  if (!input) return;
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    let shown = 0;
    for (const cardEl of cards) {
      const hit = !q || cardEl.dataset.search.toLowerCase().includes(q);
      cardEl.style.display = hit ? '' : 'none';
      if (hit) shown += 1;
    }
    empty.hidden = shown > 0;
  });
}

// Population page: sort the province table by name or by population.
function bindProvinceSort() {
  const table = document.getElementById('province-table');
  if (!table) return;
  const tbody = table.querySelector('tbody');
  // First click sorts the useful way: names A to Z, populations largest first.
  let direction = { name: -1, millions: 1 };
  table.querySelectorAll('button.sort').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.sort;
      const rows = [...tbody.querySelectorAll('tr')];
      direction[key] *= -1;
      const dir = direction[key];
      rows.sort((a, b) => {
        const cellsA = a.querySelectorAll('td');
        const cellsB = b.querySelectorAll('td');
        if (key === 'name') {
          return dir * cellsA[1].textContent.localeCompare(cellsB[1].textContent, 'id');
        }
        const num = (s) => Number(s.replace(/\./g, '').replace(',', '.'));
        return dir * (num(cellsA[2].textContent) - num(cellsB[2].textContent));
      });
      rows.forEach((row, i) => {
        row.querySelector('td').textContent = String(i + 1);
        tbody.appendChild(row);
      });
    });
  });
}

// Economy page: swap the GDP chart between growth (%) and nominal (Rp T).
function bindGdpToggle() {
  const buttons = document.querySelectorAll('.toggle-btn');
  const chart = document.getElementById('gdp-chart');
  const note = document.getElementById('gdp-chart-note');
  if (!chart) return;
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const key = btn.dataset.chart;
      const spec = GDP_CHARTS[key];
      // Growth is a bar chart (a zero baseline matters); nominal GDP is a
      // line chart, since the values sit far above zero and bars would look
      // identical.
      chart.innerHTML =
        key === 'growth'
          ? barChart(spec.rows, { unit: '%', decimals: 2 })
          : lineChart(spec.rows, { unit: '', decimals: 1 });
      note.textContent = spec.note;
    });
  });
}

window.addEventListener('hashchange', render);
render();
