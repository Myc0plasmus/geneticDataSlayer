import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import InstanceGenerator from "../pages/InstanceGenerator";
import HeuristicSettings from "../pages/HeuristicSettings";
import HeuristicResults from "../pages/HeuristicResults";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="generator" element={<InstanceGenerator />} />
        <Route path="settings" element={<HeuristicSettings />} />
        <Route path="results" element={<HeuristicResults />} />
      </Route>
    </Routes>
  );
}
