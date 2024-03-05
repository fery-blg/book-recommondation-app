import { axiosClient } from "../utils/axiosClient";

export async function checkAuth(path) {
  try {
    await axiosClient.get(
      "/" + path,

      {
        withCredentials: true,
      }
    );
    return true;
  } catch (error) {
    return false;
  }
}

export const login = async (email, password) => {
  return await axiosClient.post(
    "/auth/login",
    { email: email, password: password },
    {
      withCredentials: true,
    }
  );
};

export const sendEmail = async (username, email) => {
  return await axiosClient.post("/auth/send-email", {
    username: username,
    email: email,
  });
};

export const verifyCode = async (code) => {
  return await axiosClient.post("/auth/register-code", {
    code: code,
  });
};

export const register = async (username, email, password) => {
  return await axiosClient.post("/auth/register", {
    username: username,
    email: email,
    password: password,
  });
};

export const logout = async () => {
  return await axiosClient
    .get(`/auth/logout`, {
      withCredentials: true,
    })
    .then(() => {
      window.location.pathname = "/";
    });
};

export const testAdminRoute = async () => {
  return await axiosClient.get("/admin/admintest", {
    withCredentials: true,
  });
};
