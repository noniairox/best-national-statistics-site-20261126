# Angka Indonesia — National Statistics Site

[![best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/noniairox/best-national-statistics-site-20261126/rank.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/noniairox/best-national-statistics-site-20261126/reward.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

**Angka Indonesia** collects Indonesia's key numbers — population, economy,
labour, poverty and human development — from official releases (BPS-Statistics
Indonesia and Bank Indonesia) and presents them with readable charts, in one
place. It is a static site: no build step, no network requests, and it works
in a desktop browser and on a phone.

## What it shows

- **Beranda** — key indicators (population 284.67 million, GDP Rp23,821.1
  trillion, growth 5.11%, inflation 2.92%, unemployment 4.85%, poverty
  8.25%, HDI 75.90), a searchable indicator list, GDP growth chart, largest
  provinces, and latest releases.
- **Penduduk** — SUPAS 2025: age structure, the ten largest provinces with a
  sortable table.
- **Ekonomi** — GDP and GDP per capita, a chart toggle between growth (%)
  and nominal GDP (Rp trillion), and inflation by component.
- **Tenaga Kerja** — Sakernas August 2025: unemployment, youth unemployment,
  wages, underemployment, with an unemployment trend chart.
- **Kemiskinan** — poverty rate trend (9.03% → 8.25%), rural vs urban, and
  the Human Development Index with its components.
- **Tentang** — sources, method, and limits.

## Run it

```sh
node serve.ts   # serves app/ on http://localhost:8080
```

Hand it in (what the grader runs):

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` copies `app/` and `screenshots/` to the output directory and
writes `dossier.json` with the vendored make.fun library. The dossier is
byte-for-byte reproducible: running the command twice writes identical
bytes.

## Verified

- All six routes render (Beranda, Penduduk, Ekonomi, Tenaga Kerja,
  Kemiskinan, Tentang) with no console errors.
- Controls work: the home search filters indicator cards, the province
  table sorts by name and by population, and the GDP chart toggles between
  growth (%) and nominal GDP (Rp trillion).
- 4 screenshots, each a real render of the site's own code, within the
  256 KiB cap; the first by name is the cover and one is a phone view.

## Sources

BPS-Statistics Indonesia (SUPAS 2025; GDP 2024–2025; Sakernas August 2025;
poverty March & September 2025; HDI 2025) and Bank Indonesia (CPI inflation
2025). Every page cites its source.
