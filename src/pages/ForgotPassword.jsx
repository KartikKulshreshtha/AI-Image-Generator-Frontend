import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import { serviceUrl } from "../service/url";
import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${serviceUrl}auth/forgot`, { email: email });
    console.log(response);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
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
              Reset passwod
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
