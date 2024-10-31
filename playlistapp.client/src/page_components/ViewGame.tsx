import { useParams } from "react-router-dom";
import "./game.css";
import AddButton from "@/individual_components/AddButton";
import PlatformIconList from "@/individual_components/PlatformIconList";
import { GameDetails } from "@/individual_components/GameDetails";
import GameImageBackground from "@/individual_components/GameImageBackground";
import { GameQueries } from "../hooks/GameQueries";

const ViewGame = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const { data: game, isSuccess } = GameQueries.useGetGameById(Number(gameId));
  console.log("Game: ", game)

  return (
    isSuccess && (
      <>
        <div className="min-h-screen bg-white dark:bg-black">
          <GameImageBackground Game={game} />
          <div className="absolute top-1/3 lg:left-1/6 left-0 z-50 3xl:w-1/2 md:w-2/3 w-full">
            <GameDetails Game={game} />
            <PlatformIconList GameId={game?.id} />
            <AddButton gameId={gameId} />
          </div>
        </div>
      </>
    )
  );
};

export default ViewGame;
