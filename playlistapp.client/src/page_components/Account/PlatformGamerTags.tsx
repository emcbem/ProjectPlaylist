import EpicIconCustom from '@/assets/CustomPlatformIcons/EpicLogoCustom'
import SwitchIconCustom from '@/assets/CustomPlatformIcons/SwitchIconCustom'
import XboxIconCustom from '@/assets/CustomPlatformIcons/XboxIconCustom'

const PlatformGamerTags = () => {
    return (
        <div className="">
            <div className="flex flex-row items-center mb-3">
                <EpicIconCustom width={'30'} />
                <div className="ml-4 text-xl font-sans">
                    AlmondMilk2420
                </div>
            </div>
            <div className="flex flex-row items-center mb-3">
                <SwitchIconCustom width={'30'} />
                <div className="ml-4 text-xl font-sans">
                    Nintento_Account2345
                </div>
            </div>

            <div className="flex flex-row items-center mb-3">
                <XboxIconCustom width={'30'} />
                <div className="ml-4 text-xl font-sans">
                    Xbox_Account2345
                </div>
            </div>
        </div>
    )
}

export default PlatformGamerTags