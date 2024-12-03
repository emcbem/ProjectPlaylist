import { SearchBarContext } from "@/contexts/SearchBarContext";
import { useContext } from "react";

export const useSearchBarContext = () => {
    const context = useContext(SearchBarContext);
    return context;
};
