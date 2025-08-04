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

  { value: 'other', label: 'Lainnya' }
];
export const STATUS_MOTOR: OptionItem[] = [
  { value: 'tersedia', label: 'Tersedia' },
  { value: 'terjual', label: 'Terjual' },
  { value: 'tidaktersedia', label: 'Tidak Tersedia' },
  
];

// Merek Motor
export const MEREK_MOTOR: OptionItem[] = [
  // Japanese Brands
  { value: 'honda', label: 'Honda', country: 'Japan' },
  { value: 'yamaha', label: 'Yamaha', country: 'Japan' },
  { value: 'kawasaki', label: 'Kawasaki', country: 'Japan' },
  { value: 'suzuki', label: 'Suzuki', country: 'Japan' },

  
 
  { value: 'other', label: 'Lainnya', country: 'Other' }
];

// Merek Motor dikelompokkan berdasarkan negara
export const MEREK_BY_COUNTRY: GroupedOptions = {
  'Japan': [
    { value: 'honda', label: 'Honda' },
    { value: 'yamaha', label: 'Yamaha' },
    { value: 'kawasaki', label: 'Kawasaki' },
    { value: 'suzuki', label: 'Suzuki' },

  ],

  'Other': [

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
export type StatusValue = typeof STATUS_MOTOR[number]['value'];

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