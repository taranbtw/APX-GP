export default function StrategyLab() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Strategy Lab</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
          <h2 className="text-xl font-bold">Pit Window</h2>
          <p className="text-zinc-400 mt-3">AI strategy engine coming soon.</p>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
          <h2 className="text-xl font-bold">Tyre Analysis</h2>
          <p className="text-zinc-400 mt-3">Compare tyre performance.</p>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
          <h2 className="text-xl font-bold">Race Simulation</h2>
          <p className="text-zinc-400 mt-3">Predict finishing positions.</p>
        </div>
      </div>
    </div>
  );
}
