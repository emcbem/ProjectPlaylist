import { useState } from "react";
import { UserAchivementListItem } from "../Achievements";
import AchievementCard from "./AchievementCard";

interface Props {
  achievements: UserAchivementListItem[];
  showAddButton: boolean;
  itemsPerPage?: number; // Optional prop for flexibility
}

const AchievementsList: React.FC<Props> = ({
  achievements,
  showAddButton,
  itemsPerPage = 10,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  if (!achievements) {
    return <h1>Error loading achievements</h1>;
  }

  const totalPages = Math.ceil(achievements.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = achievements.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div>
      <div className="grid gap-4">
        {currentItems.map((achievement, index) => (
          <AchievementCard
            key={startIndex + index}
            achievement={achievement}
            showAddButton={showAddButton}
          />
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-2 py-1">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AchievementsList;
