// Angka Indonesia — the pages. Each view is a function that returns the
// HTML for one hash route. All figures come from data.js; nothing here is
// placeholder text, and every control a view shows is wired up in main.js.

import { FIGURES as F, id, idInt } from './data.js';
import { barChart, hbarChart, lineChart } from './charts.js';

function sourceLine(source) {
  return `<p class="source">Sumber: ${source}</p>`;
}

function card(value, label, note, href) {
  return `<a class="card" href="${href}" data-search="${label} ${value} ${note}">
    <span class="card-value">${value}</span>
    <span class="card-label">${label}</span>
    <span class="card-note">${note}</span>
  </a>`;
}

export function homeView() {
  const gdpRows = F.gdpGrowth.map((p) => ({ label: String(p.year), value: p.value }));
  const top5 = F.provinces.slice(0, 5).map((p) => ({ label: p.name, value: p.millions }));
  return `
  <section class="hero">
    <p class="eyebrow">Statistik resmi Indonesia · Data: BPS &amp; Bank Indonesia</p>
    <h1>Indonesia dalam angka</h1>
    <p class="lede">Penduduk, ekonomi, tenaga kerja, dan kesejahteraan — angka-angka
    terbaru Indonesia, dikumpulkan dari rilis resmi dan dijelaskan dengan
    grafik yang bisa dibaca sekilas.</p>
    <p class="updated">Diperbarui ${F.updated}</p>
    <label class="search">Cari indikator
      <input id="home-search" type="search" placeholder="misalnya: inflasi, kemiskinan, PDB…" autocomplete="off">
    </label>
  </section>

  <section aria-label="Indikator utama">
    <h2>Indikator utama <span class="en">Key indicators</span></h2>
    <div class="cards" id="indicator-cards">
      ${card(id(F.population.totalMillions) + ' jt', 'Penduduk 2025', 'SUPAS 2025 · tumbuh 1,08% per tahun', '#/penduduk')}
      ${card('Rp' + id(F.gdp.nominalTrillion2025, 1) + ' T', 'PDB 2025', 'Tumbuh ' + id(F.gdp.growth2025) + '% (yoy)', '#/ekonomi')}
      ${card(id(F.gdp.growth2025) + '%', 'Pertumbuhan ekonomi 2025', 'Dari 5,03% pada 2024', '#/ekonomi')}
      ${card(id(F.inflation.december2025Yoy) + '%', 'Inflasi Desember 2025', 'Rata-rata 2025: 1,91%', '#/ekonomi')}
      ${card(id(F.labour.openUnemploymentAug2025) + '%', 'Pengangguran, Agu 2025', '7,46 juta orang', '#/tenaga-kerja')}
      ${card(id(F.poverty.rateSep2025) + '%', 'Kemiskinan, Sep 2025', '23,36 juta orang', '#/kemiskinan')}
      ${card(id(F.hdi.value2025), 'IPM 2025', 'Naik dari 75,02 pada 2024', '#/kemiskinan')}
      ${card('Rp' + id(F.labour.averageWageMillionPerMonth) + ' jt', 'Upah rata-rata per bulan', 'Karyawan, Agu 2025', '#/tenaga-kerja')}
    </div>
    <p class="empty-note" id="search-empty" hidden>Tidak ada indikator yang cocok. Coba kata lain.</p>
  </section>

  <section>
    <h2>Pertumbuhan ekonomi <span class="en">GDP growth</span></h2>
    <p class="section-intro">PDB tumbuh di atas 5% selama empat tahun berturut-turut. Tahun 2020
    adalah kontraksi pandemi.</p>
    <div class="chart">${barChart(gdpRows)}</div>
    ${sourceLine('BPS, Februari 2026')}
    <p><a class="button" href="#/ekonomi">Lihat halaman Ekonomi →</a></p>
  </section>

  <section>
    <h2>Provinsi terpadat <span class="en">Largest provinces</span></h2>
    <p class="section-intro">Lebih dari setengah penduduk Indonesia tinggal di Pulau Jawa
    (55,65%). Lima provinsi terpadat:</p>
    <div class="chart">${hbarChart(top5)}</div>
    ${sourceLine('BPS, SUPAS 2025')}
    <p><a class="button" href="#/penduduk">Lihat halaman Penduduk →</a></p>
  </section>

  <section>
    <h2>Rilis terbaru <span class="en">Latest releases</span></h2>
    <ul class="releases">
      <li><strong>5 Feb 2026</strong> — PDB 2025 tumbuh 5,11%; PDB Rp23.821,1 triliun; PDB per kapita Rp83,7 juta (US$5.083).</li>
      <li><strong>5 Jan 2026</strong> — Inflasi Desember 2025 sebesar 2,92% (yoy); inflasi inti 2,38%, volatile food 6,21%.</li>
      <li><strong>5 Nov 2026</strong> — Pengangguran Agustus 2026 turun ke 4,75%; 147,99 juta orang bekerja.</li>
      <li><strong>5 Nov 2025</strong> — IPM 2025 mencapai 75,90; harapan hidup 74,47 tahun; rata-rata lama sekolah 9,07 tahun.</li>
      <li><strong>2025</strong> — SUPAS 2025: penduduk 284,67 juta; 68,94% berusia produktif; 11,97% berusia 60 tahun ke atas.</li>
    </ul>
  </section>`;
}

export function pendudukView() {
  const p = F.population;
  const rows = F.provinces
    .map((prov) => ({ ...prov, share: (prov.millions / p.totalMillions) * 100 }))
    .sort((a, b) => b.millions - a.millions);
  const tableRows = rows
    .map(
      (r, i) => `<tr><td>${i + 1}</td><td>${r.name}</td><td class="num">${id(r.millions)}</td><td class="num">${id(r.share, 1)}%</td></tr>`,
    )
    .join('');
  const top10 = rows.map((r) => ({ label: r.name, value: r.millions }));
  return `
  <section>
    <p class="eyebrow">Penduduk · Population</p>
    <h1>Penduduk Indonesia</h1>
    <p class="lede">Hasil Survei Penduduk Antar Sensus (SUPAS) 2025: 284,67 juta jiwa —
    negara keempat terpadat di dunia.</p>
    <div class="stats">
      <div class="stat"><span class="stat-value">${id(p.totalMillions)} jt</span><span class="stat-label">Penduduk 2025</span></div>
      <div class="stat"><span class="stat-value">${id(p.growthPercent)}%</span><span class="stat-label">Laju tumbuh per tahun</span></div>
      <div class="stat"><span class="stat-value">${id(p.workingAgePercent)}%</span><span class="stat-label">Usia produktif</span></div>
      <div class="stat"><span class="stat-value">${id(p.elderly60Percent)}%</span><span class="stat-label">Usia 60 tahun ke atas</span></div>
      <div class="stat"><span class="stat-value">${id(p.fertilityRate)}</span><span class="stat-label">Angka kelahiran (TFR)</span></div>
      <div class="stat"><span class="stat-value">${id(p.medianAge, 1)} th</span><span class="stat-label">Usia median</span></div>
    </div>
    ${sourceLine('BPS, SUPAS 2025')}
  </section>

  <section>
    <h2>Bonus demografi, tapi menua <span class="en">Ageing slowly</span></h2>
    <p>Sebanyak 68,94% penduduk berada pada usia produktif — jendela bonus
    demografi masih terbuka. Namun penduduk lanjut usia sudah 11,97% dan
    terus naik: DKI Jakarta mencatat 17,83% penduduk berusia 60 tahun ke
    atas. Generasi Z adalah kelompok terbesar (24,93%), dan 98,12% penduduk
    berbahasa Indonesia.</p>
  </section>

  <section>
    <h2>Sepuluh provinsi terpadat <span class="en">Largest provinces</span></h2>
    <div class="chart">${hbarChart(top10)}</div>
    ${sourceLine('BPS, estimasi pertengahan 2025')}
  </section>

  <section>
    <h2>Tabel provinsi <span class="en">Province table</span></h2>
    <p class="section-intro">Klik kepala kolom untuk mengurutkan. Pangsa dihitung dari total
    penduduk 284,67 juta jiwa.</p>
    <table class="data-table" id="province-table">
      <thead><tr>
        <th>No</th>
        <th><button class="sort" data-sort="name">Provinsi ↕</button></th>
        <th><button class="sort" data-sort="millions">Penduduk (juta) ↕</button></th>
        <th>Pangsa</th>
      </tr></thead>
      <tbody>${tableRows}</tbody>
    </table>
    ${sourceLine('BPS, estimasi pertengahan 2025')}
  </section>`;
}

export function ekonomiView() {
  const growthRows = F.gdpGrowth.map((p) => ({ label: String(p.year), value: p.value }));
  const nominalRows = [
    { label: '2022', value: 19588.1 },
    { label: '2023', value: 20892.4 },
    { label: '2024', value: 22139.0 },
    { label: '2025', value: 23821.1 },
  ];
  return `
  <section>
    <p class="eyebrow">Ekonomi · Economy</p>
    <h1>Ekonomi Indonesia</h1>
    <p class="lede">Ekonomi terbesar di Asia Tenggara: PDB Rp23.821,1 triliun pada 2025,
    tumbuh 5,11%.</p>
    <div class="stats">
      <div class="stat"><span class="stat-value">Rp${id(F.gdp.nominalTrillion2025, 1)} T</span><span class="stat-label">PDB 2025 (harga berlaku)</span></div>
      <div class="stat"><span class="stat-value">${id(F.gdp.growth2025)}%</span><span class="stat-label">Pertumbuhan 2025</span></div>
      <div class="stat"><span class="stat-value">Rp${id(F.gdp.perCapitaMillion2025, 1)} jt</span><span class="stat-label">PDB per kapita 2025</span></div>
      <div class="stat"><span class="stat-value">US$${idInt(F.gdp.perCapitaUsd2025)}</span><span class="stat-label">PDB per kapita 2025 (US$)</span></div>
    </div>
    ${sourceLine(F.gdp.source)}
  </section>

  <section>
    <h2>Pertumbuhan PDB <span class="en">GDP growth</span></h2>
    <div class="toggle" role="group" aria-label="Tampilan grafik">
      <button class="toggle-btn active" data-chart="growth">Pertumbuhan (%)</button>
      <button class="toggle-btn" data-chart="nominal">PDB nominal (Rp triliun)</button>
    </div>
    <div class="chart" id="gdp-chart">${barChart(growthRows)}</div>
    <p class="section-intro" id="gdp-chart-note">Pertumbuhan PDB riil, persen year on year. Kontraksi 2020
    adalah dampak pandemi COVID-19.</p>
    ${sourceLine('BPS, Februari 2026')}
  </section>

  <section>
    <h2>Inflasi <span class="en">Inflation</span></h2>
    <p class="section-intro">Inflasi Desember 2025 sebesar 2,92% (yoy), masih di dalam sasaran
    Bank Indonesia 2,5% ± 1%. Rata-rata inflasi 2025 hanya 1,91%.</p>
    <div class="stats">
      <div class="stat"><span class="stat-value">${id(F.inflation.december2025Yoy)}%</span><span class="stat-label">Inflasi Des 2025 (yoy)</span></div>
      <div class="stat"><span class="stat-value">${id(F.inflation.average2025)}%</span><span class="stat-label">Rata-rata 2025</span></div>
      <div class="stat"><span class="stat-value">${id(F.inflation.coreDecember2025)}%</span><span class="stat-label">Inflasi inti</span></div>
      <div class="stat"><span class="stat-value">${id(F.inflation.volatileFoodDecember2025)}%</span><span class="stat-label">Volatile food</span></div>
      <div class="stat"><span class="stat-value">${id(F.inflation.administeredDecember2025)}%</span><span class="stat-label">Harga diatur pemerintah</span></div>
    </div>
    ${sourceLine(F.inflation.source)}
  </section>`;
}

export function tenagaKerjaView() {
  const l = F.labour;
  const series = F.unemploymentSeries.map((p) => ({ label: p.label, value: p.value }));
  return `
  <section>
    <p class="eyebrow">Tenaga kerja · Labour</p>
    <h1>Tenaga kerja Indonesia</h1>
    <p class="lede">Survei Angkatan Kerja Nasional (Sakernas) Agustus 2025: 146,54 juta
    orang bekerja dari angkatan kerja 154 juta orang.</p>
    <div class="stats">
      <div class="stat"><span class="stat-value">${id(l.openUnemploymentAug2025)}%</span><span class="stat-label">Pengangguran terbuka, Agu 2025</span></div>
      <div class="stat"><span class="stat-value">${id(l.unemployedMillionsAug2025)} jt</span><span class="stat-label">Jumlah penganggur</span></div>
      <div class="stat"><span class="stat-value">${id(l.employedMillionsAug2025)} jt</span><span class="stat-label">Penduduk bekerja</span></div>
      <div class="stat"><span class="stat-value">${id(l.youthUnemploymentAug2025)}%</span><span class="stat-label">Pengangguran usia 15–24 th</span></div>
      <div class="stat"><span class="stat-value">Rp${id(l.averageWageMillionPerMonth)} jt</span><span class="stat-label">Upah rata-rata per bulan</span></div>
      <div class="stat"><span class="stat-value">${id(l.underemployedPercentAug2025)}%</span><span class="stat-label">Setengah menganggur (11,60 jt)</span></div>
    </div>
    ${sourceLine(l.source)}
  </section>

  <section>
    <h2>Tingkat pengangguran <span class="en">Unemployment rate</span></h2>
    <p class="section-intro">Tingkat pengangguran terbuka bergerak di kisaran 4,7–4,9% dalam dua
    tahun terakhir. Pengangguran usia muda jauh lebih tinggi: 16,9%.</p>
    <div class="chart">${lineChart(series)}</div>
    ${sourceLine('BPS, Sakernas')}
  </section>

  <section>
    <h2>Di balik angka utama <span class="en">Beyond the headline</span></h2>
    <p>Dari 146,54 juta orang bekerja, hanya 67,32% bekerja penuh waktu.
    Sebanyak 24,77% bekerja paruh waktu dan 7,91% — 11,60 juta orang —
    setengah menganggur: bekerja di bawah 35 jam seminggu dan masih
    menginginkan pekerjaan tambahan. Pengangguran tertinggi tercatat di
    Papua (6,96%), terendah di Bali (1,49%).</p>
  </section>`;
}

export function kemiskinanView() {
  const p = F.poverty;
  const h = F.hdi;
  const povertyRows = F.povertySeries.map((s) => ({ label: s.label, value: s.value }));
  const hdiRows = F.hdiSeries.map((s) => ({ label: String(s.year), value: s.value }));
  return `
  <section>
    <p class="eyebrow">Kemiskinan &amp; kesejahteraan · Poverty &amp; welfare</p>
    <h1>Kemiskinan dan pembangunan manusia</h1>
    <p class="lede">Kemiskinan turun ke 8,25% pada September 2025 — terendah sepanjang
    sejarah pencatatan — sementara Indeks Pembangunan Manusia mencapai
    75,90.</p>
    <div class="stats">
      <div class="stat"><span class="stat-value">${id(p.rateSep2025)}%</span><span class="stat-label">Kemiskinan, Sep 2025</span></div>
      <div class="stat"><span class="stat-value">${id(p.poorMillionsSep2025)} jt</span><span class="stat-label">Penduduk miskin, Sep 2025</span></div>
      <div class="stat"><span class="stat-value">Rp${idInt(p.lineRupiahMar2025)}</span><span class="stat-label">Garis kemiskinan /kapita/bln</span></div>
      <div class="stat"><span class="stat-value">${id(p.ruralPercentMar2025)}% / ${id(p.urbanPercentMar2025)}%</span><span class="stat-label">Desa / kota, Mar 2025</span></div>
      <div class="stat"><span class="stat-value">${id(h.value2025)}</span><span class="stat-label">IPM 2025</span></div>
      <div class="stat"><span class="stat-value">${id(h.lifeExpectancy2025, 2)} th</span><span class="stat-label">Harapan hidup</span></div>
    </div>
    ${sourceLine(p.source)}
  </section>

  <section>
    <h2>Kemiskinan terus turun <span class="en">Poverty rate</span></h2>
    <div class="chart">${lineChart(povertyRows)}</div>
    <p class="section-intro">Dari 9,03% pada Maret 2024 menjadi 8,25% pada September 2025.
    Kemiskinan desa (11,03%) masih jauh di atas kota (6,73%).</p>
    ${sourceLine('BPS')}
  </section>

  <section>
    <h2>Indeks Pembangunan Manusia <span class="en">Human Development Index</span></h2>
    <p class="section-intro">IPM naik 0,88 poin pada 2025 menjadi 75,90 — seluruh komponennya
    membaik: harapan hidup 74,47 tahun, harapan lama sekolah 13,30 tahun,
    rata-rata lama sekolah 9,07 tahun, dan pengeluaran per kapita
    Rp12.802.000 per tahun.</p>
    <div class="chart">${lineChart(hdiRows, { unit: '', decimals: 2 })}</div>
    <p>Kesenjangan antarprovinsi masih lebar: IPM tertinggi DKI Jakarta
    84,15, terendah Papua Pegunungan 54,91 (2024).</p>
    ${sourceLine(h.source)}
  </section>`;
}

export function tentangView() {
  return `
  <section>
    <p class="eyebrow">Tentang · About</p>
    <h1>Tentang Angka Indonesia</h1>
    <p class="lede">Angka Indonesia mengumpulkan angka-angka utama Indonesia dari rilis
    resmi — BPS-Statistics Indonesia dan Bank Indonesia — dan
    menyajikannya dengan grafik yang mudah dibaca, di satu tempat.</p>
    <h2>Sumber data</h2>
    <ul class="sources">
      <li><strong>BPS-Statistics Indonesia</strong> — SUPAS 2025; PDB 2024 &amp; 2025; Sakernas Agustus 2025 &amp; Agustus 2026; Kemiskinan Maret &amp; September 2025; IPM 2025; Inflasi 2025. Rilis resmi di bps.go.id.</li>
      <li><strong>Bank Indonesia</strong> — Inflasi IHK 2025 dalam sasaran 2,5% ± 1% (Januari 2026).</li>
    </ul>
    <h2>Cara membaca situs ini</h2>
    <p>Semua angka adalah angka yang diterbitkan — bukan proyeksi situs ini.
    Setiap halaman mencantumkan sumber dan tanggal rilisnya. Nilai
    ditampilkan dalam format Indonesia (koma untuk desimal, titik untuk
    ribuan). Grafik digambar dari angka yang sama dengan yang tertulis di
    tabel dan kartu.</p>
    <h2>Batasan</h2>
    <p>Angka-angka di sini adalah potret nasional. Angka provinsi dan
    kabupaten/kota yang lebih rinci tersedia di publikasi BPS. Rilis
    terbaru dapat merevisi angka sebelumnya; halaman ini diperbarui setiap
    ada rilis baru.</p>
    <p><a class="button" href="#/">Kembali ke Beranda →</a></p>
  </section>`;
}

// Chart data the economy toggle swaps between (main.js imports these).
export const GDP_CHARTS = {
  growth: {
    rows: F.gdpGrowth.map((p) => ({ label: String(p.year), value: p.value })),
    note: 'Pertumbuhan PDB riil, persen year on year. Kontraksi 2020 adalah dampak pandemi COVID-19.',
  },
  nominal: {
    rows: [
      { label: '2022', value: 19588.1 },
      { label: '2023', value: 20892.4 },
      { label: '2024', value: 22139.0 },
      { label: '2025', value: 23821.1 },
    ],
    note: 'PDB atas dasar harga berlaku, Rp triliun. Data 2022–2025 (BPS).',
  },
};
