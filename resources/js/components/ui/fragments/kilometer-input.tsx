"use client";
import { useReducer } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "./form"; // Shadcn UI import
import { Input } from "./input"; // Shadcn UI Input
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

interface KilometerInputProps<T extends FieldValues>
  extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
  form: UseFormReturn<T>;
  name: string;
  label: string;
  placeholder: string;
  disable: boolean;
  description?: string;
}

// Kilometer formatter - Indonesian locale with km suffix
const kilometerFormatter = new Intl.NumberFormat("id-ID", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 1, // Allow 1 decimal place for precision
});

export default function KilometerInput<T extends FieldValues>(
  props: KilometerInputProps<T>
) {
  const initialValue = props.form.getValues()[props.name]
    ? `${kilometerFormatter.format(props.form.getValues()[props.name])} km`
    : "";

  const [value, setValue] = useReducer((_: any, next: string) => {
    // Remove all non-digit and non-decimal characters
    const digits = next.replace(/[^\d.]/g, "");
    
    // Handle multiple decimal points - keep only the first one
    const parts = digits.split(".");
    const cleanDigits = parts.length > 2 
      ? `${parts[0]}.${parts.slice(1).join("")}` 
      : digits;

    // Return empty if no digits
    if (!cleanDigits || cleanDigits === ".") return "";
    
    // Format and add km suffix
    const numValue = parseFloat(cleanDigits);
    if (isNaN(numValue)) return "";
    
    return `${kilometerFormatter.format(numValue)} km`;
  }, initialValue);

  function handleChange(realChangeFn: Function, formattedValue: string) {
    // Extract numeric value from formatted string
    const digits = formattedValue.replace(/[^\d.]/g, "");
    
    if (!digits || digits === ".") {
      realChangeFn(null); // or 0, depending on your needs
      return;
    }
    
    const realValue = parseFloat(digits);
    if (!isNaN(realValue)) {
      // Limit to maximum value as per your input constraints
      const clampedValue = Math.min(realValue, 999999999.9);
      realChangeFn(clampedValue);
    }
  }

  return (
    <FormField
      control={props.form.control}
      name={props.name as FieldPath<T>}
      render={({ field }) => {
        const _change = field.onChange;

        return (
          <FormItem>
            <FormLabel>{props.label}</FormLabel>
            <FormControl>
              <Input
                disabled={props.disable}
                placeholder={props.placeholder}
                type="text"
                {...field}
                onChange={(ev) => {
                  setValue(ev.target.value);
                  handleChange(_change, ev.target.value);
                }}
                value={value}
              />
            </FormControl>
            {props.description && (
              <FormDescription className=" sr-only">{props.description}</FormDescription>
            )}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}