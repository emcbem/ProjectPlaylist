
interface IconProps {
    width: string,
    fill: string,
}

const EpicIconCustom: React.FC<IconProps> = ({ width, fill }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`transition-colors duration-300 fill-[${fill}]`}
            viewBox="2.21 0 27.57 32"
            width={width}

        >
            <path d="M4.719 0c-1.833 0-2.505 0.677-2.505 2.505v22.083c0 0.209 0.011 0.401 0.027 0.579 0.047 0.401 0.047 0.792 0.421 1.229 0.036 0.052 0.412 0.328 0.412 0.328 0.203 0.099 0.343 0.172 0.572 0.265l11.115 4.656c0.573 0.261 0.819 0.371 1.235 0.355h0.005c0.421 0.016 0.667-0.093 1.24-0.355l11.109-4.656c0.235-0.093 0.369-0.167 0.577-0.265 0 0 0.376-0.287 0.412-0.328 0.375-0.437 0.375-0.828 0.421-1.229 0.016-0.177 0.027-0.369 0.027-0.573v-22.088c0-1.828-0.677-2.505-2.505-2.505zM22.527 4.145h0.905c1.511 0 2.251 0.735 2.251 2.267v2.505h-1.833v-2.407c0-0.489-0.224-0.713-0.699-0.713h-0.312c-0.489 0-0.713 0.224-0.713 0.713v7.749c0 0.489 0.224 0.713 0.713 0.713h0.349c0.468 0 0.692-0.224 0.692-0.713v-2.771h1.833v2.86c0 1.525-0.749 2.276-2.265 2.276h-0.921c-1.521 0-2.267-0.756-2.267-2.276v-7.923c0-1.525 0.745-2.281 2.267-2.281zM6.276 4.251h4.151v1.703h-2.287v3.468h2.204v1.699h-2.204v3.697h2.319v1.704h-4.183zM11.364 4.251h2.928c1.515 0 2.265 0.755 2.265 2.28v3.261c0 1.525-0.751 2.276-2.265 2.276h-1.057v4.453h-1.871zM17.401 4.251h1.864v12.271h-1.864zM13.229 5.901v4.52h0.771c0.469 0 0.693-0.228 0.693-0.719v-3.083c0-0.489-0.224-0.719-0.693-0.719zM8.088 19.437h0.276l0.063 0.011h0.1l0.052 0.016h0.052l0.047 0.015 0.052 0.011 0.041 0.011 0.093 0.021 0.053 0.015 0.036 0.011 0.041 0.016 0.052 0.016 0.036 0.015 0.053 0.021 0.047 0.021 0.041 0.025 0.047 0.021 0.036 0.025 0.053 0.027 0.041 0.025 0.041 0.021 0.041 0.031 0.043 0.027 0.036 0.031 0.125 0.095-0.032 0.041-0.036 0.036-0.032 0.037-0.036 0.041-0.025 0.036-0.032 0.037-0.036 0.036-0.032 0.041-0.025 0.036-0.037 0.043-0.031 0.036-0.036 0.041-0.032 0.037-0.025 0.041-0.037 0.036-0.031 0.043-0.036 0.036-0.032 0.036-0.036-0.025-0.041-0.037-0.043-0.025-0.077-0.052-0.047-0.027-0.043-0.025-0.047-0.027-0.036-0.021-0.041-0.020-0.084-0.032-0.052-0.009-0.041-0.011-0.047-0.011-0.053-0.011-0.052-0.005h-0.052l-0.061-0.011h-0.1l-0.052 0.005h-0.052l-0.052 0.016-0.041 0.011-0.047 0.016-0.047 0.009-0.043 0.021-0.052 0.021-0.072 0.052-0.043 0.025-0.036 0.032-0.036 0.025-0.037 0.032-0.025 0.036-0.043 0.036-0.052 0.073-0.025 0.041-0.021 0.047-0.025 0.037-0.027 0.047-0.016 0.047-0.020 0.041-0.016 0.052-0.005 0.052-0.015 0.048-0.011 0.052v0.052l-0.005 0.052v0.12l0.005 0.052v0.041l0.005 0.052 0.009 0.047 0.016 0.041 0.005 0.053 0.016 0.041 0.015 0.036 0.021 0.052 0.027 0.052 0.020 0.037 0.052 0.083 0.032 0.041 0.025 0.037 0.043 0.031 0.025 0.036 0.036 0.032 0.084 0.063 0.036 0.020 0.041 0.027 0.048 0.021 0.052 0.020 0.036 0.021 0.104 0.031 0.047 0.005 0.052 0.016 0.052 0.005h0.224l0.063-0.005h0.047l0.053-0.021 0.052-0.005 0.052-0.015 0.041-0.011 0.047-0.021 0.041-0.020 0.047-0.021 0.032-0.021 0.041-0.025v-0.464h-0.735v-0.744h1.661v1.667l-0.036 0.025-0.036 0.031-0.037 0.027-0.041 0.031-0.041 0.021-0.036 0.032-0.084 0.052-0.052 0.025-0.083 0.052-0.053 0.021-0.041 0.020-0.047 0.021-0.104 0.041-0.041 0.021-0.095 0.031-0.047 0.011-0.047 0.016-0.052 0.016-0.041 0.009-0.156 0.032-0.048 0.005-0.104 0.011-0.057 0.005-0.052 0.004-0.057 0.005h-0.26l-0.052-0.009h-0.052l-0.052-0.011h-0.047l-0.052-0.016-0.152-0.031-0.041-0.016-0.047-0.005-0.052-0.021-0.095-0.031-0.093-0.041-0.052-0.021-0.036-0.021-0.052-0.020-0.037-0.032-0.052-0.020-0.031-0.027-0.041-0.025-0.084-0.063-0.041-0.027-0.032-0.031-0.041-0.032-0.068-0.067-0.036-0.032-0.031-0.036-0.037-0.037-0.025-0.041-0.032-0.031-0.025-0.043-0.032-0.041-0.025-0.036-0.027-0.041-0.025-0.048-0.021-0.041-0.021-0.047-0.020-0.041-0.041-0.095-0.016-0.036-0.021-0.047-0.011-0.047-0.009-0.041-0.011-0.052-0.016-0.048-0.011-0.052-0.005-0.041-0.009-0.052-0.011-0.093-0.011-0.104v-0.276l0.011-0.053v-0.052l0.016-0.052v-0.052l0.015-0.047 0.016-0.052 0.021-0.093 0.015-0.052 0.016-0.047 0.063-0.141 0.020-0.041 0.021-0.047 0.027-0.048 0.020-0.041 0.027-0.036 0.052-0.084 0.031-0.041 0.032-0.036 0.025-0.041 0.068-0.068 0.031-0.037 0.037-0.036 0.031-0.036 0.043-0.032 0.072-0.063 0.041-0.031 0.043-0.027 0.036-0.031 0.041-0.027 0.043-0.020 0.047-0.027 0.052-0.025 0.036-0.027 0.052-0.020 0.047-0.021 0.047-0.025 0.043-0.011 0.052-0.016 0.041-0.021 0.047-0.009 0.047-0.016 0.052-0.011 0.043-0.016 0.052-0.011h0.052l0.047-0.015h0.052l0.052-0.011h0.047zM24.073 19.448h0.276l0.063 0.011h0.099l0.052 0.015h0.057l0.052 0.016 0.093 0.021 0.052 0.011 0.047 0.009 0.053 0.016 0.047 0.016 0.041 0.011 0.047 0.015 0.052 0.016 0.041 0.021 0.052 0.020 0.048 0.021 0.047 0.027 0.036 0.020 0.047 0.027 0.047 0.020 0.043 0.027 0.047 0.031 0.036 0.027 0.084 0.063 0.041 0.025-0.032 0.041-0.025 0.043-0.031 0.036-0.032 0.041-0.025 0.047-0.027 0.043-0.031 0.036-0.032 0.041-0.025 0.043-0.032 0.041-0.025 0.036-0.032 0.041-0.025 0.048-0.032 0.041-0.031 0.036-0.032 0.041-0.025 0.043-0.041-0.032-0.048-0.025-0.036-0.027-0.041-0.025-0.047-0.021-0.043-0.027-0.047-0.020-0.036-0.021-0.052-0.020-0.037-0.021-0.041-0.016-0.093-0.031-0.104-0.032-0.156-0.031-0.052-0.005-0.095-0.011h-0.109l-0.057 0.011-0.052 0.011-0.047 0.011-0.041 0.020-0.037 0.021-0.041 0.036-0.031 0.047-0.021 0.048v0.124l0.027 0.057 0.020 0.032 0.032 0.031 0.052 0.027 0.041 0.025 0.047 0.021 0.052 0.020 0.068 0.016 0.036 0.016 0.043 0.011 0.052 0.011 0.041 0.015 0.047 0.011 0.057 0.016 0.052 0.016 0.057 0.015 0.057 0.011 0.047 0.016 0.057 0.015 0.052 0.011 0.047 0.011 0.157 0.047 0.041 0.016 0.052 0.016 0.047 0.020 0.052 0.027 0.104 0.041 0.047 0.027 0.084 0.052 0.077 0.057 0.048 0.031 0.036 0.036 0.036 0.043 0.037 0.036 0.025 0.036 0.037 0.052 0.025 0.037 0.021 0.052 0.020 0.031 0.016 0.052 0.016 0.043 0.011 0.047 0.020 0.104 0.005 0.052 0.005 0.047v0.125l-0.005 0.057-0.011 0.104-0.011 0.052-0.015 0.047-0.011 0.052-0.016 0.052-0.015 0.047-0.021 0.037-0.021 0.047-0.025 0.041-0.032 0.037-0.052 0.083-0.063 0.073-0.036 0.025-0.041 0.037-0.032 0.031-0.041 0.031-0.041 0.021-0.041 0.032-0.048 0.025-0.093 0.047-0.052 0.021-0.047 0.020-0.052 0.016-0.047 0.016-0.043 0.011-0.104 0.020-0.036 0.011-0.052 0.011h-0.052l-0.047 0.011h-0.052l-0.052 0.011h-0.371l-0.156-0.016-0.052-0.011-0.047-0.005-0.104-0.020-0.057-0.011-0.047-0.011-0.052-0.016-0.053-0.011-0.047-0.015-0.052-0.016-0.052-0.021-0.041-0.015-0.052-0.016-0.052-0.021-0.037-0.020-0.052-0.016-0.041-0.027-0.052-0.020-0.041-0.027-0.037-0.025-0.052-0.027-0.036-0.020-0.041-0.032-0.041-0.025-0.043-0.032-0.036-0.031-0.041-0.032-0.037-0.025-0.041-0.037 0.032-0.041 0.036-0.036 0.031-0.037 0.037-0.041 0.025-0.036 0.032-0.041 0.036-0.037 0.031-0.036 0.037-0.041 0.025-0.037 0.037-0.036 0.031-0.041 0.032-0.037 0.036-0.041 0.025-0.036 0.037-0.037 0.036-0.041 0.036 0.032 0.048 0.031 0.036 0.031 0.052 0.027 0.036 0.027 0.047 0.031 0.043 0.027 0.047 0.020 0.036 0.027 0.047 0.015 0.052 0.021 0.043 0.021 0.047 0.015 0.041 0.021 0.052 0.016 0.047 0.015 0.052 0.016 0.052 0.005 0.048 0.016 0.052 0.005h0.057l0.047 0.015h0.281l0.047-0.009 0.052-0.011 0.036-0.005 0.043-0.016 0.036-0.020 0.047-0.032 0.027-0.036 0.020-0.041 0.016-0.048v-0.12l-0.021-0.047-0.025-0.041-0.032-0.031-0.047-0.032-0.036-0.015-0.047-0.021-0.052-0.021-0.057-0.025-0.037-0.011-0.041-0.011-0.052-0.016-0.036-0.009-0.052-0.016-0.052-0.005-0.053-0.021-0.052-0.005-0.057-0.015-0.047-0.011-0.052-0.016-0.052-0.011-0.052-0.015-0.047-0.016-0.052-0.011-0.041-0.016-0.095-0.031-0.052-0.021-0.052-0.015-0.104-0.043-0.047-0.025-0.052-0.027-0.036-0.025-0.048-0.027-0.036-0.025-0.047-0.027-0.068-0.068-0.036-0.031-0.063-0.073-0.027-0.036-0.020-0.036-0.032-0.048-0.015-0.036-0.048-0.125-0.009-0.052-0.011-0.047v-0.047l-0.011-0.052v-0.213l0.011-0.104 0.011-0.043 0.009-0.047 0.016-0.041 0.011-0.052 0.021-0.036 0.020-0.053 0.021-0.041 0.020-0.052 0.027-0.036 0.036-0.041 0.027-0.043 0.041-0.036 0.031-0.036 0.032-0.043 0.047-0.036 0.032-0.027 0.041-0.031 0.083-0.052 0.047-0.027 0.095-0.047 0.041-0.015 0.047-0.016 0.052-0.021 0.052-0.015 0.037-0.011 0.047-0.011 0.041-0.011 0.047-0.011 0.052-0.011 0.104-0.009 0.048-0.005zM11.755 19.484h0.943l0.043 0.095 0.020 0.041 0.016 0.052 0.021 0.047 0.015 0.041 0.027 0.047 0.031 0.095 0.027 0.047 0.041 0.093 0.011 0.041 0.083 0.188 0.016 0.047 0.021 0.043 0.025 0.047 0.011 0.047 0.027 0.052 0.009 0.047 0.048 0.093 0.020 0.037 0.021 0.052 0.016 0.052 0.015 0.036 0.027 0.052 0.016 0.043 0.020 0.052 0.016 0.036 0.021 0.052 0.047 0.093 0.015 0.047 0.011 0.048 0.021 0.047 0.025 0.041 0.021 0.052 0.021 0.047 0.015 0.041 0.043 0.095 0.015 0.047 0.021 0.047 0.016 0.047 0.020 0.041 0.027 0.048 0.020 0.047 0.021 0.041 0.011 0.052 0.041 0.093 0.021 0.043 0.015 0.047 0.043 0.093 0.025 0.052 0.011 0.041 0.027 0.053 0.009 0.036 0.021 0.052 0.027 0.052 0.020 0.036 0.016 0.052 0.021 0.043 0.015 0.052 0.027 0.036 0.031 0.104 0.021 0.037 0.020 0.052 0.027 0.041 0.021 0.052 0.009 0.047 0.016 0.041 0.021 0.047 0.025 0.043h-1.041l-0.025-0.043-0.016-0.047-0.021-0.047-0.020-0.052-0.011-0.041-0.043-0.093-0.015-0.043-0.041-0.093-0.016-0.041-0.021-0.052-0.031-0.095-0.021-0.041h-1.448l-0.020 0.047-0.016 0.043-0.021 0.052-0.020 0.047-0.011 0.041-0.021 0.052-0.020 0.041-0.016 0.047-0.021 0.043-0.020 0.052-0.016 0.036-0.021 0.052-0.015 0.052-0.021 0.037-0.016 0.052h-1.031l0.015-0.048 0.043-0.093 0.015-0.052 0.016-0.041 0.027-0.047 0.020-0.047 0.021-0.043 0.011-0.047 0.020-0.052 0.027-0.041 0.020-0.047 0.032-0.095 0.047-0.093 0.016-0.047 0.020-0.041 0.016-0.048 0.063-0.14 0.021-0.052 0.015-0.041 0.016-0.047 0.027-0.043 0.020-0.052 0.016-0.047 0.016-0.041 0.020-0.052 0.027-0.037 0.016-0.052 0.020-0.041 0.016-0.047 0.021-0.052 0.025-0.041 0.016-0.052 0.020-0.037 0.016-0.052 0.021-0.052 0.020-0.036 0.021-0.052 0.016-0.043 0.020-0.052 0.016-0.036 0.027-0.052 0.020-0.052 0.021-0.041 0.011-0.047 0.020-0.048 0.027-0.047 0.020-0.041 0.011-0.052 0.021-0.047 0.021-0.043 0.041-0.093 0.015-0.041 0.043-0.104 0.020-0.037 0.021-0.052 0.016-0.041 0.015-0.052 0.021-0.047 0.027-0.041 0.020-0.052 0.016-0.037 0.016-0.052 0.020-0.041 0.027-0.047 0.016-0.052 0.015-0.043 0.021-0.052 0.020-0.036 0.027-0.052 0.016-0.052 0.015-0.036 0.021-0.052zM14.683 19.511h1.031l0.032 0.041 0.052 0.084 0.025 0.047 0.027 0.036 0.025 0.047 0.027 0.041 0.025 0.048 0.027 0.041 0.025 0.036 0.027 0.047 0.025 0.043 0.037 0.041 0.015 0.041 0.032 0.047 0.025 0.043 0.032 0.036 0.021 0.047 0.025 0.041 0.032 0.043 0.015 0.041 0.037 0.047 0.077 0.125 0.021 0.041 0.031 0.041 0.027 0.041 0.025 0.048 0.079 0.124 0.025 0.048 0.027 0.041 0.031-0.041 0.021-0.053 0.031-0.036 0.027-0.047 0.025-0.036 0.021-0.052 0.036-0.037 0.027-0.047 0.021-0.036 0.025-0.043 0.032-0.047 0.025-0.036 0.027-0.052 0.025-0.036 0.032-0.048 0.020-0.036 0.027-0.052 0.025-0.031 0.027-0.043 0.031-0.052 0.027-0.036 0.020-0.047 0.032-0.037 0.025-0.052 0.027-0.031 0.031-0.041 0.027-0.052 0.025-0.037 0.027-0.047 0.025-0.036 0.027-0.052 0.031-0.037 0.021-0.047 0.027-0.036h1.047v3.719h-0.98v-2.188l-0.025 0.037-0.032 0.052-0.025 0.031-0.032 0.041-0.020 0.052-0.032 0.037-0.025 0.036-0.032 0.052-0.052 0.073-0.031 0.041-0.027 0.052-0.031 0.037-0.027 0.036-0.020 0.052-0.032 0.036-0.025 0.037-0.032 0.052-0.025 0.036-0.032 0.041-0.025 0.047-0.021 0.037-0.031 0.041-0.027 0.047-0.031 0.036-0.032 0.043-0.020 0.041-0.027 0.047-0.031 0.037-0.032 0.041-0.020 0.052-0.037 0.031-0.020 0.041-0.032 0.053-0.025 0.036h-0.021l-0.031-0.047-0.027-0.043-0.025-0.047-0.027-0.036-0.031-0.047-0.027-0.041-0.031-0.043-0.027-0.041-0.025-0.047-0.027-0.036-0.036-0.048-0.021-0.041-0.031-0.047-0.027-0.036-0.025-0.047-0.032-0.043-0.025-0.052-0.032-0.036-0.025-0.047-0.027-0.043-0.025-0.047-0.032-0.036-0.025-0.047-0.032-0.041-0.020-0.043-0.032-0.041-0.025-0.047-0.032-0.036-0.025-0.048-0.032-0.041-0.020-0.047-0.037-0.036-0.020-0.048-0.032-0.041v2.193h-0.963v-3.683zM19.307 19.511h2.933v0.839h-1.959v0.599h1.76v0.792h-1.76v0.635h1.984v0.844h-2.953v-3.677zM12.213 20.651l-0.016 0.047-0.015 0.043-0.021 0.052-0.021 0.047-0.015 0.047-0.043 0.093-0.020 0.052-0.016 0.043-0.016 0.052-0.020 0.036-0.016 0.052-0.021 0.052-0.020 0.037-0.016 0.052-0.020 0.041-0.016 0.052-0.027 0.047-0.011 0.041-0.020 0.052-0.021 0.048-0.016 0.041-0.020 0.052h0.859l-0.020-0.052-0.016-0.047-0.041-0.095-0.016-0.047-0.021-0.041-0.015-0.052-0.021-0.047-0.016-0.047-0.020-0.043-0.016-0.047-0.021-0.052-0.015-0.041-0.043-0.093-0.009-0.048-0.021-0.047-0.021-0.052-0.015-0.036-0.043-0.104-0.015-0.047zM10.683 27.615h10.681l-5.452 1.797z" />
        </svg>
    );
}

export default EpicIconCustom;