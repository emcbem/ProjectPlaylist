import { Platform } from '@/@types/platform';
import { UserPlatform } from '@/@types/userPlatform';
import { FC, ReactNode, useEffect, useState } from 'react'

interface GamerTagProps {
    children: ReactNode,
    platform: Platform,
    userPlatforms: UserPlatform[] | undefined
}

const GamerTag: FC<GamerTagProps> = ({ children, platform, userPlatforms }) => {
    const [userPlatform, setUserPlatform] = useState<UserPlatform | null>(null);

    useEffect(() => {
        if (userPlatforms != undefined) {
            const matchedPlatform = userPlatforms.find(x => x.platformId === platform.id);
            if (matchedPlatform) {
                setUserPlatform(matchedPlatform);
            } else {
                setUserPlatform(null);
            }
        }
    }, [platform.id, userPlatforms]);


    return (
        <>
            <div className='flex flex-row items-center justify-between'>
                {/* Shows the Passed in Icon here */}
                {children}

                {userPlatform && (
                    <h3 className="ml-4 text-xl font-sans">
                        {userPlatform.gamerTag}
                    </h3>
                )}
            </div>
        </>
    )
}

export default GamerTag