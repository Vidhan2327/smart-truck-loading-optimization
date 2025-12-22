import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/trucks`,
  withCredentials: true,
});

export const getMyTrucks = () => API.get("/");
export const addTruck = (data) => API.post("/", data);

export const acceptShipment = (shipmentId) =>
  API.post("/accept", { shipmentId });

export const getAvailableTrucks = (
  pickupLocation,
  destination,
  weight,
  volume
) =>
  API.get(
    `/available?pickupLocation=${pickupLocation}&destination=${destination}&weight=${weight}&volume=${volume}`
  );

