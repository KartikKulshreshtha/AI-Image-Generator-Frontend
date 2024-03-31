import { useState } from "react";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoIosEyeOff } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { serviceUrl } from "../service/url";
import { Alert } from "bootstrap";
// import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  //States
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      setShowAlert(true);
      setAlertMessage("Passwords do not match!, please try again");
      setAlertType("error");
    } else {
      setLoading(true);
      try {
        const response = await axios.post(`${serviceUrl}auth/signup`, userData);
        if (response.data.success) {
          setShowAlert(true);
          setAlertMessage("Signup Successfully");
          setAlertType("success");

          setTimeout(() => {
            navigate("/");
            window.location.reload();
          }, 2000);
          localStorage.setItem("token", response.data.token);
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
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="w-full flex flex-col items-center justify-center bg-gray-50 sm:px-4">
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
              Create an Account
            </h3>
            <p className="">
              Already have an account?
              <Link
                to="/"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
        <div className="bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg">
          <form className="space-y-5">
            <div>
              <label className="font-medium">Name</label>
              <input
                type="text"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                onChange={(e) =>
                  setUserData((prevUserData) => ({
                    ...prevUserData,
                    username: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                onChange={(e) =>
                  setUserData((prevUserData) => ({
                    ...prevUserData,
                    email: e.target.value,
                  }))
                }
              />
            </div>
            <div className="relative">
              <label className="font-medium">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={userData.password}
                onChange={(e) =>
                  setUserData((prevUserData) => ({
                    ...prevUserData,
                    password: e.target.value,
                  }))
                }
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg pr-10"
              />
              {!showPassword ? (
                <FaEye
                  className="absolute right-3 top-1/2 transform translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <IoIosEyeOff
                  className="absolute right-3 top-1/2 transform translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
            {/* Confirm password field */}
            <div className="relative">
              <label className="font-medium">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={userData.confirmPassword}
                onChange={(e) =>
                  setUserData((prevUserData) => ({
                    ...prevUserData,
                    confirmPassword: e.target.value,
                  }))
                }
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg pr-10"
              />
            </div>
            <button
              disabled={loading} // Disable button while loading
              onClick={handleSubmit}
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
                "Sign Up"
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Signup;
