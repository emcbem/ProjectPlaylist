import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { GameQueries } from "@/queries/GameQueries";
import { Achievement } from "@/@types/achievement";
import AchievementList from "./Components/AchievementList";
import {
  SearchableList,
  SortFunction,
} from "../../components/ui/searchable-list";
import { UserAchievement } from "@/@types/userAchievement";
import { UserAccountContext } from "@/contexts/UserAccountContext";
import { UserAccountContextInterface } from "@/@types/userAccount";
import { UserAchievementQueries } from "@/queries/UserAchievementQueries";

export interface UserAchivementListItem {
  Achievement: Achievement;
  Earned: UserAchievement;
}

interface AchievementsPageProps {
  passedGameAchievements?: Achievement[];
}

const AchievementsPage: React.FC<AchievementsPageProps> = ({
  passedGameAchievements,
}) => {
  const { gameId, id } = useParams<{ gameId?: string; id?: string }>();
  const { usr } = useContext(UserAccountContext) as UserAccountContextInterface;

  const gameData = gameId
    ? GameQueries.useGetGameById(Number(gameId))?.data
    : undefined;
  const userId = id || usr?.guid;

  const { data: userEarnedAchievements } = userId
    ? UserAchievementQueries.useGetUserAchievementByUserId(userId)
    : { data: undefined };

  const allAchievements = React.useMemo(() => {
    let achievementsToUse: Achievement[] = [];

    if (passedGameAchievements) {
      achievementsToUse = passedGameAchievements;
    } else if (gameData?.platforms) {
      achievementsToUse = Array.from(
        new Map(
          gameData.platforms
            .flatMap((platform) => platform.achievements || [])
            .map((ach) => [ach.name, ach])
        ).values()
      );
    }

    return achievementsToUse.map((achievement) => ({
      Achievement: achievement,
      Earned:
        userEarnedAchievements?.find(
          (earned) => earned.achievement.id === achievement.id
        ) ?? null,
    }));
  }, [passedGameAchievements, gameData?.platforms, userEarnedAchievements]);

  if (!allAchievements) {
    return <p>Loading...</p>;
  }

  console.log(allAchievements);

  const CompletedAchievementSortFunction: SortFunction = {
    SortName: "Completed",
    SortFunction: (
      item1: UserAchivementListItem,
      item2: UserAchivementListItem
    ) => {
      if (item1.Earned! && item2.Earned!) return 0;
      if (item1.Earned!) return -1; // Sort completed achievements first
      if (item2.Earned!) return 1; // Sort uncompleted achievements last
      return 0;
    },
  };

  return (
    <div className="dark:text-white text-black w-full">
      {allAchievements.length > 0 ? (
        <SearchableList
          Placeholder="Search through achievements!"
          CustomSortFunctions={[CompletedAchievementSortFunction]}
          ItemToString={(achievement: UserAchivementListItem) =>
            achievement.Achievement.name.toLowerCase()
          }
          OriginalList={allAchievements}
          SearchedView={(searchedItems: UserAchivementListItem[]) => (
            <AchievementList
              achievements={searchedItems}
              showAddButton={!!passedGameAchievements}
            />
          )}
        />
      ) : (
        <p className="sm:text-sm text-tiny font-medium text-clay-950 dark:text-clay-900 text-center">
          No Achievements for this game
        </p>
      )}
    </div>
  );
};

export default AchievementsPage;
