import { jwtDecode } from "jwt-decode";

const storeToken = (token) => {
  localStorage.setItem("token", token);
};

const getToken = () => {
  return localStorage.getItem("token");
};

const removeToken = () => {
  localStorage.removeItem("token");
};

const checkToken = () => {
  const token = getToken();
  if (token) {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      removeToken();
      return false;
    }
    return true;
  }
  return false;
};

export { storeToken, getToken, removeToken, checkToken };
