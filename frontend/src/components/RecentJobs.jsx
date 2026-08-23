import "./RecentJobs.css";

function RecentJobs({ jobs }) {
  return (
    <div className="jobs-card">

      <h2>📜 Recent Jobs</h2>

      {jobs.length === 0 ? (
        <p>No jobs yet.</p>
      ) : (
        jobs.map((job, index) => (
          <div className="job" key={index}>
            <span>🎵 {job.name}</span>

            <span>{job.status}</span>
          </div>
        ))
      )}

    </div>
  );
}

export default RecentJobs;