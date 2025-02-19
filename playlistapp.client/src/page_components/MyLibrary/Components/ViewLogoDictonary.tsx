import React from "react";
import EpicIcon from "./SVGs/EpicLogo";
import PS4 from "./SVGs/PS4";
import PS5 from "./SVGs/PS5";
import SteamIcon from "./SVGs/SteamLogo";
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
const N64 = () => (
  <div className="text-white dark:text-black text-2xl">N64</div>
);
const WiiLogo = () => (
  <div className="text-white dark:text-black text-2xl">Wii</div>
);
const PS1Logo = () => (
  <div className="text-white dark:text-black text-2xl">PS1</div>
);
const PS2Logo = () => (
  <div className="text-white dark:text-black text-2xl">PS2</div>
);
const PS3Logo = () => (
  <div className="text-white dark:text-black text-2xl">PS3</div>
);
const XboxLogo = () => (
  <div className="text-white dark:text-black text-2xl">Xbox</div>
);
const Xbox360Logo = () => (
  <div className="text-white dark:text-black text-2xl">X360</div>
);
const NESLogo = () => (
  <div className="text-white dark:text-black text-2xl">NES</div>
);
const SNESLogo = () => (
  <div className="text-white dark:text-black text-2xl">SNES</div>
);
const DSLogo = () => (
  <div className="text-white dark:text-black text-2xl">DS</div>
);
const GameCubeLogo = () => (
  <div className="text-white dark:text-black text-2xl">GC</div>
);
const GBCLogo = () => (
  <div className="text-white dark:text-black text-2xl">GBC</div>
);
const DreamcastLogo = () => (
  <div className="text-white dark:text-black text-2xl">SDC</div>
);
const GBALogo = () => (
  <div className="text-white dark:text-black text-2xl">GBA</div>
);
const MegaDriveLogo = () => (
  <div className="text-white dark:text-black text-2xl">SMD</div>
);
const SaturnLogo = () => (
  <div className="text-white dark:text-black text-2xl">SST</div>
);
const GBLogo = () => (
  <div className="text-white dark:text-black text-2xl">GB</div>
);
const Nintendo3DSLogo = () => (
  <div className="text-white dark:text-black text-2xl">3DS</div>
);
const PSPLogo = () => (
  <div className="text-white dark:text-black text-2xl">PSP</div>
);
const WiiULogo = () => (
  <div className="text-white dark:text-black text-2xl">WiiU</div>
);
const PSVitaLogo = () => (
  <div className="text-white dark:text-black text-2xl">PVita</div>
);
const SuperFamicomLogo = () => (
  <div className="text-white dark:text-black text-2xl">SFC</div>
);
const VirtualBoyLogo = () => (
  <div className="text-white dark:text-black text-2xl">VB</div>
);
const New3DSLogo = () => (
  <div className="text-white dark:text-black text-2xl">N3DS</div>
);
const DSiLogo = () => (
  <div className="text-white dark:text-black text-2xl">DSi</div>
);
const OculusVRLogo = () => (
  <div className="text-white dark:text-black text-2xl">OVR</div>
);
const PSVRLogo = () => (
  <div className="text-white dark:text-black text-2xl">PVR</div>
);
const PSVR2Logo = () => (
  <div className="text-white dark:text-black text-2xl">PVR2</div>
);

export const ViewLogoDictonary: Record<number, React.FC> = {
  6: SteamLogo,
  49: XboxOneLogo,
  169: XboxSXLogo,
  48: PS4Logo,
  167: PS5Logo,
  130: NintendoLogo,
  3: EpicLogo,
  508: NintendoLogo,
  163: SteamLogo,
  4: N64,
  5: WiiLogo,
  7: PS1Logo,
  8: PS2Logo,
  9: PS3Logo,
  11: XboxLogo,
  12: Xbox360Logo,
  18: NESLogo,
  19: SNESLogo,
  20: DSLogo,
  21: GameCubeLogo,
  22: GBCLogo,
  23: DreamcastLogo,
  24: GBALogo,
  29: MegaDriveLogo,
  32: SaturnLogo,
  33: GBLogo,
  37: Nintendo3DSLogo,
  38: PSPLogo,
  41: WiiULogo,
  46: PSVitaLogo,
  58: SuperFamicomLogo,
  87: VirtualBoyLogo,
  137: New3DSLogo,
  159: DSiLogo,
  162: OculusVRLogo,
  165: PSVRLogo,
  390: PSVR2Logo,
};
