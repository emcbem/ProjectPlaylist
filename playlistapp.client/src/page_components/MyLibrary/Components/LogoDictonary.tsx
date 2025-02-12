import React from "react";
import SteamIcon from "./SVGs/SteamLogo";
import EpicIcon from "./SVGs/EpicLogo";
import PS4 from "./SVGs/PS4";
import PS5 from "./SVGs/PS5";
import SwitchIcon from "./SVGs/SwitchIcon";
import XBO from "./SVGs/XBO";
import XBSX from "./SVGs/XBSX";

const SteamLogo = () => <SteamIcon width={"20"} />;
const XboxOneLogo = () => <XBO width={"50"} />;
const XboxSXLogo = () => <XBSX width={"30"} />;
const PS4Logo = () => <PS4 width={"45"} />;
const PS5Logo = () => <PS5 width={"45"} />;
const NintendoLogo = () => <SwitchIcon width={"20"} />;
const EpicLogo = () => <EpicIcon width={"30"} />;

export const LogoDictonary: Record<number, React.FC> = {
  6: SteamLogo,
  49: XboxOneLogo,
  169: XboxSXLogo,
  48: PS4Logo,
  167: PS5Logo,
  130: NintendoLogo,
  3: EpicLogo,
};
