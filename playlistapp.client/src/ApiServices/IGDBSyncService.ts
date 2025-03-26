import axios from "axios";
import { AuthenticationUtils } from "./AuthenticationUtils";

export const IGDBSyncService = {
  syncCompanies: async () => {
    try {
      let jwtToken = AuthenticationUtils.GetJwtToken();
      await axios.get(`${import.meta.env.VITE_URL}/IGDBSync/synccompanies`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      return true;
    } catch {
      console.error("Failed to sync companies");
    }
  },
  syncPlatforms: async () => {
    try {
      let jwtToken = AuthenticationUtils.GetJwtToken();
      await axios.get(`${import.meta.env.VITE_URL}/IGDBSync/syncplatforms`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      return true;
    } catch {
      console.error("Failed to sync platforms");
    }
  },
  syncGenres: async () => {
    try {
      let jwtToken = AuthenticationUtils.GetJwtToken();
      await axios.get(`${import.meta.env.VITE_URL}/IGDBSync/syncgenres`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      return true;
    } catch {
      console.error("Failed to sync genres");
    }
  },
  syncGames: async () => {
    try {
      let jwtToken = AuthenticationUtils.GetJwtToken();
      await axios.get(`${import.meta.env.VITE_URL}/IGDBSync/syncgames`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      return true;
    } catch {
      console.error("Failed to sync games");
    }
  },
};
