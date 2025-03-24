export interface SearchDropdownController<T> {
  title: string;
  options: T[];
  selectedOptions: T[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<T[]>>;
  stringify_option_fn: (option: T) => string;
  minLength: number;
}
