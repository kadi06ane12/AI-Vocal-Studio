import "./StatsCards.css";

function StatsCards({
  uploaded,
  completed,
  model,
}) {
  return (
    <div className="stats-grid">

      <div className="stat-card">
        <h3>🎵 Songs Uploaded</h3>
        <h1>{uploaded}</h1>
      </div>

      <div className="stat-card">
        <h3>🤖 AI Model</h3>
        <h1>{model}</h1>
      </div>

      <div className="stat-card">
        <h3>✅ Completed</h3>
        <h1>{completed}</h1>
      </div>

    </div>
  );
}

export default StatsCards;