import "./index.css";
import { useState } from "react";
import api from "./services/api";

import Header from "./components/Header";
import UploadBox from "./components/UploadBox";
import SettingsPanel from "./components/SettingsPanel";
import Processing from "./components/Processing";
import DownloadButtons from "./components/DownloadButtons";
import RecentJobs from "./components/RecentJobs";
import StatsCards from "./components/StatsCards";
import { ToastContainer, toast } from "react-toastify";


function App() {
  // File State
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedFilename, setUploadedFilename] = useState("");

  // UI State
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  // Settings
  const [outputFormat, setOutputFormat] = useState("wav");
  const [model, setModel] = useState("htdemucs");

  // Recent Jobs
  const [jobs, setJobs] = useState([]);

  // ----------------------------
  // Upload File
  // ----------------------------
  const uploadFile = async () => {
    if (selectedFiles.length === 0) {
      toast.warning("Choose a file first");
      return;
    }

    const file = selectedFiles[0];

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/upload", formData);

      setUploadedFilename(res.data.filename);
      setCompleted(false);

      setJobs((prev) => [
        {
          name: res.data.filename,
          status: "📤 Uploaded",
        },
        ...prev,
      ]);

      toast.success("Upload Successful");
    } catch (err) {
      console.error(err);
      toast.error("Upload Failed");
    }
  };

  // ----------------------------
  // Process File
  // ----------------------------
  const processFile = async () => {
    if (!uploadedFilename) {
      toast.info("Upload the file before processing");
      return;
    }

    setProcessing(true);
    setCompleted(false);
    setProgress(5);

    setJobs((prev) =>
      prev.map((job) =>
        job.name === uploadedFilename
          ? { ...job, status: "⏳ Processing" }
          : job
      )
    );

    const timer = setInterval(() => {
      setProgress((old) => {
        if (old >= 95) return old;
        return old + 5;
      });
    }, 500);

    try {
      const res = await api.post(
        `/process?filename=${encodeURIComponent(
          uploadedFilename
        )}&format=${outputFormat}&model=${model}`
      );

      clearInterval(timer);

      setProgress(100);
      setProcessing(false);

      if (res.data.success) {
        setCompleted(true);

        setJobs((prev) =>
          prev.map((job) =>
            job.name === uploadedFilename
              ? { ...job, status: "✅ Completed" }
              : job
          )
        );

toast.success("Vocals Extracted Successfully");      } else {
        setJobs((prev) =>
          prev.map((job) =>
            job.name === uploadedFilename
              ? { ...job, status: "❌ Failed" }
              : job
          )
        );

        setMessage("❌ Processing Failed");
      }
    } catch (err) {
      clearInterval(timer);

      console.error(err);

      setProcessing(false);
      setProgress(0);

      setJobs((prev) =>
        prev.map((job) =>
          job.name === uploadedFilename
            ? { ...job, status: "❌ Failed" }
            : job
        )
      );

      toast.error("Processing Failed");
    }
  };

  // Statistics
  const uploadedCount = jobs.length;

  const completedCount = jobs.filter(
    (job) => job.status === "✅ Completed"
  ).length;

  return (
    <div className="app">
      <Header />

      <StatsCards
        uploaded={uploadedCount}
        completed={completedCount}
        model={model}
      />

      <div className="dashboard">
        <UploadBox
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
          uploadFile={uploadFile}
          processFile={processFile}
          processing={processing}
        />

        <SettingsPanel
          outputFormat={outputFormat}
          setOutputFormat={setOutputFormat}
          model={model}
          setModel={setModel}
        />
      </div>

      <Processing
        processing={processing}
        progress={progress}
      />

      {completed && (
        <DownloadButtons filename={uploadedFilename} />
      )}

      <RecentJobs jobs={jobs} />

      <h3
        style={{
          marginTop: "25px",
          textAlign: "center",
          color: "#2563eb",
        }}
      >
        {message}
      </h3>
      <ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop
  closeOnClick
  pauseOnHover
  theme="dark"
/>
    </div>
  );
}

export default App;

function Footer() {
  return (
    <footer className="footer">
      <p>
        © 2026 AI Vocal Studio • Built by Anekad
      </p>
    </footer>
  );
}

export default Footer;