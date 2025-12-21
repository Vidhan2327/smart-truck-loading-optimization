import { useEffect, useState } from "react";
import {
  getMyShipments,
  createShipment,
  requestTruck,
  payInvoice,
} from "../Services/ShipmentService";
import { getAvailableTrucks } from "../Services/TruckService";
import { logoutUser } from "../Services/AuthService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LOCATIONS = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Kolkata",
];

const ROUTE_PRICING = {
  "Delhi-Mumbai": 2000,
  "Delhi-Bangalore": 2600,
  "Delhi-Chennai": 2800,
  "Delhi-Hyderabad": 2400,
  "Delhi-Kolkata": 2200,

  "Mumbai-Delhi": 2000,
  "Mumbai-Bangalore": 1800,
  "Mumbai-Chennai": 2000,
  "Mumbai-Hyderabad": 1700,
  "Mumbai-Kolkata": 2500,

  "Bangalore-Delhi": 2600,
  "Bangalore-Mumbai": 1800,
  "Bangalore-Chennai": 1400,
  "Bangalore-Hyderabad": 1200,
  "Bangalore-Kolkata": 2700,

  "Chennai-Delhi": 2800,
  "Chennai-Mumbai": 2000,
  "Chennai-Bangalore": 1400,
  "Chennai-Hyderabad": 1500,
  "Chennai-Kolkata": 2600,

  "Hyderabad-Delhi": 2400,
  "Hyderabad-Mumbai": 1700,
  "Hyderabad-Bangalore": 1200,
  "Hyderabad-Chennai": 1500,
  "Hyderabad-Kolkata": 2300,

  "Kolkata-Delhi": 2200,
  "Kolkata-Mumbai": 2500,
  "Kolkata-Bangalore": 2700,
  "Kolkata-Chennai": 2600,
  "Kolkata-Hyderabad": 2300,
};

const getRoutePrice = (pickup, destination) =>
  ROUTE_PRICING[`${pickup}-${destination}`] || 3000;

const WarehouseDashboard = () => {
  const navigate = useNavigate();

  const [shipments, setShipments] = useState([]);
  // const [showForm, setShowForm] = useState(false);
  const [availableTrucks, setAvailableTrucks] = useState({});
  const [selectedTruck, setSelectedTruck] = useState({});

  const [formData, setFormData] = useState({
    pickupLocation: "",
    destination: "",
    weight: "",
    volume: "",
    senderType: "Company",
    companyName: "",
    senderName: "",
    pickupAddress: "",
    deliveryAddress: "",
    expectedDeliveryDate: "",
  });

  const getMinDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toISOString().split("T")[0];
  };

  const fetchShipments = async () => {
    const res = await getMyShipments();
    setShipments(res.data);
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  const handleCreateShipment = async () => {
    const {
      pickupLocation,
      destination,
      weight,
      volume,
      senderType,
      senderName,
      pickupAddress,
      deliveryAddress,
      expectedDeliveryDate,
    } = formData;

    // Validation: all fields
    if (
      !pickupLocation ||
      !destination ||
      !weight ||
      !volume ||
      !senderType ||
      !senderName ||
      !pickupAddress ||
      !deliveryAddress ||
      !expectedDeliveryDate
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    // Validation: pickup & destination different
    if (pickupLocation === destination) {
      toast.warning("Pickup and destination must be different");
      return;
    }

    const loadingToast = toast.loading("Creating shipment...");

    try {
      await createShipment(formData);
      toast.dismiss(loadingToast);
      toast.success("Shipment created successfully 🚚");

      fetchShipments();

      // Reset form
      setFormData({
        pickupLocation: "",
        destination: "",
        weight: "",
        volume: "",
        senderType: "Company",
        senderName: "",
        pickupAddress: "",
        deliveryAddress: "",
        expectedDeliveryDate: "",
      });
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Failed to create shipment");
    }
  };

  const handleFetchTrucks = async (s) => {
    const res = await getAvailableTrucks(
      s.pickupLocation,
      s.destination
    );
    setAvailableTrucks({ ...availableTrucks, [s._id]: res.data });
  };

  const handleSendRequest = async (shipmentId) => {
    await requestTruck({
      shipmentId,
      truckId: selectedTruck[shipmentId],
    });
    fetchShipments();
  };


  const handlePayInvoice = async (shipmentId) => {
    await payInvoice({ shipmentId });
    fetchShipments();
  };

  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-br from-orange-100 via-yellow-50 to-orange-50">
        <div className="p-6 max-w-6xl mx-auto">

          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-extrabold text-orange-700">
              Warehouse Dashboard
            </h1>

            <button
              onClick={async () => {
                await logoutUser();
                navigate("/");
              }}
              className="bg-orange-500 hover:bg-orange-600
            text-white px-5 py-2 rounded-xl transition shadow"
            >
              Logout
            </button>
          </div>

          {/* Shipment Form (Always Visible) */}
          <div className="bg-white/90 backdrop-blur p-6 rounded-2xl mb-10 shadow-xl border border-orange-100">
            <h2 className="text-xl font-semibold mb-6 text-orange-700">
              New Shipment
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <select
                className="border p-3 rounded-lg focus:ring-2 focus:ring-orange-400"
                value={formData.pickupLocation}
                onChange={(e) =>
                  setFormData({ ...formData, pickupLocation: e.target.value })
                }
              >
                <option value="">Pickup</option>
                {LOCATIONS.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>

              <select
                className="border p-3 rounded-lg focus:ring-2 focus:ring-orange-400"
                value={formData.destination}
                onChange={(e) =>
                  setFormData({ ...formData, destination: e.target.value })
                }
              >
                <option value="">Destination</option>
                {LOCATIONS.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>

              <input
                className="border p-3 rounded-lg focus:ring-2 focus:ring-orange-400"
                placeholder="Weight (kg)"
                value={formData.weight}
                onChange={(e) =>
                  setFormData({ ...formData, weight: e.target.value })
                }
              />

              <input
                className="border p-3 rounded-lg focus:ring-2 focus:ring-orange-400"
                placeholder="Volume (m³)"
                value={formData.volume}
                onChange={(e) =>
                  setFormData({ ...formData, volume: e.target.value })
                }
              />

              <select
                className="border p-3 rounded-lg focus:ring-2 focus:ring-orange-400"
                value={formData.senderType}
                onChange={(e) =>
                  setFormData({ ...formData, senderType: e.target.value })
                }
              >
                <option>Company</option>
                <option>Individual</option>
              </select>

              <input
                className="border p-3 rounded-lg focus:ring-2 focus:ring-orange-400"
                placeholder="Company / Sender Name"
                value={formData.senderName}
                onChange={(e) =>
                  setFormData({ ...formData, senderName: e.target.value })
                }
              />

              <input
                className="border p-3 rounded-lg focus:ring-2 focus:ring-orange-400"
                placeholder="Pickup Address"
                value={formData.pickupAddress}
                onChange={(e) =>
                  setFormData({ ...formData, pickupAddress: e.target.value })
                }
              />

              <input
                className="border p-3 rounded-lg focus:ring-2 focus:ring-orange-400"
                placeholder="Delivery Address"
                value={formData.deliveryAddress}
                onChange={(e) =>
                  setFormData({ ...formData, deliveryAddress: e.target.value })
                }
              />

              <input
                type="date"
                min={getMinDeliveryDate()}
                value={formData.expectedDeliveryDate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    expectedDeliveryDate: e.target.value,
                  })
                }
                required
                className="border p-3 rounded-lg focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <button
              onClick={handleCreateShipment}
              disabled={
                !formData.pickupLocation ||
                !formData.destination ||
                formData.pickupLocation === formData.destination
              }
              className="mt-6 bg-orange-500 hover:bg-orange-600
            disabled:bg-orange-300 disabled:cursor-not-allowed
            text-white px-6 py-3 rounded-xl transition shadow"
            >
              Save Shipment
            </button>
          </div>

          {/* My Shipments */}
          <h2 className="text-2xl font-bold mb-6 text-orange-700">
            My Shipments
          </h2>

          {shipments.map((s) => (
            <div
              key={s._id}
              className="bg-white rounded-2xl p-6 mb-6
    shadow-lg border border-orange-100
    hover:shadow-xl transition"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">
                  {s.pickupLocation} → {s.destination}
                </h3>

                <span
                  className={`text-sm font-semibold px-4 py-1 rounded-full ${s.status === "Pending"
                    ? "bg-orange-100 text-orange-700"
                    : s.status === "In Transit"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                    }`}
                >
                  {s.status}
                </span>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                <p>
                  <span className="font-medium">Weight:</span> {s.weight} kg
                </p>
                <p>
                  <span className="font-medium">Volume:</span> {s.volume} m³
                </p>
                {/* <p>
                  <span className="font-medium">Expected Delivery Date:</span>{" "}
                  {s.expectedDeliveryDate}
                </p> */}
                <p>
                  <span className="font-medium">Sender:</span> {s.senderName}
                </p>
              </div>

              {/* Pending State */}
              {s.status === "Pending" && (
                <>
                  <button
                    onClick={() => handleFetchTrucks(s)}
                    className="bg-orange-500 hover:bg-orange-600
          text-white px-4 py-2 rounded-lg transition"
                  >
                    Request Truck
                  </button>

                  {availableTrucks[s._id] && (
                    <div className="mt-4 space-y-3">
                      <select
                        className="w-full border p-3 rounded-lg"
                        onChange={(e) =>
                          setSelectedTruck({
                            ...selectedTruck,
                            [s._id]: e.target.value,
                          })
                        }
                      >
                        <option value="">Select Truck</option>
                        {availableTrucks[s._id].map((t) => (
                          <option key={t._id} value={t._id}>
                            {t.type}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={() => handleSendRequest(s._id)}
                        className="bg-green-600 hover:bg-green-700
              text-white px-4 py-2 rounded-lg transition"
                      >
                        Send Request
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* In Transit State */}
              {s.status === "In Transit" && (() => {
                const totalAmount = getRoutePrice(
                  s.pickupLocation,
                  s.destination
                );

                const paidAmount =
                  s.paymentStatus === "Paid"
                    ? totalAmount
                    : totalAmount / 2;

                return (
                  <div className="mt-4 bg-orange-50 border border-orange-100 p-4 rounded-xl">
                    <p className="font-semibold mb-1">Invoice</p>

                    <p>Total Amount: <b>₹{totalAmount}</b></p>
                    <p>Pay :<b>₹{paidAmount}</b></p>
                    <p>Status: {s.paymentStatus}</p>

                    {s.paymentStatus === "Unpaid" && (
                      <button
                        onClick={() => handlePayInvoice(s._id)}
                        className="mt-3 bg-orange-500 hover:bg-orange-600
          text-white px-4 py-2 rounded-lg transition"
                      >
                        Pay ₹{totalAmount / 2}
                      </button>
                    )}
                  </div>
                );
              })()}


              {/* Delivered State */}
              {s.status === "Delivered" && (
                <p className="mt-3 text-green-600 font-semibold">
                  ✅ Shipment Delivered & Payment Completed
                </p>
              )}

            </div>


          ))}
        </div>
      </div>
    </>

  );
};

export default WarehouseDashboard;
