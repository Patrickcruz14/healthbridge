import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const sendMessage = async (
  disease,
  message
) => {

  const username =
    localStorage.getItem("username");

  try {

    const response = await axios.post(
      `${API_URL}/chat`,
      {
        username,
        disease,
        message,
      }
    );

    return response.data.response;

  } catch (error) {

    console.error(error);

    return "Unable to connect to HealthBridge AI.";

  }
};