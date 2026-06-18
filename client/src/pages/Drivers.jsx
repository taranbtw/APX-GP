import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Drivers() {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    api.get("/drivers").then((res) => setDrivers(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Drivers</h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {drivers.map((driver) => (
          <div
            key={driver.driver_number}
            className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800"
          >
            <h2 className="font-bold text-xl">{driver.full_name}</h2>

            <p className="text-zinc-400 mt-2">{driver.team_name}</p>

            <p className="text-yellow-400 mt-2">#{driver.driver_number}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
