import { useMemo } from 'react';

// Kilometer formatter - Indonesian locale
const kilometerFormatter = new Intl.NumberFormat("id-ID", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
});

export interface UseKilometerOptions {
  /** Show 'km' suffix */
  showSuffix?: boolean;
  /** Custom suffix text */
  suffix?: string;
  /** Decimal places to show */
  decimalPlaces?: 0 | 1 | 2;
  /** Return null/undefined as empty string */
  nullAsEmpty?: boolean;
  /** Custom formatter locale */
  locale?: string;
}

export interface UseKilometerReturn {
  /** Formatted value as string (e.g., "15.000 km") */
  formatted: string;
  /** Original numeric value */
  value: number | null | undefined;
  /** Just the number part formatted without suffix */
  numberOnly: string;
  /** Check if value is valid */
  isValid: boolean;
}

/**
 * Hook untuk format value odometer dari database menjadi format kilometer
 * 
 * @param value - Nilai odometer dari database (number)
 * @param options - Opsi formatting
 * @returns Object dengan formatted value dan utilities
 * 
 * @example
 * ```tsx
 * // Basic usage
 * const { formatted } = useKilometer(15000.5);
 * console.log(formatted); // "15.000,5 km"
 * 
 * // Without suffix
 * const { formatted } = useKilometer(15000, { showSuffix: false });
 * console.log(formatted); // "15.000"
 * 
 * // Custom suffix
 * const { formatted } = useKilometer(15000, { suffix: "kilometer" });
 * console.log(formatted); // "15.000 kilometer"
 * ```
 */
export function useKilometer(
  value: number | null | undefined,
  options: UseKilometerOptions = {}
): UseKilometerReturn {
  const {
    showSuffix = true,
    suffix = 'km',
    decimalPlaces = 1,
    nullAsEmpty = true,
    locale = 'id-ID'
  } = options;

  const result = useMemo(() => {
    // Handle null/undefined values
    if (value === null || value === undefined) {
      return {
        formatted: nullAsEmpty ? '' : '0 km',
        value,
        numberOnly: nullAsEmpty ? '' : '0',
        isValid: false
      };
    }

    // Handle invalid numbers
    if ( isNaN(value)) {
      return {
        formatted: nullAsEmpty ? '' : '0 km',
        value,
        numberOnly: nullAsEmpty ? '' : '0',
        isValid: false
      };
    }

    // Create formatter with specified options
    const formatter = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimalPlaces,
    });

    const numberFormatted = formatter.format(value);
    const withSuffix = showSuffix ? `${numberFormatted} ${suffix}` : numberFormatted;

    return {
      formatted: withSuffix,
      value,
      numberOnly: numberFormatted,
      isValid: true
    };
  }, [value, showSuffix, suffix, decimalPlaces, nullAsEmpty, locale]);

  return result;
}

/**
 * Hook untuk multiple values sekaligus
 * Berguna untuk list/table data
 */
export function useKilometers(
  values: (number | null | undefined)[],
  options?: UseKilometerOptions
): UseKilometerReturn[] {
  return useMemo(() => {
    return values.map(value => {
      const {
        showSuffix = true,
        suffix = 'km',
        decimalPlaces = 1,
        nullAsEmpty = true,
        locale = 'id-ID'
      } = options || {};

      // Handle null/undefined values
      if (value === null || value === undefined) {
        return {
          formatted: nullAsEmpty ? '' : '0 km',
          value,
          numberOnly: nullAsEmpty ? '' : '0',
          isValid: false
        };
      }

      // Handle invalid numbers
      if (typeof value !== 'number' || isNaN(value)) {
        return {
          formatted: nullAsEmpty ? '' : '0 km',
          value,
          numberOnly: nullAsEmpty ? '' : '0',
          isValid: false
        };
      }

      // Create formatter with specified options
      const formatter = new Intl.NumberFormat(locale, {
        minimumFractionDigits: 0,
        maximumFractionDigits: decimalPlaces,
      });

      const numberFormatted = formatter.format(value);
      const withSuffix = showSuffix ? `${numberFormatted} ${suffix}` : numberFormatted;

      return {
        formatted: withSuffix,
        value,
        numberOnly: numberFormatted,
        isValid: true
      };
    });
  }, [values, options]);
}

/**
 * Utility function untuk format single value tanpa hook
 * Berguna untuk satu kali format di utility functions
 */
export function formatKilometer(
  value: number | null | undefined,
  options: UseKilometerOptions = {}
): string {
  const {
    showSuffix = true,
    suffix = 'km',
    decimalPlaces = 1,
    nullAsEmpty = true,
    locale = 'id-ID'
  } = options;

  // Handle null/undefined values
  if (value === null || value === undefined) {
    return nullAsEmpty ? '' : '0 km';
  }

  // Handle invalid numbers
  if (typeof value !== 'number' || isNaN(value)) {
    return nullAsEmpty ? '' : '0 km';
  }

  // Create formatter with specified options
  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimalPlaces,
  });

  const numberFormatted = formatter.format(value);
  return showSuffix ? `${numberFormatted} ${suffix}` : numberFormatted;
}