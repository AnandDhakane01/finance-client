import { React, useState } from "react";
import { login } from "../services/authService";
import { proxy } from "../proxy";
import { useHistory } from "react-router-dom";
import NavBar from "../components/NavBar";
import Cookies from "js-cookie";

export default function Login() {
  const history = useHistory();
  const [formData, setformData] = useState({
    userName: "",
    password: "",
  });

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.userName && formData.password) {
      login(formData).then((res) => {
        if (res.error) {
          alert(res.message);
        } else {
          setformData({ userName: "", password: "" });
          localStorage.setItem("accessToken", res.accessToken);
          history.push("/");
        }
      });
    }
  };

  const handleGoogleOauth = async () => {
    window.open(`${proxy}/google`, "_self");
    setformData({ userName: "", password: "" });
    localStorage.setItem("accessToken", Cookies.get("accessToken"));
  };

  return (
    <>
      <NavBar />
      <div className="flex justify-center text-center my-20">
        <form onSubmit={handleSubmit} method="post">
          <div className="">
            <input
              autoComplete="off"
              value={formData.userName}
              autoFocus
              className="bg-gray-800 outline-none border-none p-3 rounded-lg "
              name="userName"
              placeholder="username"
              type="text"
              onChange={handleChange}
            />
          </div>
          <div className="mt-4">
            <input
              autoComplete="off"
              className="bg-gray-800 outline-none border-none p-3 rounded-lg "
              name="password"
              value={formData.password}
              placeholder="password"
              type="password"
              onChange={handleChange}
            />
          </div>
          <button
            className="mt-4 py-2 px-3 rounded-lg bg-blue-400"
            type="submit"
          >
            Login
          </button>
          {/* <button
            href=""
            className="ml-3 mt-4 py-2 px-3 rounded-lg bg-blue-600"
            onClick={handleGoogleOauth}
          >
            <span className="float-left mr-2">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt=""
              />
            </span>
            Sign in with google
          </button> */}
        </form>
      </div>
    </>
  );
}
