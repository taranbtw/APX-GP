export default function Dashboard() {
  const stats = [
    {
      title: "Championship Leader",
      value: "Lando Norris",
      subtext: "201 Points",
    },
    {
      title: "Track Conditions",
      value: "24°C Dry",
      subtext: "Wind 12 km/h",
    },
    {
      title: "Current Session",
      value: "Las Vegas GP",
      subtext: "Practice 3",
    },
    {
      title: "Fastest Lap",
      value: "1:35.812",
      subtext: "Oscar Piastri",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
        <p className="text-zinc-400 text-sm uppercase tracking-widest">
          ApexGP
        </p>

        <h1 className="text-4xl font-bold mt-2">Live Formula 1 Intelligence</h1>

        <p className="text-zinc-400 mt-3">
          Real-time race tracking powered by OpenF1.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
          >
            <p className="text-zinc-400 text-sm">{stat.title}</p>

            <h2 className="text-2xl font-bold mt-3">{stat.value}</h2>

            <p className="text-zinc-500 mt-2">{stat.subtext}</p>
          </div>
        ))}
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
        <p className="text-zinc-400 uppercase text-sm">Upcoming Event</p>

        <h2 className="text-3xl font-bold mt-3">Las Vegas Grand Prix</h2>

        <p className="text-zinc-400 mt-2">
          Saturday Night Race • 50 Laps • 310 km
        </p>

        <button className="mt-6 px-5 py-3 rounded-2xl bg-yellow-400 text-black font-semibold hover:opacity-90">
          Open Live Command
        </button>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
        <h2 className="text-2xl font-bold mb-6">Recent Events</h2>

        <div className="space-y-4">
          {[
            "Norris sets fastest lap",
            "Hamilton enters pit lane",
            "Yellow flag in Sector 2",
            "Safety Car deployed",
          ].map((event) => (
            <div key={event} className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-yellow-400" />

              <p className="text-zinc-300">{event}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
