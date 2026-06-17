import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../services/api";

const DriverPage = () => {
  const { number } = useParams();

  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDriver();
  }, []);

  async function fetchDriver() {
    try {
      const response = await api.get(`/driver/${number}`);

      setDriver(response.data);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }

  if (loading) {
    return <h1>Loading Driver...</h1>;
  }

  if (!driver) {
    return <h1>Driver Not Found</h1>;
  }

  return (
    <div className="space-y-6">
      <Link to="/" className="inline-block text-zinc-400 hover:text-white">
        ← Back to Leaderboard
      </Link>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
        <h1 className="text-5xl font-bold">{driver.full_name}</h1>

        <p className="text-zinc-400 mt-2">{driver.team_name}</p>

        <div className="grid grid-cols-2 gap-6 mt-8">
          <div>
            <p className="text-zinc-500">Driver Number</p>
            <h2 className="text-2xl font-bold">#{driver.driver_number}</h2>
          </div>

          <div>
            <p className="text-zinc-500">Code</p>
            <h2 className="text-2xl font-bold">{driver.name_acronym}</h2>
          </div>

          <div>
            <p className="text-zinc-500">Country</p>
            <h2 className="text-2xl font-bold">{driver.country_code}</h2>
          </div>

          <div>
            <p className="text-zinc-500">Team</p>
            <h2 className="text-2xl font-bold">{driver.team_name}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverPage;
