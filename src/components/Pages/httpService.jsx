import axios from "axios";
import logger from "./logService";
import { createHashHistory } from "history";
axios.defaults.baseURL = 'http://localhost:5557/api';
axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (error.response.data && error.response.data === "You are not authorized.") {
      localStorage.clear();
      const history = createHashHistory();
  }

  if (error.response.data && error.response.data === "Invalid token.") {
    localStorage.clear();
    const history = createHashHistory();
    history.push("/login");
  }
  if (!expectedError) {
    logger.log(error);
  }
  console.log(error);
  return Promise.reject(error);
});

function setJwt(jwt, rjwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
