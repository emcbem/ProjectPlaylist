export const AuthenticationUtils = {
  GetJwtToken: () => {
    let jwtToken = localStorage.getItem("authToken");
    if (!jwtToken) {
      console.error("Unable to make this request unauthenticated");
      throw new Error("Unable to make this request unauthenticated");
    }
    return jwtToken;
  },
};
