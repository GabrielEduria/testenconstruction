export const site = {
  name: "EN Construction",
  url: "https://testenconstruction.vercel.app",
  base: "/en-construction",
  tagline: "Construction. Electrical. Solar.",
  description:
    "EN Construction is a Valenzuela City-based company providing construction, electrical works and solar installation across Metro Manila.",
  phones: ["+63 917 123 4567", "+63 44 123 4567"],
  emails: ["info@valenzuelasolar.ph", "quotes@valenzuelasolar.ph"],
  address: ["Gen. T. de Leon, Valenzuela City", "Metro Manila, Philippines"],
  // Add real URLs here to show them in the footer. Empty entries are hidden.
  socials: { facebook: "", instagram: "", tiktok: "" },
  copyrightYear: 2024,
} as const;

export const nav = [
  { label: "Home", href: "/en-construction" },
  { label: "Construction", href: "/en-construction/construction" },
  { label: "Electrical", href: "/en-construction/electrical" },
  { label: "Solar", href: "/en-construction/solar" },
  { label: "Contact", href: "/en-construction/contact" },
] as const;
