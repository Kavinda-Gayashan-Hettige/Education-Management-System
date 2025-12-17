import axios from "axios";

const API_URL = "http://localhost:9090/api/teachers";

export const getAllTeachers = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Fetching teachers failed:", error);
    throw error;
  }
};
