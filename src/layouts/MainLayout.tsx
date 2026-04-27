import { Outlet } from "react-router-dom";
import Tabs from "../components/Tabs";

export default function MainLayout() {
  return (
    <div>
      <Tabs />
      <div style={{ padding: "1rem" }}>
        <Outlet />
      </div>
    </div>
  );
}
