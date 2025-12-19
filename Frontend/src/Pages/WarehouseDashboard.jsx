import { logoutUser } from "../Services/AuthService";
import { useNavigate } from "react-router-dom";

export default function WarehouseDashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Warehouse Dashboard</h1>

      <p>Welcome, Warehouse User</p>

      <ul>
        <li>Create Shipment</li>
        <li>View My Shipments</li>
        <li>Optimize Truck Loading</li>
      </ul>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
