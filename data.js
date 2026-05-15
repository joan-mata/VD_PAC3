// ============================================================
// data.js — Todas las constantes de datos del proyecto PAC3
// Dataset: hotel_bookings.csv (119.390 reservas, Portugal 2015-2017)
// ============================================================

export const META = {
  totalBookings: 119390,
  hotels: 2,
  country: "Portugal",
  years: "2015–2017",
};

// ACTO 1 — Ingresos por tipo de huésped
export const ACT1_SEGMENTS = [
  {
    id: "family",
    label: "Familias",
    totalRevenue: 561,
    adr: 151,
    nights: 3.7,
    bookings: 6073,
    specialRequests: 1.12,
    color: "#2db07a",
    highlight: true,
    description: "Misma habitación, más ingresos",
  },
  {
    id: "couple",
    label: "Parejas",
    totalRevenue: 361,
    adr: 99,
    nights: 3.7,
    bookings: 49136,
    specialRequests: 0.48,
    color: "#4a9eca",
    highlight: false,
    description: "Segmento mayoritario",
  },
  {
    id: "solo",
    label: "Viajero solo",
    totalRevenue: 202,
    adr: 80,
    nights: 2.5,
    bookings: 16022,
    specialRequests: 0.22,
    color: "#8a7a9a",
    highlight: false,
    description: "Menor ingreso por estancia",
  },
];

export const ACT1_MAX_REVENUE = 700; // para escalar las barras

// ACTO 2 — Comparativa de canales (Booking vs Directo)
export const ACT2_CHANNELS = [
  {
    id: "ota",
    label: "Online TA (Booking)",
    totalBookings: 56477,
    confirmed: 35738,
    cancelled: 20739,
    confirmationRate: 63.3,
    cancellationRate: 36.7,
    avgRevenuePerStay: 387,
    totalRevenue: 13700000,
    commission: 0.15,
    commissionAmount: 2060000,
    netRevenue: 11600000,
    color: "#e8734a",
    icon: "🌐",
  },
  {
    id: "direct",
    label: "Canal Directo",
    totalBookings: 12606,
    confirmed: 10672,
    cancelled: 1934,
    confirmationRate: 84.7,
    cancellationRate: 15.3,
    avgRevenuePerStay: 391,
    totalRevenue: 4100000,
    commission: 0,
    commissionAmount: 0,
    netRevenue: 4100000,
    color: "#2db07a",
    icon: "🏨",
  },
];

// ACTO 3 — Cliente fiel vs Cliente nuevo (OTA)
export const ACT3_CLIENTS = [
  {
    id: "loyal",
    label: "Cliente fiel",
    lifetimeValue: 708,
    cancellationRate: 14.5,
    revenuePerStay: 177,
    nightsPerVisit: 2.0,
    avgPreviousVisits: 4,
    acquisitionCost: 0,
    color: "#2db07a",
    highlight: true,
    badge: "Valor a largo plazo",
  },
  {
    id: "new_ota",
    label: "Cliente nuevo (OTA)",
    lifetimeValue: 361,
    cancellationRate: 37.8,
    revenuePerStay: 361,
    nightsPerVisit: 3.5,
    avgPreviousVisits: 0,
    acquisitionCost: 54,
    color: "#e8734a",
    highlight: false,
    badge: "Mayor cancelación",
  },
];

export const ACT3_METRICS = [
  { key: "lifetimeValue", label: "Valor de vida", unit: "€", higherIsBetter: true },
  { key: "cancellationRate", label: "Tasa cancelación", unit: "%", higherIsBetter: false },
  { key: "revenuePerStay", label: "Ingreso / estancia", unit: "€", higherIsBetter: true },
  { key: "nightsPerVisit", label: "Noches / visita", unit: "", higherIsBetter: true },
  { key: "acquisitionCost", label: "Coste captación", unit: "€", higherIsBetter: false },
];

// ACTO 4 — Cambios de habitación al check-in
export const ACT4_DATA = {
  totalHuespedes: 119390,
  huespedsCambio: 14115,
  porcentajeCambio: 18.8,
  upgrades: {
    count: 13494,
    percentage: 95.6,
    color: "#2db07a",
    label: "Upgrades",
  },
  downgrades: {
    count: 621,
    percentage: 4.4,
    color: "#e8734a",
    label: "Downgrades",
  },
};

// CONCLUSIÓN — Los 3 perfiles ideales
export const CONCLUSION_PROFILES = [
  {
    id: "family",
    number: "01",
    title: "La Familia",
    value: "561€",
    metric: "por estancia",
    subtext: "Misma habitación que cualquier cliente",
    color: "#2db07a",
    icon: "👨‍👩‍👧",
  },
  {
    id: "direct",
    number: "02",
    title: "Reserva Directa",
    value: "391€",
    metric: "ingresos confirmados",
    subtext: "Sin comisión, tasa de confirmación 84,7%",
    color: "#4a9eca",
    icon: "📞",
  },
  {
    id: "loyal",
    number: "03",
    title: "Cliente Fiel",
    value: "708€",
    metric: "valor de vida",
    subtext: "0€ de coste de captación",
    color: "#f0c060",
    icon: "⭐",
  },
];
