import Cookies from "js-cookie";

const headerFactory = () => {
  const inLocalStorage = localStorage.getItem("accessToken");
  const inCookies = Cookies.get("accessToken");

  let token = inLocalStorage === "undefined" ? inCookies : inLocalStorage;

  return {
    "Content-Type": "application/json",
    authorization: token ? `Bearer ${token}` : null,
  };
};

export default headerFactory;
