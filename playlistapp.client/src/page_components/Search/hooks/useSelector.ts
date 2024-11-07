import { useState } from "react"

export const useSelector = <T,>(title: string, items: T[], stringify_value_fn: (value: T) => string) => 
{
    const [selectedItems, setSelectedItems] = useState<T[]>([])
    return {
        title,
        items,
        stringify_value_fn,
        selectedItems,
        setSelectedItems
    }
}