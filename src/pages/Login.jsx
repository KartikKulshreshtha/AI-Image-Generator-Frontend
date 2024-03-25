/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { serviceUrl } from "../service/url";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${serviceUrl}auth/login`, {
        email: email,
        password: password,
      });
      if (response.data.success) {
        setShowAlert(true);
        setAlertMessage(response.data.message);
        setAlertType("success");
        localStorage.setItem("token", response.data.token);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      setShowAlert(true);
      setAlertMessage(error.response.data.message);
      setAlertType("error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="w-ful flex flex-col items-center justify-center bg-gray-50 sm:px-4">
      {showAlert && (
        <div className="flex w-96 shadow-lg rounded-lg top-0 fixed">
          {alertType === "success" ? (
            <div className="bg-green-600 py-4 px-6 rounded-l-lg flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-white fill-current"
                viewBox="0 0 16 16"
                width="20"
                height="20"
              >
                <path
                  fillRule="evenodd"
                  d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
                ></path>
              </svg>
            </div>
          ) : (
            <div className="bg-red-600 py-4 px-6 rounded-l-lg flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                className="fill-current text-white"
                width="20"
                height="20"
              >
                <path
                  fillRule="evenodd"
                  d="M4.47.22A.75.75 0 015 0h6a.75.75 0 01.53.22l4.25 4.25c.141.14.22.331.22.53v6a.75.75 0 01-.22.53l-4.25 4.25A.75.75 0 0111 16H5a.75.75 0 01-.53-.22L.22 11.53A.75.75 0 010 11V5a.75.75 0 01.22-.53L4.47.22zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5H5.31zM8 4a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 4zm0 8a1 1 0 100-2 1 1 0 000 2z"
                ></path>
              </svg>
            </div>
          )}

          <div className="px-4 py-6 bg-white rounded-r-lg flex justify-between items-center w-full border border-l-transparent border-gray-200">
            <div>{alertMessage}</div>
            <buttonn
              className="cursor-pointer"
              onClick={() => setShowAlert(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current text-gray-700"
                viewBox="0 0 16 16"
                width="20"
                height="20"
              >
                <path
                  fillRule="evenodd"
                  d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"
                ></path>
              </svg>
            </buttonn>
          </div>
        </div>
      )}
      <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
        <div className="text-center">
          <img
            src={Logo}
            width={150}
            className="mx-auto"
            style={{
              border: "0.2px solid black",
              borderRadius: "50%",
              padding: "17px",
              background: "black",
            }}
          />
          <div className="mt-3 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Log In into your account
            </h3>
            <p className="">
              Dont have an account?
              <Link
                to="/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Signup
              </Link>
            </p>
          </div>
        </div>
        <div className="bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Password</label>
              <input
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <span>Loading...</span>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    className="animate-spin h-5 w-5 ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="none"
                      d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 18c4.41 0 8-3.59 8-8s-3.59-8-8-8-8 3.59-8 8 3.59 8 8 8z"
                    ></path>
                  </svg>
                </div>
              ) : (
                "Log In"
              )}
            </button>
            <p className="">
              Forget your password? Don't worry, we've got you covered!
              <Link
                to="/forgot-password"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Recover it here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
