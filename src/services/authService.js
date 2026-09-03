import api from "./api";

const authService = {
  login: async (credentials) => {
    const { data } = await api.post(
      "/auth/login",
      credentials
    );

    return data;
  },

  register: async (userData) => {
    const { data } = await api.post(
      "/auth/register",
      userData
    );

    return data;
  },

  forgotPassword: async (email) => {
    const { data } = await api.post(
      "/auth/forgot-password",
      { email }
    );

    return data;
  },

  logout: () => {
    localStorage.removeItem("token");
  },
};

export default authService;