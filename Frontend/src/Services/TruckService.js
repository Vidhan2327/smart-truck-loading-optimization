import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/trucks",
  withCredentials: true,
});

export const getMyTrucks = () => API.get("/");
export const addTruck = (data) => API.post("/", data);
export const acceptShipment = (shipmentId) =>
  API.post("/accept", { shipmentId });

export const getAvailableTrucks = (pickupLocation, destination) =>
  API.get(
    `/available?pickupLocation=${pickupLocation}&destination=${destination}`
  );
