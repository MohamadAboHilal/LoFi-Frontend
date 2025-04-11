import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const fetchTracks = async () => {
  try {
    const response = await API.get("/tracks");
    return response.data;
  } catch (error) {
    console.error("Error fetching tracks:", error);
    throw error;
  }
};

export default API;
