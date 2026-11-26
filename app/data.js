// Angka Indonesia — the figures behind the site.
//
// Every number below comes from a published release of BPS-Statistics
// Indonesia (Badan Pusat Statistik) or Bank Indonesia, as cited on the
// Tentang page. Values are stored as plain numbers; the views format them
// in Indonesian notation (comma decimals, dot thousands).

export const FIGURES = {
  updated: '27 November 2026',
  population: {
    totalMillions: 284.67,
    year: 2025,
    source: 'SUPAS 2025, BPS',
    growthPercent: 1.08,
    workingAgePercent: 68.94,
    elderly60Percent: 11.97,
    fertilityRate: 2.13,
    javaSharePercent: 55.65,
    medianAge: 31.4,
    genZSharePercent: 24.93,
    bahasaSharePercent: 98.12,
  },
  provinces: [
    { name: 'Jawa Barat', millions: 50.76 },
    { name: 'Jawa Timur', millions: 41.81 },
    { name: 'Jawa Tengah', millions: 37.89 },
    { name: 'Sumatera Utara', millions: 15.59 },
    { name: 'Banten', millions: 12.43 },
    { name: 'DKI Jakarta', millions: 10.68 },
    { name: 'Sulawesi Selatan', millions: 9.42 },
    { name: 'Lampung', millions: 9.32 },
    { name: 'Sumatera Selatan', millions: 8.84 },
    { name: 'Riau', millions: 6.97 },
  ],
  gdp: {
    nominalTrillion2025: 23821.1,
    nominalTrillion2024: 22139.0,
    growth2025: 5.11,
    growth2024: 5.03,
    perCapitaMillion2025: 83.7,
    perCapitaUsd2025: 5083,
    perCapitaMillion2024: 78.6,
    perCapitaUsd2024: 4960,
    source: 'BPS, Februari 2026',
  },
  // Real GDP growth, percent year on year (BPS).
  gdpGrowth: [
    { year: 2020, value: -2.07 },
    { year: 2021, value: 3.7 },
    { year: 2022, value: 5.31 },
    { year: 2023, value: 5.05 },
    { year: 2024, value: 5.03 },
    { year: 2025, value: 5.11 },
  ],
  inflation: {
    december2025Yoy: 2.92,
    average2025: 1.91,
    coreDecember2025: 2.38,
    volatileFoodDecember2025: 6.21,
    administeredDecember2025: 1.93,
    target: '2,5% ± 1%',
    source: 'BPS & Bank Indonesia, Januari 2026',
  },
  labour: {
    openUnemploymentAug2025: 4.85,
    unemployedMillionsAug2025: 7.46,
    labourForceMillionsAug2025: 154,
    employedMillionsAug2025: 146.54,
    youthUnemploymentAug2025: 16.9,
    averageWageMillionPerMonth: 3.33,
    underemployedPercentAug2025: 7.91,
    underemployedMillionsAug2025: 11.6,
    partTimePercentAug2025: 24.77,
    source: 'Sakernas Agustus 2025, BPS',
  },
  // Open unemployment rate (TPT), percent (BPS).
  unemploymentSeries: [
    { label: 'Agu 2024', value: 4.91 },
    { label: 'Feb 2025', value: 4.76 },
    { label: 'Agu 2025', value: 4.85 },
    { label: 'Agu 2026', value: 4.75 },
  ],
  poverty: {
    rateMar2025: 8.47,
    poorMillionsMar2025: 23.85,
    rateSep2025: 8.25,
    poorMillionsSep2025: 23.36,
    lineRupiahMar2025: 609160,
    ruralPercentMar2025: 11.03,
    urbanPercentMar2025: 6.73,
    source: 'BPS, 2025',
  },
  // Poverty rate, percent of population (BPS).
  povertySeries: [
    { label: 'Mar 2024', value: 9.03 },
    { label: 'Sep 2024', value: 8.57 },
    { label: 'Mar 2025', value: 8.47 },
    { label: 'Sep 2025', value: 8.25 },
  ],
  hdi: {
    value2025: 75.9,
    value2024: 75.02,
    value2023: 74.39,
    lifeExpectancy2025: 74.47,
    expectedSchooling2025: 13.3,
    meanSchooling2025: 9.07,
    expenditureMillion2025: 12.802,
    highest2024: { province: 'DKI Jakarta', value: 84.15 },
    lowest2024: { province: 'Papua Pegunungan', value: 54.91 },
    source: 'BPS, November 2025',
  },
  // Human Development Index (BPS).
  hdiSeries: [
    { year: 2020, value: 72.81 },
    { year: 2021, value: 73.16 },
    { year: 2022, value: 73.77 },
    { year: 2023, value: 74.39 },
    { year: 2024, value: 75.02 },
    { year: 2025, value: 75.9 },
  ],
};

// Format a number the Indonesian way: 284,67 — comma decimals, dot thousands.
export function id(n, decimals = 2) {
  return n.toLocaleString('id-ID', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function idInt(n) {
  return n.toLocaleString('id-ID', { maximumFractionDigits: 0 });
}
