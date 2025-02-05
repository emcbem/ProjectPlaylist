import React from "react";
import SwitchIcon from "../SVGs/SwitchIcon";
import EpicIcon from "../SVGs/EpicLogo";
import PSIcon from "../SVGs/PSLogo";
import SteamIcon from "../SVGs/SteamLogo";
import XboxIcon from "../SVGs/XboxIcon";

const SteamLogo = () => <SteamIcon width={"30"} />;
const XboxLogo = () => <XboxIcon width={"30"} />;
const PSLogo = () => <PSIcon width={"30"} />;
const NintendoLogo = () => <SwitchIcon width={"30"} />;
const EpicLogo = () => <EpicIcon width={"30"} />;

export const LogoDictonary: Record<number, React.FC> = {
  163: SteamLogo,
  11: XboxLogo,
  7: PSLogo,
  130: NintendoLogo,
  3: EpicLogo,
};
