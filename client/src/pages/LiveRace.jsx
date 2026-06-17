import { useEffect, useState } from "react";
import { api } from "../services/api";

const teamColors = {
  McLaren: "bg-orange-500",
  Ferrari: "bg-red-600",
  Mercedes: "bg-cyan-400",
  RedBullRacing: "bg-blue-600",
  Williams: "bg-blue-400",
  Alpine: "bg-pink-500",
  Haas: "bg-zinc-400",
  Sauber: "bg-green-500",
  "Racing Bulls": "bg-indigo-500",
  "Aston Martin": "bg-emerald-500",
};

const LiveRace = () => {
  const [positions, setPositions] = useState([]);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPositions();
  }, []);

  async function fetchPositions() {
    try {
      const response = await api.get("/live");

      setPositions(response.data.leaderboard);
      setSession(response.data.session);
    } catch (err) {
      setError("Failed to load race data");
      console.error(err);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="h-24 bg-zinc-900 rounded-3xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-zinc-400 uppercase tracking-widest text-sm">
              Live Race
            </p>

            <h1 className="text-4xl font-bold mt-2">{session?.name}</h1>

            <p className="text-zinc-400 mt-3">
              {session?.circuit} • {session?.country}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>

            <span className="text-red-400 font-semibold">LIVE</span>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="space-y-4">
        {positions.map((driver, index) => (
          <div
            key={index}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden hover:bg-zinc-800 transition-all duration-200"
          >
            <div className="flex items-center">
              {/* Team Color */}
              <div
                className={`w-2 self-stretch ${
                  teamColors[driver.team] || "bg-zinc-600"
                }`}
              />

              <div className="flex items-center justify-between w-full p-6">
                {/* Left */}
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-zinc-500 text-sm">Position</p>

                    <h2 className="text-3xl font-bold">P{driver.position}</h2>
                  </div>

                  <div>
                    <p className="text-zinc-500 text-sm">Code</p>

                    <h2 className="text-2xl font-bold">{driver.acronym}</h2>
                  </div>

                  <div>
                    <p className="text-zinc-500 text-sm">Driver</p>

                    <h2 className="text-xl font-semibold">
                      {driver.driver_name}
                    </h2>
                  </div>
                </div>

                {/* Right */}
                <div className="text-right">
                  <p className="text-zinc-500 text-sm">Team</p>

                  <h2 className="text-lg font-semibold">{driver.team}</h2>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveRace;
