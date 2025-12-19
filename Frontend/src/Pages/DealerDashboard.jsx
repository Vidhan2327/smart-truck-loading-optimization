import { logoutUser } from "../Services/AuthService";
import { useNavigate } from "react-router-dom";

export default function DealerDashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dealer Dashboard</h1>

      <p>Welcome, Truck Dealer</p>

      <ul>
        <li>Add Truck</li>
        <li>View Available Loads</li>
        <li>Manage Routes</li>
      </ul>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
