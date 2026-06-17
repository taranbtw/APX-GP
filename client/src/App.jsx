import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./layouts/Sidebar";

import Dashboard from "./pages/Dashboard";
import LiveRace from "./pages/LiveRace";
import DriverPage from "./pages/DriverPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-white flex">
        <Sidebar />

        <main className="flex-1 bg-[#050505] overflow-y-auto">
          <div className="max-w-7xl mx-auto p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/live" element={<LiveRace />} />
              <Route path="/driver/:number" element={<DriverPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
