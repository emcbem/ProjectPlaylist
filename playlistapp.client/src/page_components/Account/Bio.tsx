import React, { useEffect, useRef, useState } from "react";

interface ExpandableBioProps {
  bio: string;
}

const ExpandableBio: React.FC<ExpandableBioProps> = ({ bio }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReadMoreButton, setShowReadMoreButton] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (ref.current == null) {
      return;
    }
    if (ref.current.scrollHeight > ref.current.clientHeight) {
      setShowReadMoreButton(true);
    }
  }, []);

  return (
    <>
      <p className="text-xl">Bio</p>
      <div className="p-2">
        <p
          ref={ref}
          className={`text-clay-700 dark:text-clay-950 ${
            isExpanded ? "" : "line-clamp-3"
          }`}
        >
          {bio}
        </p>
        {showReadMoreButton && (
          <button className="text-clay-900 mt-1" onClick={toggleReadMore}>
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        )}
      </div>
    </>
  );
};

export default ExpandableBio;
