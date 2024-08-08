import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {backend_url} from "../config";

function UserLogin() {
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const [message, setMessage] = useState("");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const onInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    await axios
      .post(`${backend_url}/api/users/login`, loginData)
      .then((response) => {
        if (response.data.success) {
          window.location.href = "/";
        } else {
          setMessage(response.data.message);
        }
      })
      .catch((error) => {
        const errorMessage = error.response
          ? error.response.data.message
          : "Network error";
        setMessage(errorMessage);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:border dark:border-gray-700">
        <h1 className="mb-6 text-2xl font-semibold text-center text-gray-900 dark:text-white">
          Sign in to your account
        </h1>
        {message && (
          <div className="mb-4 text-center text-red-500">{message}</div>
        )}
        <form className="space-y-6" onSubmit={submit}>
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
              value={loginData.email}
              onChange={onInputChange}
              className="w-full p-3 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-400 dark:focus:border-orange-400"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={loginData.password}
              onChange={onInputChange}
              className="w-full p-3 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-400 dark:focus:border-orange-400"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 text-orange-400 border-gray-300 rounded focus:ring-2 focus:ring-orange-400 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-orange-400"
              />
              <label
                htmlFor="remember"
                className="ml-2 text-sm text-gray-600 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-orange-400 hover:underline dark:text-orange-400"
            >
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full px-5 py-2.5 text-sm font-medium text-white bg-orange-400 rounded-lg hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Sign In
          </button>
          <p className="text-sm text-center text-gray-600 dark:text-gray-300">
            Don’t have an account yet?{" "}
            <Link
              to="/register"
              className="font-medium text-orange-400 hover:underline dark:text-orange-400"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default UserLogin;
