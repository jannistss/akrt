/**
 * Central NAP (Name, Address, Phone) source of truth.
 * Every component/page must import from here instead of hardcoding
 * business contact data. This prevents the phone-number drift that
 * previously existed across the codebase (three different numbers).
 */

export const SITE_URL = "https://autoklinik-reutlingen.de";

export const SITE = {
  name: "Autoklinik Reutlingen",
  legalName: "Autoklinik Reutlingen GmbH",
  url: SITE_URL,
  phone: {
    display: "07121 14526199",
    href: "tel:+4907121145261990",
    e164: "+4907121145261990",
  },
  whatsapp: {
    display: "0176 61973298",
    number: "4917661973298",
    href: "https://wa.me/4917661973298",
  },
  email: "info@autoklinik-reutlingen.de",
  address: {
    street: "Haldenhaustraße 3",
    zip: "72770",
    city: "Reutlingen",
    region: "Baden-Württemberg",
    country: "DE",
  },
  geo: {
    latitude: 48.481,
    longitude: 9.204,
  },
  googleMapsUrl: "https://maps.google.com/?q=Haldenhaustraße+3,+72770+Reutlingen",
  openingHours: [
    { day: "Mo – Fr", time: "08:00 – 18:00" },
    { day: "Samstag", time: "Nur auf Anfrage" },
    { day: "Sonntag", time: "Geschlossen" },
  ],
  sameAs: [
    "https://www.google.com/maps/place/Autoklinik+Reutlingen",
    "https://www.instagram.com/autoklinik.reutlingen",
  ],
} as const;
