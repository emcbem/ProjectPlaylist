import { TopGame } from "@/@types/WrapUps/TopGame";
import React from "react";

interface CompletedGameComponentProps {
  completedGame: TopGame[];
}

const CompletedGameComponent: React.FC<CompletedGameComponentProps> = ({
  completedGame,
}) => {
  return (
    <>
      {completedGame.map((x, key) => (
        <p key={key}>{x.title}</p>
      ))}
    </>
  );
};
export default CompletedGameComponent;
