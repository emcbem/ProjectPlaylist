import { WrapUpCarouselGame } from "@/@types/WrapUps/WrapUpCarouselGame";
import Marquee from "@/components/ui/marquee";
import GameCard from "@/individual_components/GameCard";

interface GameCarouselProps {
  carouselGames: WrapUpCarouselGame[] | undefined;
}

const GameCarousel: React.FC<GameCarouselProps> = ({ carouselGames }) => {
  console.log("In game carousel: ", carouselGames);
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg">
      <Marquee pauseOnHover className="[--duration:600s]">
        {carouselGames?.map((game, index) =>
          game.coverUrl ? (
            <GameCard
              index={index}
              cover={game.coverUrl}
              title={game.gameName}
              publishDate={""}
              description={""}
              ageRating={""}
            />
          ) : (
            <></>
          )
        )}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-black"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-black"></div>
    </div>
  );
};

export default GameCarousel;
