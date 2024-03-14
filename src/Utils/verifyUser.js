import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { backend_url } from '../config';


const verifyUser = () => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies([]);
    useEffect(() => {
        const verifyUser = async () => {
        if (!cookies.jwt) {
            navigate("/login");
        } else {
            try {
            const { data } = await axios.post(
                backend_url,
                {},
                {
                withCredentials: true,
                }
            );
            if (!data.status) {
                removeCookie("jwt");
                navigate("/login");
            }
            } catch (error) {
            removeCookie("jwt");
            navigate("/login");
            }
        }
        };
    
        verifyUser();
    }, [cookies, navigate, removeCookie]);
};

export default verifyUser;