import axios from "axios";

const API_URL = "http://localhost:5000/api/events";

export const fetchEvents = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createEvent = async (eventData: any, token: string) => {
  const response = await axios.post(API_URL, eventData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
