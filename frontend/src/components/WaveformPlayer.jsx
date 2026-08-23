import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

function WaveformPlayer({ audioUrl }) {
  const containerRef = useRef(null);
  const waveSurferRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    waveSurferRef.current = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#c7d2fe",
      progressColor: "#4f46e5",
      cursorColor: "#2563eb",
      height: 80,
      barWidth: 3,
      barGap: 2,
      barRadius: 3,
      responsive: true,
      url: audioUrl,
    });

    return () => {
      waveSurferRef.current?.destroy();
    };
  }, [audioUrl]);

  const togglePlay = () => {
    waveSurferRef.current?.playPause();
  };

  return (
    <div>
      <div ref={containerRef}></div>

      <button
        style={{ marginTop: "15px" }}
        onClick={togglePlay}
      >
        ▶ Play / Pause
      </button>
    </div>
  );
}

export default WaveformPlayer;