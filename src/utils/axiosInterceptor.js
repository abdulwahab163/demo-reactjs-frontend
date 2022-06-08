import axios from "axios";
import DOMAIN_BASE_URL from "./config";

const axiosApiInstance = axios.create();

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (
      (error.response.status === 401 ||
        error.response.status === 403 ||
        error.response.status === 490) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = JSON.parse(localStorage.getItem("token")).token;
      try {
        const { data } = await axios.post(`${DOMAIN_BASE_URL}/refreshtoken`, {
          refreshToken,
        });
        localStorage.setItem("token", JSON.stringify(data));
        originalRequest.headers.Authorization = data.token;
      } catch (error) {
        localStorage.removeItem("authUser");
        localStorage.removeItem("token");
        window.location.href = "/logout";
      }
      return axiosApiInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosApiInstance;
