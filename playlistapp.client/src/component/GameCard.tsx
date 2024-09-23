import React from "react";

interface props {
  index: number;
  cover: string;
  title: string;
  publishDate: Date;
  description: string;
  ageRating: string;
}

const GameCard: React.FC<props> = ({
  index,
  cover,
  title,
  publishDate,
  description,
  ageRating,
}) => {
  return (
    <div className="flex flex-col rounded-lg bg-[#D9D9D9] md:max-w-sm md:flex-col w-full">
      <img
        className="w-40 h-64 object-cover rounded-lg "
        src={cover}
        alt={`Game Cover ${index}`}
      />
    </div>
  );
};

export default GameCard;
