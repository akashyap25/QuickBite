import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { backend_url } from "../config";

function UserVerify() {
  const params = useParams();
  const [message, setMessage] = useState("");
  axios.defaults.withCredentials = true;


  useEffect(() => {
    const verifyUser = async () => {
      await axios
        .get(`${backend_url}/api/users/${params.id}/verify/${params.token}`)
        .then((response) => {
          setMessage(response.data.message);
        })
        .catch((err) => {
          console.error(err);
          setMessage(err.response.data.message);
        });
    };
    verifyUser();
  }, [params.id, params.token]);

  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            {message}
          </h1>

          <br />
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <Link
              to={"/"}
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              Login Here
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UserVerify;