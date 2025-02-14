import React from "react";
import SteamIcon from "./SVGs/SteamLogo";
import EpicIcon from "./SVGs/EpicLogo";
import PS4 from "./SVGs/PS4";
import PS5 from "./SVGs/PS5";
import SwitchIcon from "./SVGs/SwitchIcon";
import XBO from "./SVGs/XBO";
import XBSX from "./SVGs/XBSX";

const SteamLogo = () => <SteamIcon width={"40"} />;
const XboxOneLogo = () => <XBO width={"90"} />;
const XboxSXLogo = () => <XBSX width={"60"} />;
const PS4Logo = () => <PS4 width={"75"} />;
const PS5Logo = () => <PS5 width={"75"} />;
const NintendoLogo = () => <SwitchIcon width={"40"} />;
const EpicLogo = () => <EpicIcon width={"30"} />;

export const ViewLogoDictonary: Record<number, React.FC> = {
  6: SteamLogo,
  49: XboxOneLogo,
  169: XboxSXLogo,
  48: PS4Logo,
  167: PS5Logo,
  130: NintendoLogo,
  3: EpicLogo,
};
