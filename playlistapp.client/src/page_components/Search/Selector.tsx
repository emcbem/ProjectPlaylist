
export interface SelectorController<T> {
    title: string,
    values: T[],
    stringify_value_fn: (value: T) => string,
    selectedValues: T[],
    setSelectedValues: React.Dispatch<React.SetStateAction<T[]>> 
}


export const Selector = <T,>(controller: SelectorController<T>) => {
  return (
    <div>Selector</div>
  )
}
