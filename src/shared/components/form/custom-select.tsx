import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";

interface SelectOption {
  value: string;
  label: string;
}

interface GenericSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  options: SelectOption[];
  placeholder?: string;
  groupLabel?: string;
  label?: string;
  error?: string | null;
  description?: string;
}

export function CustomSelect<T extends FieldValues>({
  control,
  name,
  options,
  placeholder = "Select an option",
  groupLabel,
  label,
  error,
  description,
}: GenericSelectProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const selectedLabel = options.find(
          (opt) => opt.value === field.value,
        )?.label;

        return (
          <Field>
            {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
            {description && <FieldDescription>{description}</FieldDescription>}
            <Select
              aria-invalid={!!error}
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder}>
                  {selectedLabel ?? placeholder}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {groupLabel && <SelectLabel>{groupLabel}</SelectLabel>}
                  {options.map((option) => (
                    <SelectItem
                      key={option.value}
                      label={option.label}
                      value={option.value}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {error && <FieldError>{error}</FieldError>}
          </Field>
        );
      }}
    />
  );
}
