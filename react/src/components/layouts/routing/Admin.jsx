import { useState, useEffect } from "react";
import { checkAuth } from "../../../services/auth.service";
import { Navigate } from "react-router-dom";
export function AdminAuth({ children }) {
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    checkAuth("admin/isadmin")
      .then((res) => {
        if (res == true) setIsAdmin(true);
      })
      .catch(() => {
        setIsAdmin(null);
      });
  }, []);

  return (
    <>
      {" "}
      {isAdmin != null ? !isAdmin ? <Navigate to="/home" /> : children : null}
    </>
  );
}
