import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

const AdminRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API}/auth/admin-auth`,
          {
            headers: {
              Authorization: auth?.token, // 👈 EXPLICIT
            },
          }
        );

        setOk(res.data.ok);
      } catch (error) {
        setOk(false);
      }
    };

    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="/" />;
};
export default AdminRoute;