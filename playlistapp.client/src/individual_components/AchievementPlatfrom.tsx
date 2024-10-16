import { CheveronIcon } from "@/assets/Cheveron";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import React from "react";
import AchievementCard from "./AchievementCard";
import { PlatformGame } from "@/@types/platformGame";
import { AchievementQueries } from "@/hooks/AchievementQueries";

interface props {
  gameId: number;
  platformGame: PlatformGame;
  showAddButton: boolean;
}

const AchievementPlatfrom: React.FC<props> = ({
  gameId,
  platformGame,
  showAddButton,
}) => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value: React.SetStateAction<number>) =>
    setOpen(open === value ? 0 : value);

  const { data: achievements } =
    AchievementQueries.useGetAchievementByPlatformGameId(platformGame.id);

  console.log(
    "achievements",
    achievements,
    "Game ID:",
    gameId,
    "PFG",
    platformGame.id
  );

  return (
    <>
      <Accordion
        open={open === platformGame.id}
        icon={<CheveronIcon id={platformGame.id} open={open} />}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <AccordionHeader
          onClick={() => handleOpen(platformGame.id)}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {platformGame.platform.name}
        </AccordionHeader>
        <AccordionBody>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {achievements && achievements.length > 0 ? (
              achievements.map((achievement, index) => {
                return (
                  <AchievementCard
                    key={index}
                    Title={achievement.name}
                    Description={achievement.description}
                    showAddButton={showAddButton}
                    imageUrl={achievement.imageURL}
                  />
                );
              })
            ) : (
              <span>No Achievements</span>
            )}
          </ul>
        </AccordionBody>
      </Accordion>
    </>
  );
};

export default AchievementPlatfrom;
