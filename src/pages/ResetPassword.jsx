/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import Logo from "../assets/Logo.png";
import axios from "axios";
import { serviceUrl } from "../service/url";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const navigate = useNavigate();

  const queryParams = new URLSearchParams(window.location.search);
  const email = queryParams.get("email");
  const handleReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setShowAlert(true);
      setAlertMessage("Passwords do not match!, please try again");
      setAlertType("error");
    } else {
      const response = await axios.post(`${serviceUrl}auth/reset`, {
        newPassword: newPassword,
        email: email,
      });
      if (response.data.success) {
        setShowAlert(true);
        setAlertMessage(response.data.message);
        setAlertType("success");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setShowAlert(true);
        setAlertMessage(response.data.message);
        setAlertType("error");
      }
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
              Reset your password
            </h3>
          </div>
        </div>
        <div className="bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            <div>
              <label className="font-medium">New Password</label>
              <input
                type="password"
                required
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Confirm New Password</label>
              <input
                type="password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>

            <button
              className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
              onClick={handleReset}
            >
              Reset your password
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;