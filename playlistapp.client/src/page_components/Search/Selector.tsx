
export interface SelectorController<T> {
    title: string,
    items: T[],
    stringify_value_fn: (value: T) => string,
    selectedItems: T[],
    setSelectedItems: React.Dispatch<React.SetStateAction<T[]>> 
}


export const Selector = <T,>(controller: SelectorController<T>) => {

    const handleClick = (value: T) =>
    {
        if(controller.selectedItems.find(x => value == x))
        {
            controller.setSelectedItems(v => v.filter(f => f != value))
        }
        else
        {
            controller.setSelectedItems(v => [...v, value])
        }
    }

    console.log(controller)
  return (
    <>
        <p className="text-xl mt-5 mb-1">{controller.title}</p>
        <div className="flex flex-wrap">
            {controller.items.map((value, index) => (
            <div
                key={index}
                className={`rounded-full p-1 px-3 border-2 border-[#111111] dark:border-[#ffffff] m-1 ${controller.selectedItems.find(x => value == x) ? "bg-gray-300 hover:bg-transparent" : "bg-transparent hover:bg-gray-300"}`} 
                onClick={() => handleClick(value)}
            >
                {controller.stringify_value_fn(value)}
            </div>
            ))}
        </div>

    </>
  )
}
