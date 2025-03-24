import { useState, useRef, useEffect } from "react";
import { SearchDropdownController } from "../types/SearchDropdownController";
import { DropdownItem } from "./DropdownItem";

const SearchDropdown = <T,>({
  controller,
}: {
  controller: SearchDropdownController<T>;
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredOptions, setFilteredOptions] = useState<T[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    filterOptions("");
  }, [controller.options]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    filterOptions(value);
    setIsOpen(true);
  };

  const filterOptions = (value: string) => {
    if (value.length >= controller.minLength) {
      if (controller.options.length > 0) {
        setFilteredOptions(
          controller.options.filter(
            (option) =>
              controller
                .stringify_option_fn(option)
                .toLowerCase()
                .includes(value.toLowerCase()) &&
              !controller.selectedOptions.find((x) => x === option)
          )
        );
      }
    } else {
      setFilteredOptions([]);
    }
  };

  const handleSelect = (option: T) => {
    controller.setSelectedOptions((x) => [...x, option]);
    setSearchTerm("");
    filterOptions("");
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <p className="text-xl mb-2">{controller.title}</p>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => setIsOpen(true)}
        className="border border-black dark:placeholder-gray-400 dark:text-white dark:border-white rounded-lg w-full dark:bg-black text-black focus:outline-none focus:ring-pppurple-200 focus:border-pppurple-200 dark:focus:ring-pporange-600 dark:focus:border-pporange-600"
        placeholder="Search..."
      />
      {isOpen && (
        <ul className="z-10 w-full bg-white dark:bg-black border border-gray-300 rounded-lg overflow-y-auto overflow-x-hidden max-h-48 mt-2 shadow-lg">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className="px-4 py-2 cursor-pointer dark:text-white text-black hover:bg-pppurple-50 dark:hover:bg-pporange-900"
              >
                {controller.stringify_option_fn(option)}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500 dark:text-gray-400">
              No options found
            </li>
          )}
        </ul>
      )}
      <div className="flex flex-col pt-3 w-full">
        {controller.selectedOptions.map((value) => (
          <DropdownItem
            key={controller.stringify_option_fn(value)}
            value={controller.stringify_option_fn(value)}
            onClick={() =>
              controller.setSelectedOptions((x) => x.filter((x) => x != value))
            }
          />
        ))}
      </div>
    </div>
  );
};

export default SearchDropdown;
