import "./SettingsPanel.css";

function SettingsPanel({
  outputFormat,
  setOutputFormat,
  model,
  setModel,
}) {
  return (
    <div className="settings-card">

      <h2>⚙ AI Settings</h2>

      <div className="setting">

        <label>Output Format</label>

        <select
          value={outputFormat}
          onChange={(e) => setOutputFormat(e.target.value)}
        >
          <option value="wav">WAV</option>
          <option value="mp3">MP3</option>
          <option value="flac">FLAC</option>
        </select>

      </div>

      <div className="setting">

        <label>AI Model</label>

        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
        >
          <option value="htdemucs">htdemucs (Balanced)</option>
          <option value="htdemucs_ft">htdemucs_ft (Best Quality)</option>
          <option value="mdx">MDX</option>
        </select>

      </div>

    </div>
  );
}

export default SettingsPanel;