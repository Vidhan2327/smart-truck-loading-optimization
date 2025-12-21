
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/shipments",
  withCredentials: true,
});


export const createShipment = (data) => API.post("/", data);
export const getMyShipments = () => API.get("/");
export const requestTruck = (data) => API.post("/request", data);


export const payInvoice = (data) => API.post("/pay", data);


export const getDealerShipmentRequests = () => API.get("/requests");
