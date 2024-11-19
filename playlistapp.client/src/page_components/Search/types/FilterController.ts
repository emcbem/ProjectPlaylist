import { Genre } from "@/@types/genre";
import { Company } from "@/@types/company";
import { Platform } from "@/@types/platform";
import { SearchDropdownController } from "./SearchDropdownController";
import { SearchRequestController } from "@/@types/ComponentControllers/InfiniteGameController";

export interface FilterController {
    genreSelectorController: SearchDropdownController<Genre>
    companySelectorController: SearchDropdownController<Company>
    platformSelectorController: SearchDropdownController<Platform>
    searchRequestController: SearchRequestController
}