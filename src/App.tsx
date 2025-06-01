import LatestArrivals from './pages/Latest Arrivals/LatestArrivals';
import { Routes, Route } from "react-router";

export default function App() {
  return (
    <Routes>
      <Route path="/latest-arrivals" element={<LatestArrivals />} />
    </Routes>
  );
}