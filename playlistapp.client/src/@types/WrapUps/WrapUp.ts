import { AchievementGroup } from "./AchievementGroup";
import { Graph } from "./Graph";
import { TopGame } from "./TopGame";
import { WrapUpCarouselGame } from "./WrapUpCarouselGame";
import { WrapUpHourBarGraph } from "./WrapUpHourBarGraph";

export interface WrapUp {
  gamesPlayed: WrapUpCarouselGame[];
  barGraphGameData: WrapUpHourBarGraph[];
  hourGraph: Graph;
  topGame: TopGame;
  achievementGroups: AchievementGroup[];
  trophiesEarned: number;
}
