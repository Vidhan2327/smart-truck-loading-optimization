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

const LOCATIONS = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Kolkata",
];

const WarehouseDashboard = () => {
  const navigate = useNavigate();

  const [shipments, setShipments] = useState([]);
  const [showForm, setShowForm] = useState(false);
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
    await createShipment(formData);
    setShowForm(false);
    fetchShipments();
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
    <div className="p-6 max-w-6xl mx-auto">
      
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Warehouse Dashboard</h1>
        <button
          onClick={async () => {
            await logoutUser();
            navigate("/");
          }}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

    
      <button
        onClick={() => setShowForm(true)}
        className="mb-6 bg-black text-white px-4 py-2 rounded"
      >
        + Create Shipment
      </button>

      {showForm && (
        <div className="border p-4 rounded mb-6">
          <h2 className="font-semibold mb-4">New Shipment</h2>

          <div className="grid grid-cols-2 gap-4">
            <select
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
              placeholder="Weight (kg)"
              onChange={(e) =>
                setFormData({ ...formData, weight: e.target.value })
              }
            />
            <input
              placeholder="Volume (m³)"
              onChange={(e) =>
                setFormData({ ...formData, volume: e.target.value })
              }
            />

            <select
              onChange={(e) =>
                setFormData({ ...formData, senderType: e.target.value })
              }
            >
              <option>Company</option>
              <option>Individual</option>
            </select>

            <input
              placeholder="Company / Sender Name"
              onChange={(e) =>
                setFormData({ ...formData, senderName: e.target.value })
              }
            />

            <input
              placeholder="Pickup Address"
              onChange={(e) =>
                setFormData({ ...formData, pickupAddress: e.target.value })
              }
            />
            <input
              placeholder="Delivery Address"
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
              className="border p-2 rounded"
            />
          </div>

          <button
            onClick={handleCreateShipment}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            Save Shipment
          </button>
        </div>
      )}

     
      <h2 className="text-xl font-semibold mb-4">My Shipments</h2>

      {shipments.map((s) => (
        <div key={s._id} className="border p-4 rounded mb-3">
          <p className="font-semibold">
            {s.pickupLocation} → {s.destination}
          </p>
          <p>Status: {s.status}</p>

          {s.status === "Pending" && (
            <>
              <button
                onClick={() => handleFetchTrucks(s)}
                className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
              >
                Request Truck
              </button>

              {availableTrucks[s._id] && (
                <>
                  <select
                    className="block mt-2"
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
                    className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Send Request
                  </button>
                </>
              )}
            </>
          )}

          
          {s.status === "In Transit" && (
            <div className="mt-3 border p-3 rounded bg-gray-50">
              <p className="font-semibold">Invoice</p>
              <p>Total Amount: ₹{s.totalAmount}</p>
              <p>Paid: ₹{s.amountPaid}</p>
              <p>Payment Status: {s.paymentStatus}</p>

              {s.paymentStatus === "Unpaid" && (
                <button
                  onClick={() => handlePayInvoice(s._id)}
                  className="mt-2 bg-black text-white px-4 py-1 rounded"
                >
                  Pay ₹1000
                </button>
              )}
            </div>
          )}

          {s.status === "Delivered" && (
            <p className="mt-2 text-green-600 font-semibold">
              Shipment Delivered & Payment Completed
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default WarehouseDashboard;
