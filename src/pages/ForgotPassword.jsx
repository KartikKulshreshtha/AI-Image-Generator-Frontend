import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import { serviceUrl } from "../service/url";
import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${serviceUrl}auth/forgot`, {
      email: email,
    });
    try {
      setLoading(true);
      if (response.data.success) {
        setShowAlert(true);
        setAlertMessage(response.data.message);
        setAlertType("success");
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
    <section className="bg-gray-50 dark:bg-gray-900">
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
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
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
            <p className="text-center text-gray-600">
              Remembered your password already?
              <Link
                to="/"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Log in here
              </Link>
            </p>
          </div>
        </div>
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Forgot Password
          </h2>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                placeholder="name@company.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
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
                "Send Reset password Link"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
