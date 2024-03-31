/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import Logo from "../assets/Logo.png";
import axios from "axios";
import { serviceUrl } from "../service/url";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

const Login = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(window.location.search);
  const email = queryParams.get("email");
  const handleReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setShowAlert(true);
      setAlertMessage("Passwords do not match!, please try again");
      setAlertType("error");
    }else if(otp === ""){
      setShowAlert(true);
      setAlertMessage("Enter your OTP please!!");
      setAlertType("error");
    } else {
      setLoading(true)
      const response = await axios.post(`${serviceUrl}auth/reset`, {
        newPassword: newPassword,
        email: email,
        otp: otp,
      });
      try {
        if (response.data.success) {
          setShowAlert(true);
          setAlertMessage(response.data.message);
          setAlertType("success");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status < 500
        ) {
          setShowAlert(true);
          setAlertMessage(error.response.data.error || "An error occurred");
          setAlertType("error");
        } else {
          console.error("An unexpected error occurred:", error);
        }
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <main className="w-ful flex flex-col items-center justify-center bg-gray-50 sm:px-4">
      <div className="flex justify-center">
        {showAlert && (
          <Alert
            type={alertType}
            message={alertMessage}
            setShowAlert={setShowAlert}
          />
        )}
      </div>

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
              <label className="font-medium">OTP</label>
              <input
                type="number"
                required
                onChange={(e) => setOtp(e.target.value)}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
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
              disabled={loading}
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
                "Reset password"
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
