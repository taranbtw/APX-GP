import { useEffect, useState } from "react";
import { api } from "../services/api";

const LiveRace = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPositions();
  }, []);

  async function fetchPositions() {
    try {
      const response = await api.get("/live");

      setPositions(response.data);
    } catch (err) {
      setError("Failed to load race data");
      console.error(err);
    }

    setLoading(false);
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Live Race</h1>

      <table className="w-full mt-6">
        <thead>
          <tr className="border-b border-zinc-700">
            <th className="p-3 text-left">Pos</th>

            <th className="p-3 text-left">Code</th>

            <th className="p-3 text-left">Driver</th>

            <th className="p-3 text-left">Team</th>
          </tr>
        </thead>

        <tbody>
          {positions.map((driver, index) => (
            <tr key={index} className="border-b border-zinc-800">
              <td className="p-3">P{driver.position}</td>

              <td className="p-3">{driver.acronym}</td>

              <td className="p-3">{driver.driver_name}</td>

              <td className="p-3">{driver.team}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LiveRace;
