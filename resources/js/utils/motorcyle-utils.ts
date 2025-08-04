import { type KategoriValue, type MerekValue, type StatusValue  } from "@/config/enum-type";

import {
  // Kategori Icons
  Bike,           // bebek
  Car,            // matic (scooter replacement)
  Zap,            // sport
  Mountain,       // trail
  CircleIcon,     // naked
  Anchor,         // cruiser
  Plane,          // touring
  MapPin,         // adventure
  Target,         // supermoto
  Clock,          // retro
  Battery,        // electric
  CircleDot,      // moped
  Truck,          // atv
  TreePine,       // dirt
  Compass,        // enduro
  Coffee,         // cafe_racer
  Waves,          // bobber
  Scissors,       // chopper
  HelpCircle,     // other kategori

  // Japanese Brand Icons
  Settings,       // honda
  Music,          // yamaha
  Leaf,           // kawasaki
  Wind,           // suzuki
  Diamond,        // mitsubishi

  // European Brand Icons
  Crown,          // bmw
  Flame,          // ducati
  Zap as KTMIcon, // ktm
  Star,           // aprilia
  Award,          // mv_agusta
  Shield,         // triumph
  TreePine as HusqvarnaIcon, // husqvarna
  Mountain as BetaIcon,      // beta
  Waves as ShercoIcon,       // sherco
  Fuel,           // gas_gas
  Heart as BenelliIcon,      // benelli (lion replacement)
  Bird,           // moto_guzzi (eagle replacement)
  Hexagon,        // piaggio
  Bug,            // vespa (bee replacement)
  Car as PeugeotIcon,        // peugeot
  Trees,          // husaberg (forest replacement)

  // American Brand Icons
  Flag,           // harley_davidson
  Feather,        // indian
  Trophy,         // victory
  Bolt,           // erik_buell
  BatteryCharging, // zero

  // Chinese/Taiwan Brand Icons
  Flame as DragonIcon,       // cfmoto (dragon replacement)
  Building,       // benelli_qj (castle replacement)
  Sunrise,        // lifan
  Sun,            // zongshen
  Globe,          // loncin
  Key,            // keeway
  Gem,            // sym
  Sparkles,       // kymco
  Flame as VogeIcon, // voge
  Heart,          // colove

  // Korean Brand Icons
  Rocket,         // hyosung
  Moon,           // daelim

  // Indian Brand Icons
  Triangle,       // tvs
  Wrench,         // bajaj
  Medal,          // hero
  Crown as RoyalEnfieldIcon, // royal_enfield

  // Malaysian Brand Icons
  TreePine as PalmtreeIcon,  // modenas (palmtree replacement)
  Building as NazaIcon,      // naza

  // Other Brand Icons
  Snowflake,      // ural
  Clock as VintageIcon,      // jawa (vintage replacement)
  Truck as JeepIcon,         // can_am (jeep replacement)
  Compass as PolarisIcon,    // polaris
  Cat,            // arctic_cat
  MoreHorizontal,
  LucideIcon,
  CircleCheck,
  CircleXIcon,
  CircleFadingArrowUp, // other merek
} from "lucide-react";

// Kategori Icons Mapping
export function getKategoriIcon(kategori: KategoriValue) {
  const kategoriIcons: Record<KategoriValue, LucideIcon> = {
    bebek: Bike,
    matic: Car,
    sport: Zap,
    trail: Mountain,

    other: HelpCircle,
  };

  return kategoriIcons[kategori] || CircleIcon;
}
export function getStatusIcon(kategori: StatusValue) {
  const kategoriIcons: Record<StatusValue, LucideIcon> = {
    'tersedia': CircleCheck,
    'terjual': CircleFadingArrowUp,
   'tidaktersedia': CircleXIcon,
 
  };

  return kategoriIcons[kategori] || CircleIcon;
}

// Merek Icons Mapping
export function getMerekIcon(merek: MerekValue) {
  const merekIcons: Record<MerekValue, LucideIcon> = {
    // Japanese Brands
    honda: Settings,
    yamaha: Music,
    kawasaki: Leaf,
    suzuki: Wind,
 

  
    other: MoreHorizontal,
  };

  return merekIcons[merek] || CircleIcon;
}

// Get Icon Color berdasarkan Country/Region
export function getMerekIconColor(merek: MerekValue): string {
  const colorMap: Record<MerekValue, string> = {
    // Japanese - Blue tones
    honda: "text-blue-600",
    yamaha: "text-blue-500",
    kawasaki: "text-green-600",
    suzuki: "text-blue-700",
   
    other: "text-gray-500",
  };

  return colorMap[merek] || "text-gray-500";
}

// Get Icon Color berdasarkan Kategori
export function getKategoriIconColor(kategori: KategoriValue): string {
  const colorMap: Record<KategoriValue, string> = {
    bebek: "text-blue-600",
    matic: "text-purple-600",
    sport: "text-red-600",
    trail: "text-green-600",
   
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

};