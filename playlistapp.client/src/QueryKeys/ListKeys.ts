const ListKeys = {
  Lists: ["List"] as const,
  AddListKey: ["AddList", "List"] as const,
  GetListKey: (userId: string) => ["GetList", "List", userId] as const,
};

export default ListKeys;
