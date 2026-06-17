import { Trophy, CloudSun, Radio, Timer, Crown, Activity } from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Championship Leader",
      value: "Lando Norris",
      subtext: "201 Points",
      icon: Trophy,
    },
    {
      title: "Track Conditions",
      value: "24°C Dry",
      subtext: "Wind 12 km/h",
      icon: CloudSun,
    },
    {
      title: "Current Session",
      value: "Las Vegas GP",
      subtext: "Practice 3",
      icon: Radio,
    },
    {
      title: "Fastest Lap",
      value: "1:35.812",
      subtext: "Oscar Piastri",
      icon: Timer,
    },
  ];

  return (
    <div className="space-y-8">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-r from-black via-zinc-950 to-yellow-950/30 p-10">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-yellow-500/10 to-transparent" />

        <div className="relative z-10">
          <p className="text-yellow-400 text-sm uppercase tracking-[0.35em]">
            ApexGP Race Control
          </p>

          <h1 className="text-5xl md:text-6xl font-extrabold mt-4 leading-tight">
            Formula 1
            <br />
            Command Center
          </h1>

          <p className="text-zinc-400 mt-5 max-w-2xl text-lg">
            Real-time race tracking, telemetry intelligence, driver analytics,
            session monitoring and strategic insights powered by OpenF1.
          </p>

          <div className="flex gap-4 mt-8">
            <button className="px-6 py-3 rounded-xl bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition">
              Open Race Control
            </button>

            <button className="px-6 py-3 rounded-xl border border-zinc-700 hover:bg-zinc-900 transition">
              Explore Analytics
            </button>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 hover:border-yellow-500/40 transition-all duration-300"
            >
              <Icon size={22} className="text-yellow-400 mb-4" />

              <p className="text-zinc-500 text-sm">{stat.title}</p>

              <h2 className="text-3xl font-bold mt-2">{stat.value}</h2>

              <p className="text-zinc-400 mt-2">{stat.subtext}</p>
            </div>
          );
        })}
      </div>

      {/* EVENT + STATUS */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Crown size={20} className="text-yellow-400" />

            <p className="text-zinc-500 uppercase tracking-widest text-xs">
              Next Event
            </p>
          </div>

          <h2 className="text-3xl font-bold">Las Vegas Grand Prix</h2>

          <p className="text-zinc-400 mt-3">
            Saturday Night Race • 50 Laps • 310 km
          </p>

          <button className="mt-6 px-5 py-3 rounded-xl bg-yellow-500 text-black font-semibold hover:bg-yellow-400">
            Open Race Control
          </button>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Activity size={20} className="text-yellow-400" />

            <p className="text-zinc-500 uppercase tracking-widest text-xs">
              System Status
            </p>
          </div>

          <div className="space-y-5">
            <div className="flex justify-between">
              <span className="text-zinc-300">OpenF1 API</span>

              <span className="text-green-400">ONLINE</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-300">Live Feed</span>

              <span className="text-green-400">ACTIVE</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-300">Telemetry</span>

              <span className="text-yellow-400">COMING SOON</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-300">Race Analytics</span>

              <span className="text-yellow-400">IN DEVELOPMENT</span>
            </div>
          </div>
        </div>
      </div>

      {/* RECENT EVENTS */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
        <h2 className="text-2xl font-bold mb-6">Recent Events</h2>

        <div className="space-y-5">
          {[
            "Norris sets fastest lap",
            "Hamilton enters pit lane",
            "Yellow flag in Sector 2",
            "Safety Car deployed",
          ].map((event) => (
            <div
              key={event}
              className="flex items-center gap-4 border-b border-zinc-800 pb-4 last:border-none"
            >
              <div className="w-2 h-2 rounded-full bg-yellow-400" />

              <p className="text-zinc-300">{event}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
