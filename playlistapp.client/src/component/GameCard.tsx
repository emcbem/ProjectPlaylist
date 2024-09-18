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
        className="w-40 h-64 object-cover rounded-lg"
        src={cover}
        alt={`Game Cover ${index}`}
      />
      {/* <div className="flex flex-col justify-start p-6 w-64">
        <h5 className="mb-2 text-xl font-medium text-neutral-800">{title}</h5>
        <p className="mb-4 text-base text-neutral-600">
          <span>
            Release Date: {new Date(publishDate).toLocaleDateString()}
          </span>
        </p>
        <p className="mb-4 text-base text-neutral-600 line-clamp-3">
          {description}
        </p>
        <p className="mb-4 text-base text-neutral-600 flex">
          Age Rating: {ageRating}
        </p>
      </div> */}
    </div>
  );
};

export default GameCard;
