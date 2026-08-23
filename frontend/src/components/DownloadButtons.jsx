import "./DownloadButtons.css";

function DownloadButtons({ filename }) {
  const song = filename.replace(/\.[^/.]+$/, "");

  const vocalsUrl =
    `http://127.0.0.1:8000/outputs/htdemucs/${song}/vocals.wav`;

  const instrumentalUrl =
    `http://127.0.0.1:8000/outputs/htdemucs/${song}/no_vocals.wav`;

  return (
    <div className="download-card">

      <h2>🎉 Your files are ready</h2>

      <div className="audio-section">

        <h3>🎤 Vocals</h3>

        <audio controls>
          <source src={vocalsUrl} type="audio/wav" />
        </audio>

        <a
          href={`http://127.0.0.1:8000/download/${filename}/vocals`}
          download
        >
          <button>Download Vocals</button>
        </a>

      </div>

      <div className="audio-section">

        <h3>🎼 Instrumental</h3>

        <audio controls>
          <source src={instrumentalUrl} type="audio/wav" />
        </audio>

        <a
          href={`http://127.0.0.1:8000/download/${filename}/instrumental`}
          download
        >
          <button>Download Instrumental</button>
        </a>

      </div>

    </div>
  );
}

export default DownloadButtons;