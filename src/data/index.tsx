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
    title: "San Lorenzo Ruiz General Hospital",
    description: "Includes the delivery, installation, and organized wire dressing of a panelboard to ensure safe and efficient power distribution within the hospital.",
    type: "Institutional Project",
    images: "/images/projects/encproject1.png",
  },
  {
    title: "Alveo High Park Tower 1 and 2",
    description: "Supply and professional installation of the meter center for reliable and efficient electrical distribution.",
    type: "Condominium Project",
    images: "/images/projects/encproject2.png",
  },
  {
    title: "San Lorenzo Ruiz General Hospital",
    description: "Supply and installation of a first private 3-tandem pole setup with three 333 kVA transformer attachments, including testing and commissioning to ensure full operational reliability.",
    type: "Institutional Project",
    images: "/images/projects/encproject3.png"
  },
  {
    title: "Two story bedroom House",
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
    title: "Electro-Mechanical Equipment Maintenance", 
    description: "Keep your home running smoothly with regular equipment maintenance.",
    icon: FaTools 
  },
  { 
    title: "Supply and Installation", 
    description: "Equip your home with top-grade materials and professional installation.",
    icon: FaBoxOpen 
  },
  { 
    title: "Ensureness of Optimal Performance and Reliability", 
    description: "Make your home systems efficient, reliable, and long-lasting.",
    icon: FaTachometerAlt 
  },
  { 
    title: "Fast Installation of Electrical Panel Board", 
    description: "Power your home quickly with expert panel board installation.",
    icon: FaBolt 
  }
];
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