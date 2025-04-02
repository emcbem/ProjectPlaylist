import { TopGame } from "@/@types/WrapUps/TopGame";
import React from "react";

interface CompletedGameComponentProps {
  completedGame: TopGame[];
}

const CompletedGameComponent: React.FC<CompletedGameComponentProps> = ({
  completedGame,
}) => {
  console.log(completedGame);
  return <div>CompletedGameComponent</div>;
};

export default CompletedGameComponent;
