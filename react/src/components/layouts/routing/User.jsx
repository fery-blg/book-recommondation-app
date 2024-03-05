import { useState, Suspense, useEffect } from "react";
import { useUser } from "../../../stores/userStore";
import { checkAuth } from "../../../services/auth.service";
import { Navigate } from "react-router-dom";

export function Auth({ children }) {
  const [isAuth, setIsAuth] = useState(null);
  const [setUser] = useUser((state) => [state.setUser]);

  useEffect(() => {
    checkAuth("user/check")
      .then((res) => {
        setIsAuth(res);
        if (res == false) setUser({});
      })
      .catch((err) => {
        setUser({});
        setIsAuth(null);
      });
  }, []);

  return (
    <>{isAuth != null ? isAuth ? children : <Navigate to="/login" /> : null}</>
  );
}
