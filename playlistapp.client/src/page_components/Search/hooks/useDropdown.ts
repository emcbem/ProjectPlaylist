import { useState } from "react"

export const useSearchDropdown = <T,>(title: string, options: T[], stringify_option_fn: (option: T) => string) => {
    const [selectedOptions, setSelectedOptions] = useState<T[]>([])

    return {
        title,
        options,
        selectedOptions,
        setSelectedOptions,
        stringify_option_fn
    }

}