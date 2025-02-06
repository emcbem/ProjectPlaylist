const PlaystationKeys = {
  GetPlaystationAccessToken: [
    "Playstation",
    "GetPlaystationAccessToken",
  ] as const,
  GetPlaystationUsersByUsername: (username: string) =>
    ["Playstation", "GetPlaystationUsersByUsername", username] as const,
  OrchestrateInitialPlaystationAccountSync: [
    "Orchestrate",
    "Playstation",
  ] as const,
};

export default PlaystationKeys;
