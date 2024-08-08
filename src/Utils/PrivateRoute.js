import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backend_url } from "../config";

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    var child = null;
    axios.defaults.withCredentials = true;

  
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await axios.get(`${backend_url}/api/users/auth_user`, { withCredentials: true });
          setIsUserLoggedIn(response.data.authUser);
          if (!response.data.authUser) {
            navigate('/login');
          }
        } catch (err) {
          console.error(err);
          navigate('/login');
        }
      };
      checkAuth();
    }, [navigate]);
  
    return isUserLoggedIn ? children : null;
  };

export default PrivateRoute;