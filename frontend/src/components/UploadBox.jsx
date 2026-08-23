import { useRef, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";

function UploadBox({
  selectedFiles,
  setSelectedFiles,
  uploadFile,
  processFile,
  processing,
}) {
  const inputRef = useRef();
  const [dragging, setDragging] = useState(false);

  // Allowed file types
  const allowedTypes = [
    "audio/mpeg",
    "audio/mp3",
    "audio/wav",
    "audio/x-wav",
    "audio/flac",
    "video/mp4",
  ];

  // Max file size (100 MB)
  const MAX_SIZE = 100 * 1024 * 1024;

  // Validate selected files
  const handleFiles = (files) => {
    const fileArray = [...files];

    const validFiles = fileArray.filter((file) => {
      if (!allowedTypes.includes(file.type)) {
        toast.error(`${file.name} is not a supported file.`);
        return false;
      }

      if (file.size > MAX_SIZE) {
        toast.error(`${file.name} exceeds the 100 MB limit.`);
        return false;
      }

      return true;
    });

    if (validFiles.length === 0) return;

    setSelectedFiles(validFiles);
  };

  const chooseFile = () => {
    inputRef.current.click();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  return (
    <div
      className={`upload-card ${dragging ? "dragging" : ""}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      <FaCloudUploadAlt size={70} color="#4F46E5" />

      <h2>Upload Audio / Video</h2>

      <p>
        Drag & Drop your files here
        <br />
        or click the button below
      </p>

      <input
        type="file"
        multiple
        hidden
        ref={inputRef}
        onChange={(e) => handleFiles(e.target.files)}
      />

      <button onClick={chooseFile} disabled={processing}>
        Browse Files
      </button>

      {selectedFiles.length > 0 && (
        <>
          <div className="file-list">
            {selectedFiles.map((file, index) => (
              <div key={index} className="file-item">
                <p>
                  <strong>{file.name}</strong>
                </p>

                <p>{(file.size / (1024 * 1024)).toFixed(2)} MB</p>

                <p>{file.type || "Unknown Type"}</p>
              </div>
            ))}
          </div>

          <button onClick={uploadFile} disabled={processing}>
            {processing ? "Uploading..." : "Upload"}
          </button>

          <button onClick={processFile} disabled={processing}>
            {processing ? "Processing..." : "Extract Vocals"}
          </button>
        </>
      )}
    </div>
  );
}

export default UploadBox;
