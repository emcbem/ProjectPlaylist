import { ItemOption } from "@/@types/Combination/itemOption";

export const FormatCollisions = (items: ItemOption[]) => {
  const groupedByGame = Array.from(
    items.reduce((map, item) => {
      if (!map.has(`${item.gameTitle} - ${item.uniqueId}`)) {
        map.set(`${item.gameTitle} - ${item.uniqueId}`, []);
        map.get(`${item.gameTitle} - ${item.uniqueId}`)!.push(item);
      } else {
        const existingItems = map.get(`${item.gameTitle} - ${item.uniqueId}`)!;
        if (
          existingItems.some(
            (existingItem) => existingItem.uniqueId === item.uniqueId
          )
        ) {
          existingItems.push(item);
        }
      }

      return map;
    }, new Map<string, ItemOption[]>())
  ).map(([errorType, itemOptions]) => ({ errorType, itemOptions }));

  return groupedByGame;
};

export const FormatTitle = (title: string) => {
  const data = title;
  const result = data.split("-")[0];
  return result;
};
