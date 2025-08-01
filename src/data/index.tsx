import {
  FaDraftingCompass,   
  FaHardHat,           
  FaTools,             
  FaBoxOpen,        
  FaTachometerAlt,
  FaBolt
} from "react-icons/fa";

import { 
    Sun,
    Zap,
    Shield,
    Check,
    Star,
    ArrowRight
} from "lucide-react";


export interface Project {
  title: string;
  description: string;
  type: string;
  images: string;
}

export const projects: Project[] = [
  {
    title: "Project 1",
    description: "Includes the delivery, installation, and organized wire dressing of a panelboard to ensure safe and efficient power distribution within the hospital.",
    type: "Institutional Project",
    images: "/images/projects/encproject1.png",
  },
  {
    title: "Project 2",
    description: "Supply and professional installation of the meter center for reliable and efficient electrical distribution.",
    type: "Condominium Project",
    images: "/images/projects/encproject2.png",
  },
  {
    title: "Project 3",
    description: "Supply and installation of a first private 3-tandem pole setup with three 333 kVA transformer attachments, including testing and commissioning to ensure full operational reliability.",
    type: "Institutional Project",
    images: "/images/projects/encproject3.png"
  },
  {
    title: "Project 4",
    description: "Complete interior and exterior renovation of a two-bedroom townhouse, covering structural improvements, aesthetic upgrades, and functional enhancements to elevate overall living quality.",
    type: "Residential Project",
    images: "/images/projects/encproject4.png"
  }
];


type Service = { 
    title: string
    description: string
    icon: React.ElementType;
};

export const service: Service[] = [
  { 
    title: "General Design", 
    description: "Kickstart your dream home with expert architectural and engineering designs.",
    icon: FaDraftingCompass 
  },
  { 
    title: "Construction", 
    description: "Build your home from the ground up with quality construction services.",
    icon: FaHardHat 
  },
  { 
    title: "Electro-Mechanical", 
    description: "Keep your home running smoothly with regular equipment maintenance.",
    icon: FaTools 
  },
  { 
    title: "Supply and Installation", 
    description: "Equip your home with top-grade materials and professional installation.",
    icon: FaBoxOpen 
  },
  { 
    title: "Performance and Reliability", 
    description: "Make your home systems efficient, reliable, and long-lasting.",
    icon: FaTachometerAlt 
  },
  { 
    title: "Electrical Panel Board", 
    description: "Power your home quickly with expert panel board installation.",
    icon: FaBolt 
  }
];

// SOLAR DATA
type SolarEnergy = {
  title: string
  description: string
  icon: React.ElementType
}

export const solarEnergy: SolarEnergy[] = [
    {
      title: "Clean Energy",
      description: "100% renewable energy from the sun, reducing your carbon footprint significantly.",  
      icon: Sun
    },
    {
      title: "Lower Bills",
      description: "Reduce your electricity bills by up to 90% with our high-efficiency solar panels.",  
      icon: Zap
    },
    {
      title: "3-Year Warranty",
      description: "Industry-leading warranty with guaranteed performance and peace of mind.",  
      icon: Shield
    },
    {
      title: "Easy Installation",
      description: "Professional installation with minimal disruption to your daily routine.",  
      icon: Check
    },
    {
      title: "Tax Incentives",
      description: "Take advantage of tax credits for solar installations.",  
      icon: Star
    },
    {
      title: "Increase Home Value",
      description: "Solar panels can increase your home's value by an average of 10%.",  
      icon: ArrowRight
    },
]

type SolarPlan = {
  id: string;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  power: string;
  coverage: string;
  features: string[];
  color: string;
  popular?: boolean;
};

export const plans: SolarPlan[] = [
  {
    id: 'residential',
    name: 'Home Solar Plan',
    monthlyPrice: 8900,
    annualPrice: 89000,
    power: '2.4 - 3.2 kW',
    coverage: '30-40% of household needs',
    features: [
      'Basic real-time monitoring',
      '10-year product warranty',
      'Professional installation',
      'MERALCO net metering ready',
    ],
    color: 'bg-orange-500',
  },
  {
    id: 'commercial',
    name: 'Business Solar Plan',
    monthlyPrice: 14900,
    annualPrice: 149000,
    power: '5.0 - 7.5 kW',
    coverage: '60-80% of commercial usage',
    features: [
      'Advanced analytics dashboard',
      '25-year panel warranty',
      'Battery-ready system',
      'Smart building integration',
    ],
    color: 'bg-blue-500',
    popular: true,
  },
  {
    id: 'industrial',
    name: 'Enterprise Solar Plan',
    monthlyPrice: 23900,
    annualPrice: 239000,
    power: '10 - 15 kW+',
    coverage: '100%+ for industrial loads',
    features: [
      'Full EPC solar project delivery',
      '25-year warranty (panels + inverters)',
      'EV charging station integration',
      'Tesla Powerwall / BESS support',
    ],
    color: 'bg-orange-400',
  }
];