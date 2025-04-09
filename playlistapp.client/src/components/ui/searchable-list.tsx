import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";
import { ReactNode, useState } from "react";

export interface SortFunction {
  SortName: string;
  SortFunction: (item1: any, item2: any) => 1 | -1 | 0;
}

export const AZSortFunction = (ItemToString: (item: any) => string) => ({
  SortName: "A-Z",
  SortFunction: (item1: any, item2: any): -1 | 0 | 1 => {
    const stringItem1 = ItemToString(item1);
    const stringItem2 = ItemToString(item2);

    if (stringItem1 < stringItem2) return -1;
    if (stringItem1 > stringItem2) return 1;
    return 0;
  },
});

export const ZASortFunction = (ItemToString: (item: any) => string) => ({
  SortName: "Z-A",
  SortFunction: (item1: any, item2: any): -1 | 0 | 1 => {
    const stringItem1 = ItemToString(item1);
    const stringItem2 = ItemToString(item2);

    if (stringItem1 > stringItem2) return -1;
    if (stringItem1 < stringItem2) return 1;
    return 0;
  },
});

export interface SearchableListProps {
  Placeholder: string;
  SearchedView: (searchedItems: any[]) => ReactNode;
  OriginalList: any[];
  ItemToString: (item: any) => string;
  CustomSortFunctions?: SortFunction[];
}

export const SearchableList = (props: SearchableListProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [chosenSortMethodIndex, setChosenSortMethodIndex] = useState<number>(0);
  const SortFunctions = [
    AZSortFunction(props.ItemToString),
    ZASortFunction(props.ItemToString),
    ...(props?.CustomSortFunctions ?? []),
  ];

  function SortOriginalList() {
    var newList = [...props.OriginalList];
    return newList
      .filter((item) =>
        props.ItemToString(item).includes(searchQuery.toLowerCase())
      )
      .sort(SortFunctions[chosenSortMethodIndex].SortFunction);
  }
  const button = document.getElementById("searchGlass");
  const inputField = document.getElementById("searchInput") as HTMLInputElement;

  button?.addEventListener("click", () => {
    inputField.focus();
  });
  return (
    <>
      <div>
        <div className="flex flex-row">
          <div className="flex flex-row items-center gap-2 border border-gray-300 rounded-md px-2 dark:border-gray-500">
            <MagnifyingGlassCircleIcon
              className="w-6 h-6 text-gray-500 hover:cursor-pointer dark:text-gray-50"
              id="searchGlass"
            />
            <input
              id="searchInput"
              className="flex-1 rounded-md outline-none border-none py-1 px-2 dark:bg-black dark:text-gray-50 placeholder:text-gray-300"
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={props.Placeholder}
            />
          </div>

          <select
            className="ml-auto rounded-md border-gray-300 dark:border-gray-500 text-gray-500 dark:bg-black dark:text-gray-50"
            defaultValue="0"
            onChange={(event) =>
              setChosenSortMethodIndex(Number.parseInt(event.target.value))
            }
          >
            {SortFunctions.map((searchFunction, index) => (
              <option key={index} value={index}>
                {searchFunction.SortName}
              </option>
            ))}
          </select>
        </div>

        {props.SearchedView(SortOriginalList())}
      </div>
    </>
  );
};