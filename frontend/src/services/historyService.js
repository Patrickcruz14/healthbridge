import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const getHistory = async () => {

  const username =
    localStorage.getItem("username");

  const response = await axios.get(
    `${API_URL}/history/${username}`
  );

  return response.data;
};