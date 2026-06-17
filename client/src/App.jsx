import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./layouts/Sidebar";

import Dashboard from "./pages/Dashboard";
import LiveRace from "./pages/LiveRace";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#101010] text-white flex">
        <Sidebar />

        <main className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/live" element={<LiveRace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
