import { useEffect, useState } from "react";
import {
  getMyTrucks,
  addTruck,
  acceptShipment,
} from "../Services/TruckService";
import { getDealerShipmentRequests } from "../Services/ShipmentService";
import { logoutUser } from "../Services/AuthService";
import { useNavigate } from "react-router-dom";

const CITIES = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Kolkata",
];

const DealerDashboard = () => {
  const navigate = useNavigate();

  const [trucks, setTrucks] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [acceptingId, setAcceptingId] = useState(null);

  const [formData, setFormData] = useState({
    type: "",
    capacity: "",
    volume: "",
    driverType: "Individual",
    driverName: "",
    driverAddress: "",
    companyName: "",
    managerName: "",
    currentCity: "",
  });

  const [routes, setRoutes] = useState([
    { pickupLocation: "", destination: "", costPerKm: "" },
  ]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [t, r] = await Promise.all([
        getMyTrucks(),
        getDealerShipmentRequests(),
      ]);

      setTrucks(t?.data || []);
      setRequests(r?.data || []);
    } catch (err) {
      console.error("Dashboard fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await addTruck({ ...formData, routes });
      await fetchData(); // 🔁 sync after mutation
    } catch (err) {
      console.error("Add truck failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (shipmentId) => {
    try {
      setAcceptingId(shipmentId);

      setRequests((prev) => prev.filter((s) => s._id !== shipmentId));

      await acceptShipment(shipmentId);

      await fetchData();
    } catch (err) {
      console.error("Accept shipment failed", err);
      await fetchData();
    } finally {
      setAcceptingId(null);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Dealer Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Incoming Shipment Requests</h2>

      {loading && <p className="text-sm text-gray-500">Loading...</p>}

      {!loading && requests.length === 0 && (
        <p className="text-sm text-gray-500">No incoming requests</p>
      )}

      {requests.map((s) => (
        <div key={s._id} className="border p-4 rounded mb-3">
          <p className="font-semibold">
            {s.pickupLocation} → {s.destination}
          </p>

          <button
            disabled={acceptingId === s._id}
            onClick={() => handleAccept(s._id)}
            className="mt-2 bg-green-600 text-white px-4 py-1 rounded disabled:opacity-50"
          >
            {acceptingId === s._id ? "Accepting..." : "Accept"}
          </button>
        </div>
      ))}

      <h2 className="text-xl font-semibold mt-10 mb-4">Add Truck</h2>

      <form onSubmit={handleSubmit} className="border p-4 rounded">
        <select
          required
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        >
          <option value="">Truck Type</option>
          <option value="Mini">Mini (≤1000kg)</option>
          <option value="Medium">Medium (1–5 ton)</option>
          <option value="Heavy">Heavy (&gt;5 ton)</option>
        </select>

        <input
          type="number"
          placeholder="Capacity (kg)"
          required
          className="border p-2 rounded w-full mb-2"
          onChange={(e) =>
            setFormData({ ...formData, capacity: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Volume (m³)"
          required
          className="border p-2 rounded w-full mb-2"
          onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
        />

        <select
          required
          value={formData.currentCity}
          onChange={(e) =>
            setFormData({ ...formData, currentCity: e.target.value })
          }
          className="border p-2 rounded w-full mb-2"
        >
          <option value="">Current City</option>
          {CITIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <h3 className="font-semibold mt-4 mb-2">Routes & Cost / km</h3>

        {routes.map((r, i) => (
          <div key={i} className="grid grid-cols-3 gap-2 mb-2">
            <select
              required
              className="border p-2 rounded"
              onChange={(e) => {
                const copy = [...routes];
                copy[i].pickupLocation = e.target.value;
                setRoutes(copy);
              }}
            >
              <option value="">Pickup</option>
              {CITIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <select
              required
              className="border p-2 rounded"
              onChange={(e) => {
                const copy = [...routes];
                copy[i].destination = e.target.value;
                setRoutes(copy);
              }}
            >
              <option value="">Destination</option>
              {CITIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <input
              type="number"
              placeholder="₹ / km"
              required
              className="border p-2 rounded"
              onChange={(e) => {
                const copy = [...routes];
                copy[i].costPerKm = e.target.value;
                setRoutes(copy);
              }}
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-black text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Add Truck
        </button>
      </form>

      <h2 className="text-xl font-semibold mt-10 mb-4">My Trucks</h2>

      {trucks.map((t) => (
        <div key={t._id} className="border p-3 rounded mb-2">
          {t.type} | {t.currentCity} | {t.status} | Trips: {t.tripsCompleted}
        </div>
      ))}
    </div>
  );
};

export default DealerDashboard;
