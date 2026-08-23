import "./Processing.css";

function Processing({ processing, progress, status }) {

  if (!processing) return null;

  return (
    <div className="processing-card">

      <div className="loader"></div>

      <h2>Extracting Vocals</h2>

      <p>
        AI is separating vocals from your music...
      </p>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <h3>{progress}%</h3>

      <small>
        This usually takes 30 seconds to 3 minutes
      </small>

    </div>
  );
}

export default Processing;