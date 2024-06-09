import axios from "axios";

// Server URL
const axiosBaseUrl = axios.create({ baseURL: "http://localhost:4000/api" });

export default axiosBaseUrl;
