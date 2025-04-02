import React from "react";

interface props {
  index: number;
  cover: string;
  title: string;
  publishDate: string;
  description: string;
  ageRating: string;
}

const GameCard: React.FC<props> = ({ index, cover }) => {
  return (
    <div className="flex flex-col rounded-lg bg-[#D9D9D9] md:max-w-sm md:flex-col w-full">
      <img
        className="lg:w-40 lg:h-64 sm:w-32 sm:h-48 w-24 h-40 object-cover rounded-lg "
        src={cover}
        alt={`Game Cover ${index}`}
      />
    </div>
  );
};

export default GameCard;
