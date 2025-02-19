import axios from "axios";

export const IGDBSyncService = {
  syncCompanies: async () => {
    try {
      await axios.get(`${import.meta.env.VITE_URL}/IGDBSync/synccompanies`);
      return true;
    } catch {
      console.error("Failed to sync companies");
    }
  },
  syncPlatforms: async () => {
    try {
      await axios.get(`${import.meta.env.VITE_URL}/IGDBSync/syncplatforms`);
      return true;
    } catch {
      console.error("Failed to sync platforms");
    }
  },
  syncGenres: async () => {
    try {
      await axios.get(`${import.meta.env.VITE_URL}/IGDBSync/syncgenres`);
      return true;
    } catch {
      console.error("Failed to sync genres");
    }
  },
  syncGames: async () => {
    try {
      await axios.get(`${import.meta.env.VITE_URL}/IGDBSync/syncgames`);
      return true;
    } catch {
      console.error("Failed to sync games");
    }
  },
};
