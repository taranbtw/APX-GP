export default function Teams() {
  const teams = [
    "McLaren",
    "Ferrari",
    "Mercedes",
    "Red Bull",
    "Aston Martin",
    "Alpine",
    "Williams",
    "RB",
    "Sauber",
    "Haas",
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Teams</h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {teams.map((team) => (
          <div
            key={team}
            className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800"
          >
            <h2 className="font-bold text-xl">{team}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
