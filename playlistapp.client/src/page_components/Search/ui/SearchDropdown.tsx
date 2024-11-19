import { useState } from "react";
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

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value.length > 3) {
      setFilteredOptions(
        controller.options.filter((option) =>
          controller
            .stringify_option_fn(option)
            .toLowerCase()
            .includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredOptions([]);
    }
    setIsOpen(true);
  };

  const handleSelect = (option: T) => {
    controller.setSelectedOptions((x) => [...x, option]);
    setSearchTerm("");
    setIsOpen(false);
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-screen h-screen  ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsOpen(false)}
      />
      <div className="relative">
        <p className="text-xl mb-2">{controller.title}</p>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className=" border border-gray-300 rounded-lg w-full text-black focus:outline-none focus:ring-slate-500 focus:border-slate-500"
          placeholder="Search..."
        />
        {isOpen && (
          <ul className="z-10 w-full bg-white border border-gray-300 rounded-lg overflow-y-auto overflow-x-hidden max-h-48 mt-1 shadow-lg">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleSelect(option)}
                  className="px-4 py-2 cursor-pointer text-black hover:bg-blue-100"
                >
                  {controller.stringify_option_fn(option)}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No options found</li>
            )}
          </ul>
        )}
        <div className="flex flex-col pt-3 w-full">
          {controller.selectedOptions.map((value) => (
            <DropdownItem
              value={controller.stringify_option_fn(value)}
              onClick={() =>
                controller.setSelectedOptions((x) =>
                  x.filter((x) => x != value)
                )
              }
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchDropdown;
