import { WrapUpCarouselGame } from "@/@types/WrapUps/WrapUpCarouselGame";
import Marquee from "@/components/ui/marquee";
import GameCard from "@/individual_components/GameCard";

interface GameCarouselProps {
  carouselGames: WrapUpCarouselGame[] | undefined;
}

const GameCarousel: React.FC<GameCarouselProps> = ({ carouselGames }) => {
  return (
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
  );
};

export default GameCarousel;
