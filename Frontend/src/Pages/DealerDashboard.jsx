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
      await fetchData(); 
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
    <div className="min-h-screen w-full 
  bg-gradient-to-br from-orange-100 via-yellow-50 to-orange-50">

      <div className="p-6 max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-extrabold text-orange-700">
            Dealer Dashboard
          </h1>

          <button
            onClick={handleLogout}
            className="bg-orange-500 hover:bg-orange-600 
          text-white px-5 py-2 rounded-xl transition shadow"
          >
            Logout
          </button>
        </div>

        {/* Incoming Requests */}
        <h2 className="text-2xl font-bold mb-6 text-orange-700">
          Incoming Shipment Requests
        </h2>

        {loading && (
          <p className="text-sm text-gray-500">Loading...</p>
        )}

        {!loading && requests.length === 0 && (
          <div className="bg-white rounded-xl p-6 shadow border border-orange-100">
            <p className="text-gray-500">No incoming requests</p>
          </div>
        )}

        {requests.map((s) => (
          <div
            key={s._id}
            className="bg-white rounded-2xl p-6 mb-5
          shadow-lg border border-orange-100
          hover:shadow-xl transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-bold text-gray-800">
                  {s.pickupLocation} → {s.destination}
                </p>
                <p className="text-sm text-gray-500">
                  Shipment ID: {s._id.slice(-6)}
                </p>
              </div>

              <button
                disabled={acceptingId === s._id}
                onClick={() => handleAccept(s._id)}
                className="bg-green-600 hover:bg-green-700
              text-white px-5 py-2 rounded-lg transition
              disabled:opacity-50"
              >
                {acceptingId === s._id ? "Accepting..." : "Accept"}
              </button>
            </div>
          </div>
        ))}

        {/* Add Truck */}
        <h2 className="text-2xl font-bold mt-14 mb-6 text-orange-700">
          Add Truck
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-6 shadow-xl
        border border-orange-100"
        >
          <div className="grid grid-cols-2 gap-4">
            <select
              required
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="border p-3 rounded-lg focus:ring-2 focus:ring-orange-400"
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
              className="border p-3 rounded-lg focus:ring-2 focus:ring-orange-400"
              onChange={(e) =>
                setFormData({ ...formData, capacity: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Volume (m³)"
              required
              className="border p-3 rounded-lg focus:ring-2 focus:ring-orange-400"
              onChange={(e) =>
                setFormData({ ...formData, volume: e.target.value })
              }
            />

            <select
              required
              value={formData.currentCity}
              onChange={(e) =>
                setFormData({ ...formData, currentCity: e.target.value })
              }
              className="border p-3 rounded-lg focus:ring-2 focus:ring-orange-400"
            >
              <option value="">Current City</option>
              {CITIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Routes */}
          <h3 className="font-semibold mt-6 mb-3 text-gray-700">
            Routes & Cost per km
          </h3>

          {routes.map((r, i) => (
            <div key={i} className="grid grid-cols-3 gap-3 mb-3">
              <select
                required
                className="border p-3 rounded-lg"
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
                className="border p-3 rounded-lg"
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
                className="border p-3 rounded-lg"
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
            className="mt-6 bg-orange-500 hover:bg-orange-600
          text-white px-6 py-3 rounded-xl transition shadow
          disabled:opacity-50"
          >
            Add Truck
          </button>
        </form>

        {/* My Trucks */}
        <h2 className="text-2xl font-bold mt-14 mb-6 text-orange-700">
          My Trucks
        </h2>

        {trucks.map((t) => (
          <div
            key={t._id}
            className="bg-white rounded-xl p-4 mb-4
          shadow border border-orange-100"
          >
            <p className="font-semibold text-gray-800">
              {t.type} Truck
            </p>
            <p className="text-sm text-gray-600">
              City: {t.currentCity} | Status: {t.status}
            </p>
            <p className="text-sm text-gray-600">
              Trips Completed: {t.tripsCompleted}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default DealerDashboard;
