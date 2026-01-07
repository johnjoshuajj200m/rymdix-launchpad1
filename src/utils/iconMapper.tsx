import { 
  Code, 
  Globe, 
  Bot, 
  LineChart, 
  Database, 
  Zap, 
  Shield, 
  Rocket, 
  TrendingUp, 
  Settings, 
  Workflow, 
  BarChart,
  LucideIcon 
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Code,
  Globe,
  Bot,
  LineChart,
  Database,
  Zap,
  Shield,
  Rocket,
  TrendingUp,
  Settings,
  Workflow,
  BarChart,
};

export function getIcon(iconName: string): LucideIcon {
  return iconMap[iconName] || Code; // Default to Code if icon not found
}

