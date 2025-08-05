import { type KategoriValue, type MerekValue, type StatusValue } from "@/config/enum-type";

import {
  // Kategori Icons
  Car,            // hatchback
  Crown,          // sedan  
  Truck,          // suv
  Users,          // mpv
  Mountain,       // crossover
  Wrench,         // pickup
  Package,        // wagon
  Zap,            // coupe
  Sun,            // convertible
  HelpCircle,     // other kategori

  // Japanese Brand Icons (4 dominan + other)
  Circle,         // toyota
  Diamond,        // daihatsu
  Settings,       // honda
  Wind,           // suzuki
  MoreHorizontal, // other

  // Status Icons
  CircleCheck,
  CircleXIcon,
  CircleFadingArrowUp,
  
  LucideIcon,
} from "lucide-react";

// Kategori Icons Mapping
export function getKategoriIcon(kategori: KategoriValue) {
  const kategoriIcons: Record<KategoriValue, LucideIcon> = {
    mpv: Users,         // MPV - paling dominan
    suv: Truck,         // SUV - sangat populer
    hatchback: Car,     // Hatchback - LCGC segment
    sedan: Crown,       // Sedan - masih populer
    other: HelpCircle,  // Other kategori
  };

  return kategoriIcons[kategori] || Car;
}

export function getStatusIcon(status: StatusValue) {
  const statusIcons: Record<StatusValue, LucideIcon> = {
    'tersedia': CircleCheck,
    'terjual': CircleFadingArrowUp,
    'tidaktersedia': CircleXIcon,
  };

  return statusIcons[status] || CircleCheck;
}

// Merek Icons Mapping
export function getMerekIcon(merek: MerekValue) {
  const merekIcons: Record<MerekValue, LucideIcon> = {
    // 4 Merek Dominan Indonesia
    toyota: Circle,
    daihatsu: Diamond,
    honda: Settings,
    suzuki: Wind,
    other: MoreHorizontal,
  };

  return merekIcons[merek] || Circle;
}

// Get Icon Color berdasarkan Merek
export function getMerekIconColor(merek: MerekValue): string {
  const colorMap: Record<MerekValue, string> = {
    // Japanese brands - masing-masing punya warna khas
    toyota: "text-red-600",      // Toyota red
    daihatsu: "text-blue-600",   // Daihatsu blue
    honda: "text-gray-700",      // Honda silver/gray
    suzuki: "text-orange-600",   // Suzuki orange
    other: "text-gray-500",
  };

  return colorMap[merek] || "text-gray-500";
}

// Get Icon Color berdasarkan Kategori
export function getKategoriIconColor(kategori: KategoriValue): string {
  const colorMap: Record<KategoriValue, string> = {
    mpv: "text-blue-600",        // MPV - paling dominan
    suv: "text-green-600",       // SUV - sangat populer  
    hatchback: "text-orange-600", // Hatchback - LCGC
    sedan: "text-purple-600",     // Sedan - masih populer
    other: "text-gray-500",
  };

  return colorMap[kategori] || "text-gray-500";
}

// Component untuk rendering icon dengan styling
export interface IconProps {
  size?: number;
  className?: string;
}

// Export semua utilities
export default {
  getKategoriIcon,
  getMerekIcon,
  getMerekIconColor,
  getKategoriIconColor,
  getStatusIcon,
};