export const apiUrl =
  process.env.NODE_ENS !== "production"
    ? "http://localhost:5000/api"
    : "somedeployedURL";
export const LOCAL_STORAGE_TOKEN_NAME = "learnit-mern";
