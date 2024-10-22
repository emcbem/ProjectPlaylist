import { useParams } from "react-router-dom";
import Tabs from "@/individual_components/Tabs";
import AddButton from "@/individual_components/AddButton";
import { GameQueries } from "@/hooks/GameQueries";

const ViewGame = () => {
  const { gameId } = useParams<{ gameId: string }>();


  const { data: game } = GameQueries.useGetGameByIdQuery(Number(gameId));

  // const [colors, setColors] = useState<string[]>([]);

  // const getColors = async (imageUrl: string) => {
  //   try {
  //     const palette = await Vibrant.from(imageUrl).getPalette();
  //     const dominantColor = palette.Vibrant?.hex || "#ffffff";
  //     const colorsArray = [
  //       dominantColor,
  //       palette.LightVibrant?.hex || "#ffffff",
  //       palette.DarkVibrant?.hex || "#000000",
  //       palette.Muted?.hex || "#ffffff",
  //       palette.LightMuted?.hex || "#ffffff",
  //       palette.DarkMuted?.hex || "#000000",
  //     ];
  //     setColors(colorsArray);
  //   } catch (error) {
  //     console.error("Error extracting colors:", error, colors);
  //   }
  // };

  // if (game) {
  //   getColors(`https:${game.coverUrl.replace(/t_cover_big/g, "t_1080p")}`);
  // }

  return (
    <>
      <div className="flex flex-grow w-full dark:text-white text-black justify-center mt-28">
        <div className="flex flex-row w-1/2">
          <img
            src={game?.coverUrl.replace(/t_cover_big/g, "t_1080p")}
            className="w-60 h-96 object-cover rounded-lg shadow-xl sticky top-10"
            alt={`${game?.title} cover`}
          />
          <div className="flex flex-col ml-5">
            <h1 className="dark:text-white text-black font-extrabold 2xl:text-5xl xl:text-3xl lg:text-1xl text-2xl">
              {game?.title}
            </h1>
            <h1 className="text-yellow-500 text-base font-extrabold my-3">
              Ratings: 9.25/10 - Leave your own.
            </h1>
            <h1 className="dark:text-white text-black text-base line-clamp-3">
              {game?.description}
            </h1>
            <div>
              <AddButton gameId={gameId} />
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700">
              <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                <Tabs gameId={Number(gameId)} userId={0} />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewGame;

{
  /* <div className="flex space-x-2 mt-4">
  {colors.map((color, index) => (
    <div
      key={index}
      className="w-10 h-10 rounded"
      style={{ backgroundColor: color }}
    >
      {color}
    </div>
  ))}
</div> */
}
