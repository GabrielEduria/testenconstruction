import { Compass, HardHat, Cable, PackageCheck, Gauge, Zap, Wrench, type LucideIcon } from "lucide-react";

export interface Capability { title: string; text: string; icon: LucideIcon }

export const constructionCapabilities: Capability[] = [
  { title: "General Design", text: "Architectural and engineering design to turn your requirements into a buildable plan.", icon: Compass },
  { title: "Construction", text: "Building from the ground up with a focus on quality workmanship and durable results.", icon: HardHat },
  { title: "Renovation", text: "Interior and exterior upgrades, from structural improvements to finishing.", icon: Wrench },
  { title: "Supply & Installation", text: "Materials and equipment supplied and installed by our own crews.", icon: PackageCheck },
];

export const electricalCapabilities: Capability[] = [
  { title: "Electrical Panel Boards", text: "Panelboard delivery, installation and organized wire dressing.", icon: Zap },
  { title: "Meter Centers", text: "Supply and installation of meter centers for multi-unit buildings.", icon: Gauge },
  { title: "Transformers & Pole Lines", text: "Pole-mounted transformer setups, with testing and commissioning.", icon: Cable },
  { title: "Electro-Mechanical Works", text: "Supply, installation and maintenance of HVAC, elevators and power systems.", icon: Wrench },
];

export const solarServices: Capability[] = [
  { title: "Site Assessment & Design", text: "We review your roof, your power use and your goals before proposing a system.", icon: Compass },
  { title: "Supply & Installation", text: "Panels, inverters and mounting supplied and installed by our team.", icon: PackageCheck },
  { title: "Net-Metering-Ready Systems", text: "Grid-tied systems prepared for net metering with your utility.", icon: Zap },
  { title: "Maintenance", text: "Inspection and upkeep so the system keeps performing.", icon: Wrench },
];

export const solarProcess = [
  { title: "Consultation", text: "Tell us about your property and your electric bill." },
  { title: "Site assessment", text: "We inspect the roof, the electrical setup and the available space." },
  { title: "Design & quote", text: "You receive a system proposal with a clear price." },
  { title: "Installation", text: "Our crew installs and connects the system." },
  { title: "Testing & turnover", text: "We test the system and walk you through how it works." },
];

export const solarBenefits = [
  { title: "Generate power on site", text: "Your roof produces electricity during the day, reducing how much you draw from the grid." },
  { title: "Net-metering ready", text: "Excess power can be exported to the grid where your utility allows it." },
  { title: "Built for your roof", text: "Each system is sized and mounted for your property, not a one-size package." },
  { title: "3-year warranty", text: "Every EN Construction solar installation is covered by a 3-year warranty." },
];

export interface SolarPackage { name: string; size: string; price: string; fit: string; points: string[]; featured?: boolean }

// Indicative Philippine market ranges for grid-tied systems (Metro Manila, installed, before site survey).
const included = ["Grid-tied system", "Panels, inverter, mounting and installation", "Net-metering ready", "3-year warranty"];
export const solarPackages: SolarPackage[] = [
  { name: "Home", size: "3 kW", price: "₱140,000 – ₱180,000", fit: "Smaller households", points: included },
  { name: "Home Plus", size: "5 kW", price: "₱220,000 – ₱260,000", fit: "Larger homes and small shops", points: included, featured: true },
  { name: "Business", size: "10 kW", price: "₱420,000 – ₱520,000", fit: "Commercial and industrial loads", points: included },
];

export const faqs = [
  { q: "Where do you work?", a: "We are based in Valenzuela City and serve Metro Manila." },
  { q: "What kinds of projects do you handle?", a: "Residential, condominium and institutional work: building and renovation, electrical installations such as panelboards, meter centers and transformer setups, and solar installation." },
  { q: "Do you handle both design and construction?", a: "Yes. We provide general design and construction, plus the supply, installation and maintenance of electro-mechanical equipment." },
  { q: "How do I get a quote?", a: "Send us your project details through the contact page. We will review your scope and get back to you with next steps." },
  { q: "How long will my project take?", a: "It depends on the scope, size and site conditions. We confirm a schedule once we have assessed your project." },
  { q: "What warranty comes with solar?", a: "Our solar installations come with a 3-year warranty." },
];
