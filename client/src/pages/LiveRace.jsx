import { useEffect, useState } from "react";
import { socket } from "../socket";
import { Link } from "react-router-dom";
import { Radio, Trophy } from "lucide-react";

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

  useEffect(() => {
    socket.on("leaderboardUpdate", (data) => {
      setPositions(data.leaderboard);
      setSession(data.session);
      setLoading(false);
    });

    return () => {
      socket.off("leaderboardUpdate");
    };
  }, []);

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

  const p1 = positions[0];
  const p2 = positions[1];
  const p3 = positions[2];

  return (
    <div className="space-y-8">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-400/20 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 p-8">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-amber-400/5 to-transparent" />

        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p className="text-amber-400 uppercase tracking-[0.3em] text-sm">
              Race Control
            </p>

            <h1 className="text-5xl font-extrabold mt-3">{session?.name}</h1>

            <p className="text-zinc-400 mt-3 text-lg">
              {session?.circuit} • {session?.country}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-zinc-900/80 px-4 py-2 rounded-xl border border-zinc-800">
            <Radio size={16} className="text-amber-400 animate-pulse" />

            <span className="text-amber-400 font-semibold tracking-wider">
              LIVE
            </span>
          </div>
        </div>
      </div>

      {/* PODIUM */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* P1 */}
        <div className="bg-gradient-to-br from-amber-400/10 to-zinc-950 border border-amber-400/30 rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Trophy size={18} className="text-amber-400" />
            <span className="text-amber-400 font-bold">P1</span>
          </div>

          <h2 className="text-4xl font-extrabold text-amber-400">
            {p1?.acronym}
          </h2>

          <p className="text-zinc-300 mt-2">{p1?.driver_name}</p>

          <p className="text-zinc-500 mt-1">{p1?.team}</p>
        </div>

        {/* P2 */}
        <div className="bg-zinc-950 border border-zinc-700 rounded-3xl p-6">
          <p className="text-zinc-300 font-bold mb-3">🥈 P2</p>

          <h2 className="text-4xl font-extrabold">{p2?.acronym}</h2>

          <p className="text-zinc-300 mt-2">{p2?.driver_name}</p>

          <p className="text-zinc-500 mt-1">{p2?.team}</p>
        </div>

        {/* P3 */}
        <div className="bg-zinc-950 border border-orange-400/30 rounded-3xl p-6">
          <p className="text-orange-400 font-bold mb-3">🥉 P3</p>

          <h2 className="text-4xl font-extrabold">{p3?.acronym}</h2>

          <p className="text-zinc-300 mt-2">{p3?.driver_name}</p>

          <p className="text-zinc-500 mt-1">{p3?.team}</p>
        </div>
      </div>

      {/* LEADERBOARD */}
      <div className="space-y-3">
        {positions.map((driver) => (
          <Link
            key={driver.driver_number}
            to={`/driver/${driver.driver_number}`}
          >
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden hover:border-amber-400/50 hover:bg-zinc-900 transition-all duration-300">
              <div className="flex items-center">
                <div
                  className={`w-2 self-stretch ${
                    teamColors[driver.team] || "bg-zinc-600"
                  }`}
                />

                <div className="flex items-center justify-between w-full p-6">
                  <div className="flex items-center gap-8">
                    <div>
                      <p className="text-zinc-500 text-xs uppercase">
                        Position
                      </p>

                      <h2
                        className={`text-3xl font-bold ${
                          driver.position === 1
                            ? "text-amber-400"
                            : "text-white"
                        }`}
                      >
                        P{driver.position}
                      </h2>
                    </div>

                    <div>
                      <p className="text-zinc-500 text-xs uppercase">Code</p>

                      <h2 className="text-2xl font-bold">{driver.acronym}</h2>
                    </div>

                    <div>
                      <p className="text-zinc-500 text-xs uppercase">Driver</p>

                      <h2 className="text-xl font-semibold">
                        {driver.driver_name}
                      </h2>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-zinc-500 text-xs uppercase">Team</p>

                    <h2 className="text-lg font-semibold">{driver.team}</h2>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LiveRace;
