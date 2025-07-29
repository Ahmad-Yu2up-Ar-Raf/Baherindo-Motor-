// motorcycle-types.ts

export interface OptionItem {
  value: string;
  label: string;
  country?: string;
}

export interface GroupedOptions {
  [key: string]: OptionItem[];
}

// Kategori Motor
export const KATEGORI_MOTOR: OptionItem[] = [
  { value: 'bebek', label: 'Bebek' },
  { value: 'matic', label: 'Matic/Scooter' },
  { value: 'sport', label: 'Sport' },
  { value: 'trail', label: 'Trail' },
  { value: 'naked', label: 'Naked Bike' },
  { value: 'cruiser', label: 'Cruiser' },
  { value: 'touring', label: 'Touring' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'supermoto', label: 'Supermoto' },
  { value: 'retro', label: 'Retro/Classic' },
  { value: 'electric', label: 'Electric' },
  { value: 'moped', label: 'Moped' },
  { value: 'atv', label: 'ATV/Quad' },
  { value: 'dirt', label: 'Dirt Bike' },
  { value: 'enduro', label: 'Enduro' },
  { value: 'cafe_racer', label: 'Cafe Racer' },
  { value: 'bobber', label: 'Bobber' },
  { value: 'chopper', label: 'Chopper' },
  { value: 'other', label: 'Lainnya' }
];

// Merek Motor
export const MEREK_MOTOR: OptionItem[] = [
  // Japanese Brands
  { value: 'honda', label: 'Honda', country: 'Japan' },
  { value: 'yamaha', label: 'Yamaha', country: 'Japan' },
  { value: 'kawasaki', label: 'Kawasaki', country: 'Japan' },
  { value: 'suzuki', label: 'Suzuki', country: 'Japan' },
  { value: 'mitsubishi', label: 'Mitsubishi', country: 'Japan' },
  
  // European Brands
  { value: 'bmw', label: 'BMW', country: 'Europe' },
  { value: 'ducati', label: 'Ducati', country: 'Europe' },
  { value: 'ktm', label: 'KTM', country: 'Europe' },
  { value: 'aprilia', label: 'Aprilia', country: 'Europe' },
  { value: 'mv_agusta', label: 'MV Agusta', country: 'Europe' },
  { value: 'triumph', label: 'Triumph', country: 'Europe' },
  { value: 'husqvarna', label: 'Husqvarna', country: 'Europe' },
  { value: 'beta', label: 'Beta', country: 'Europe' },
  { value: 'sherco', label: 'Sherco', country: 'Europe' },
  { value: 'gas_gas', label: 'Gas Gas', country: 'Europe' },
  { value: 'benelli', label: 'Benelli', country: 'Europe' },
  { value: 'moto_guzzi', label: 'Moto Guzzi', country: 'Europe' },
  { value: 'piaggio', label: 'Piaggio', country: 'Europe' },
  { value: 'vespa', label: 'Vespa', country: 'Europe' },
  { value: 'peugeot', label: 'Peugeot', country: 'Europe' },
  { value: 'husaberg', label: 'Husaberg', country: 'Europe' },
  
  // American Brands
  { value: 'harley_davidson', label: 'Harley Davidson', country: 'USA' },
  { value: 'indian', label: 'Indian', country: 'USA' },
  { value: 'victory', label: 'Victory', country: 'USA' },
  { value: 'erik_buell', label: 'Erik Buell', country: 'USA' },
  { value: 'zero', label: 'Zero', country: 'USA' },
  
  // Chinese Brands
  { value: 'cfmoto', label: 'CFMoto', country: 'China/Taiwan' },
  { value: 'benelli_qj', label: 'Benelli (QJ)', country: 'China/Taiwan' },
  { value: 'lifan', label: 'Lifan', country: 'China/Taiwan' },
  { value: 'zongshen', label: 'Zongshen', country: 'China/Taiwan' },
  { value: 'loncin', label: 'Loncin', country: 'China/Taiwan' },
  { value: 'keeway', label: 'Keeway', country: 'China/Taiwan' },
  { value: 'sym', label: 'SYM', country: 'China/Taiwan' },
  { value: 'kymco', label: 'Kymco', country: 'China/Taiwan' },
  { value: 'voge', label: 'Voge', country: 'China/Taiwan' },
  { value: 'colove', label: 'Colove', country: 'China/Taiwan' },
  
  // Korean Brands
  { value: 'hyosung', label: 'Hyosung', country: 'South Korea' },
  { value: 'daelim', label: 'Daelim', country: 'South Korea' },
  
  // Indian Brands
  { value: 'tvs', label: 'TVS', country: 'India' },
  { value: 'bajaj', label: 'Bajaj', country: 'India' },
  { value: 'hero', label: 'Hero', country: 'India' },
  { value: 'royal_enfield', label: 'Royal Enfield', country: 'India' },
  
  // Malaysian Brands
  { value: 'modenas', label: 'Modenas', country: 'Malaysia' },  
  { value: 'naza', label: 'Naza', country: 'Malaysia' },
  
  // Other Brands
  { value: 'ural', label: 'Ural', country: 'Other' },
  { value: 'jawa', label: 'Jawa', country: 'Other' },
  { value: 'can_am', label: 'Can-Am', country: 'Other' },
  { value: 'polaris', label: 'Polaris', country: 'Other' },
  { value: 'arctic_cat', label: 'Arctic Cat', country: 'Other' },
  { value: 'other', label: 'Lainnya', country: 'Other' }
];

// Merek Motor dikelompokkan berdasarkan negara
export const MEREK_BY_COUNTRY: GroupedOptions = {
  'Japan': [
    { value: 'honda', label: 'Honda' },
    { value: 'yamaha', label: 'Yamaha' },
    { value: 'kawasaki', label: 'Kawasaki' },
    { value: 'suzuki', label: 'Suzuki' },
    { value: 'mitsubishi', label: 'Mitsubishi' }
  ],
  'Europe': [
    { value: 'bmw', label: 'BMW' },
    { value: 'ducati', label: 'Ducati' },
    { value: 'ktm', label: 'KTM' },
    { value: 'aprilia', label: 'Aprilia' },
    { value: 'mv_agusta', label: 'MV Agusta' },
    { value: 'triumph', label: 'Triumph' },
    { value: 'husqvarna', label: 'Husqvarna' },
    { value: 'beta', label: 'Beta' },
    { value: 'sherco', label: 'Sherco' },
    { value: 'gas_gas', label: 'Gas Gas' },
    { value: 'benelli', label: 'Benelli' },
    { value: 'moto_guzzi', label: 'Moto Guzzi' },
    { value: 'piaggio', label: 'Piaggio' },
    { value: 'vespa', label: 'Vespa' },
    { value: 'peugeot', label: 'Peugeot' },
    { value: 'husaberg', label: 'Husaberg' }
  ],
  'USA': [
    { value: 'harley_davidson', label: 'Harley Davidson' },
    { value: 'indian', label: 'Indian' },
    { value: 'victory', label: 'Victory' },
    { value: 'erik_buell', label: 'Erik Buell' },
    { value: 'zero', label: 'Zero' }
  ],
  'China/Taiwan': [
    { value: 'cfmoto', label: 'CFMoto' },
    { value: 'benelli_qj', label: 'Benelli (QJ)' },
    { value: 'lifan', label: 'Lifan' },
    { value: 'zongshen', label: 'Zongshen' },
    { value: 'loncin', label: 'Loncin' },
    { value: 'keeway', label: 'Keeway' },
    { value: 'sym', label: 'SYM' },
    { value: 'kymco', label: 'Kymco' },
    { value: 'voge', label: 'Voge' },
    { value: 'colove', label: 'Colove' }
  ],
  'South Korea': [
    { value: 'hyosung', label: 'Hyosung' },
    { value: 'daelim', label: 'Daelim' }
  ],
  'India': [
    { value: 'tvs', label: 'TVS' },
    { value: 'bajaj', label: 'Bajaj' },
    { value: 'hero', label: 'Hero' },
    { value: 'royal_enfield', label: 'Royal Enfield' }
  ],
  'Malaysia': [
    { value: 'modenas', label: 'Modenas' },
    { value: 'naza', label: 'Naza' }
  ],
  'Other': [
    { value: 'ural', label: 'Ural' },
    { value: 'jawa', label: 'Jawa' },
    { value: 'can_am', label: 'Can-Am' },
    { value: 'polaris', label: 'Polaris' },
    { value: 'arctic_cat', label: 'Arctic Cat' },
    { value: 'other', label: 'Lainnya' }
  ]
};

// Utility functions
export const getKategoriLabel = (value: string): string => {
  const kategori = KATEGORI_MOTOR.find(k => k.value === value);
  return kategori?.label || value;
};

export const getMerekLabel = (value: string): string => {
  const merek = MEREK_MOTOR.find(m => m.value === value);
  return merek?.label || value;
};

export const getMerekCountry = (value: string): string => {
  const merek = MEREK_MOTOR.find(m => m.value === value);
  return merek?.country || 'Unknown';
};

export const getMereksByCountry = (country: string): OptionItem[] => {
  return MEREK_BY_COUNTRY[country] || [];
};

// For React/Next.js form components
export const FormSelectOptions = {
  kategori: KATEGORI_MOTOR,
  merek: MEREK_MOTOR,
  merekByCountry: MEREK_BY_COUNTRY
};

// Export types for form handling
export type KategoriValue = typeof KATEGORI_MOTOR[number]['value'];
export type MerekValue = typeof MEREK_MOTOR[number]['value'];

export default {
  KATEGORI_MOTOR,
  MEREK_MOTOR,
  MEREK_BY_COUNTRY,
  getKategoriLabel,
  getMerekLabel,
  getMerekCountry,
  getMereksByCountry,
  FormSelectOptions
};