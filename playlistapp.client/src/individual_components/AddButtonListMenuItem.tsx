import { List } from "@/@types/list";
import { UpdateListRequest } from "@/@types/Requests/UpdateRequests/updateListRequest";
import { GameQueries } from "@/queries/GameQueries";
import { ListQueries } from "@/queries/ListQueries";
import { MenuItem } from "@material-tailwind/react";
import React from "react";

interface props {
  lists: List[] | undefined;
  gameId: string | undefined;
  userGuid: string | undefined;
}

const AddButtonListMenuItem: React.FC<props> = ({
  lists,
  gameId,
  userGuid,
}) => {
  const { mutateAsync: updateListMutation } = ListQueries.useUpdateListQuery();
  const { data: game } = GameQueries.useGetGameById(Number(gameId));

  const handleListMenuItemClick = async (listId: number) => {
    const listToUpdate = lists?.filter((x) => x.id === listId) || [];
    const selectedList = listToUpdate[0];
    if (listId && userGuid) {
      const updateListRequest: UpdateListRequest = {
        listId: listId,
        listName: selectedList.name,
        isPublic: selectedList.isPublic,
        gamesToRemove: [],
        newGames: [{ ...game, platforms: [], reviews: [] }],
      };
      console.log(updateListRequest);
      await updateListMutation(updateListRequest);
    }
  };

  return (
    <>
      {lists?.map((list, key) => (
        <MenuItem
          key={key}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className={`font-bold`}
          onClick={() => {
            handleListMenuItemClick(list.id);
          }}
        >
          Add to {list.name}
        </MenuItem>
      ))}
    </>
  );
};

export default AddButtonListMenuItem;
