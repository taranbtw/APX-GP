import { useEffect, useState } from "react";
import { api } from "../services/api";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const TelemetryPage = () => {
  const [telemetry, setTelemetry] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [driver, setDriver] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDrivers();
  }, []);

  useEffect(() => {
    if (!driver) return;

    fetchTelemetry();
  }, [driver]);

  async function fetchDrivers() {
    try {
      const response = await api.get("/drivers");

      setDrivers(response.data);

      if (response.data.length > 0) {
        setDriver(response.data[0].driver_number);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchTelemetry() {
    try {
      setLoading(true);

      const response = await api.get(`/telemetry/${driver}`);

      setTelemetry(response.data);

      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error(error);
      setTelemetry([]);
    } finally {
      setLoading(false);
    }
  }

  const chartData = telemetry.map((point, index) => ({
    point: index,
    speed: point.speed,
    rpm: point.rpm,
    throttle: point.throttle,
    brake: point.brake,
  }));

  const maxSpeed =
    telemetry.length > 0 ? Math.max(...telemetry.map((t) => t.speed)) : 0;

  const maxRPM =
    telemetry.length > 0 ? Math.max(...telemetry.map((t) => t.rpm)) : 0;

  const avgSpeed =
    telemetry.length > 0
      ? Math.round(
          telemetry.reduce((sum, t) => sum + t.speed, 0) / telemetry.length,
        )
      : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold">Telemetry Dashboard</h1>

        <p className="text-zinc-400 mt-2">Live F1 Driver Telemetry</p>

        <p className="text-zinc-500 mt-1">Last Updated: {lastUpdated}</p>
      </div>

      <select
        value={driver}
        onChange={(e) => setDriver(e.target.value)}
        className="bg-zinc-900 border border-zinc-700 rounded-xl p-3"
      >
        {drivers.map((d) => (
          <option key={d.driver_number} value={d.driver_number}>
            {d.full_name}
          </option>
        ))}
      </select>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <p className="text-zinc-400">Top Speed</p>

          <h2 className="text-3xl font-bold">{maxSpeed} km/h</h2>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <p className="text-zinc-400">Max RPM</p>

          <h2 className="text-3xl font-bold">{maxRPM}</h2>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <p className="text-zinc-400">Average Speed</p>

          <h2 className="text-3xl font-bold">{avgSpeed} km/h</h2>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
        <h2 className="text-2xl font-bold mb-4">Speed Trace</h2>

        {loading ? (
          <div className="text-zinc-400">Loading telemetry...</div>
        ) : telemetry.length === 0 ? (
          <div className="text-red-400">
            No telemetry data available for this driver
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="point" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="speed"
                stroke="#f59e0b"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default TelemetryPage;
