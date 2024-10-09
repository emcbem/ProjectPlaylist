import { GameContextInterface } from "@/@types/game";
import { UserGameContextInterface } from "@/@types/usergame";
import { GameContext } from "@/contexts/GameContext";
import { UserGameContext } from "@/contexts/UserGameContext";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";


const TestPage = () => {
  const { user, isAuthenticated } = useAuth0();
  
  const { game } = React.useContext(GameContext) as GameContextInterface;
  console.log("game: ", game)
  
  const {SetGameId, userGamesFromGame} = React.useContext(UserGameContext) as UserGameContextInterface;
  const {gameId} = useParams();
  
  useEffect(() => {
    SetGameId(Number(gameId))
  }, [SetGameId, gameId]) 

  return (
    isAuthenticated && user && (
      <div className="min-h-screen bg-white dark:bg-black">
        <h1>Test Page</h1>
        <div>
          {userGamesFromGame.length > 0 ? (
            userGamesFromGame.map((x, index) => {
              const gameTitle = x.platformGame.game.title; // Ensure you access the title correctly
              console.log("Game Title: ", gameTitle); // Log the game title

              return (
                <div key={index}>
                  {gameTitle ? gameTitle : "No title available"}
                </div>
              );
            })
          ) : (
            <div>No user games found.</div>
          )}
        </div>
      </div>
    )
  );
};

export default TestPage;
