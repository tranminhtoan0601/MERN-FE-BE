import axios from "axios";
const setAuthToken = (token) => {
  console.log(token);
  try {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  } catch (error) {
    console.log(error);
  }
};
export default setAuthToken;
