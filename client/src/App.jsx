import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./layouts/Sidebar";

import Dashboard from "./pages/Dashboard";
import LiveRace from "./pages/LiveRace";
import DriverPage from "./pages/DriverPage";
import Telemetry from "./pages/Telemetry";
import StrategyLab from "./pages/StrategyLab";
import Replay from "./pages/Replay";
import Drivers from "./pages/Drivers";
import Teams from "./pages/Teams";
import Circuits from "./pages/Circuits";
import Standings from "./pages/Standings";
import Calendar from "./pages/Calendar";
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
              <Route path="/telemetry" element={<Telemetry />} />
              <Route path="/strategy" element={<StrategyLab />} />
              <Route path="/replay" element={<Replay />} />
              <Route path="/drivers" element={<Drivers />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/circuits" element={<Circuits />} />
              <Route path="/standings" element={<Standings />} />
              <Route path="/calendar" element={<Calendar />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
