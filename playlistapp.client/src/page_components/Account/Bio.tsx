import React, { useState } from 'react'

interface ExpandableBioProps {
    bio: string;
}

const ExpandableBio: React.FC<ExpandableBioProps> = ({ bio }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            <p className="text-xl">Bio</p>
            <div className='p-2'>
                <p
                    className={`text-clay-700 dark:text-clay-950 ${isExpanded ? '' : 'line-clamp-3'}`}
                >
                    {bio}
                </p>
                <button
                    className="text-clay-900 mt-1"
                    onClick={toggleReadMore}
                >
                    {isExpanded ? 'Read Less' : 'Read More'}
                </button>
            </div>
        </>

    )
}

export default ExpandableBio