import Cookies from "js-cookie";
const TOKEN_KEY = "accessToken";

export const isLogin = () => {
  if (localStorage.getItem(TOKEN_KEY) || Cookies.get(TOKEN_KEY)) {
    return true;
  }
  return false;
};
