import { type KategoriValue, type MerekValue } from "@/config/motorcyle-type";

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
  MoreHorizontal, // other merek
} from "lucide-react";

// Kategori Icons Mapping
export function getKategoriIcon(kategori: KategoriValue) {
  const kategoriIcons: Record<KategoriValue, any> = {
    bebek: Bike,
    matic: Car,
    sport: Zap,
    trail: Mountain,
    naked: CircleIcon,
    cruiser: Anchor,
    touring: Plane,
    adventure: MapPin,
    supermoto: Target,
    retro: Clock,
    electric: Battery,
    moped: CircleDot,
    atv: Truck,
    dirt: TreePine,
    enduro: Compass,
    cafe_racer: Coffee,
    bobber: Waves,
    chopper: Scissors,
    other: HelpCircle,
  };

  return kategoriIcons[kategori] || CircleIcon;
}

// Merek Icons Mapping
export function getMerekIcon(merek: MerekValue) {
  const merekIcons: Record<MerekValue, any> = {
    // Japanese Brands
    honda: Settings,
    yamaha: Music,
    kawasaki: Leaf,
    suzuki: Wind,
    mitsubishi: Diamond,

    // European Brands
    bmw: Crown,
    ducati: Flame,
    ktm: KTMIcon,
    aprilia: Star,
    mv_agusta: Award,
    triumph: Shield,
    husqvarna: HusqvarnaIcon,
    beta: BetaIcon,
    sherco: ShercoIcon,
    gas_gas: Fuel,
    benelli: BenelliIcon,
    moto_guzzi: Bird,
    piaggio: Hexagon,
    vespa: Bug,
    peugeot: PeugeotIcon,
    husaberg: Trees,

    // American Brands
    harley_davidson: Flag,
    indian: Feather,
    victory: Trophy,
    erik_buell: Bolt,
    zero: BatteryCharging,

    // Chinese/Taiwan Brands
    cfmoto: DragonIcon,
    benelli_qj: Building,
    lifan: Sunrise,
    zongshen: Sun,
    loncin: Globe,
    keeway: Key,
    sym: Gem,
    kymco: Sparkles,
    voge: VogeIcon,
    colove: Heart,

    // Korean Brands
    hyosung: Rocket,
    daelim: Moon,

    // Indian Brands
    tvs: Triangle,
    bajaj: Wrench,
    hero: Medal,
    royal_enfield: RoyalEnfieldIcon,

    // Malaysian Brands
    modenas: PalmtreeIcon,
    naza: NazaIcon,

    // Other Brands
    ural: Snowflake,
    jawa: VintageIcon,
    can_am: JeepIcon,
    polaris: PolarisIcon,
    arctic_cat: Cat,
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
    mitsubishi: "text-red-600",

    // European - Various colors
    bmw: "text-gray-700",
    ducati: "text-red-500",
    ktm: "text-orange-500",
    aprilia: "text-red-600",
    mv_agusta: "text-red-700",
    triumph: "text-green-700",
    husqvarna: "text-yellow-600",
    beta: "text-orange-600",
    sherco: "text-blue-600",
    gas_gas: "text-red-500",
    benelli: "text-green-600",
    moto_guzzi: "text-green-700",
    piaggio: "text-blue-500",
    vespa: "text-green-500",
    peugeot: "text-blue-600",
    husaberg: "text-yellow-500",

    // American - Red/Blue tones
    harley_davidson: "text-orange-600",
    indian: "text-red-700",
    victory: "text-red-600",
    erik_buell: "text-blue-600",
    zero: "text-green-600",

    // Chinese/Taiwan - Red/Gold tones
    cfmoto: "text-red-500",
    benelli_qj: "text-red-600",
    lifan: "text-yellow-600",
    zongshen: "text-orange-500",
    loncin: "text-red-500",
    keeway: "text-blue-500",
    sym: "text-purple-600",
    kymco: "text-orange-600",
    voge: "text-red-600",
    colove: "text-pink-500",

    // Korean - Purple/Blue
    hyosung: "text-purple-600",
    daelim: "text-blue-600",

    // Indian - Orange/Saffron tones
    tvs: "text-orange-600",
    bajaj: "text-orange-500",
    hero: "text-orange-600",
    royal_enfield: "text-green-700",

    // Malaysian - Green/Blue
    modenas: "text-green-600",
    naza: "text-blue-600",

    // Other
    ural: "text-cyan-600",
    jawa: "text-amber-600",
    can_am: "text-yellow-600",
    polaris: "text-blue-700",
    arctic_cat: "text-green-600",
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
    naked: "text-orange-600",
    cruiser: "text-gray-700",
    touring: "text-blue-700",
    adventure: "text-green-700",
    supermoto: "text-yellow-600",
    retro: "text-amber-600",
    electric: "text-green-500",
    moped: "text-cyan-600",
    atv: "text-orange-700",
    dirt: "text-green-800",
    enduro: "text-green-800",
    cafe_racer: "text-amber-700",
    bobber: "text-gray-600",
    chopper: "text-red-700",
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