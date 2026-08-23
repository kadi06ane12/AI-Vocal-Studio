# 🎵 AI Vocal Studio

AI Vocal Studio is a modern web application that separates vocals and instrumentals from songs using **Meta's Demucs AI model**.

It features a clean React frontend, a FastAPI backend, waveform visualization, audio preview, and one-click downloads.

---

## ✨ Features

- 🎤 AI Vocal Extraction
- 🎼 Instrumental Extraction
- 📂 Drag & Drop Upload
- 📁 Multiple File Upload
- 🌊 Audio Waveform Visualization
- ▶️ Audio Preview
- 📥 Download Vocals & Instrumentals
- ⚙️ Model Selection
- 🎵 Output Format Selection
- 📊 Processing Progress
- 📝 Recent Jobs
- 📈 Statistics Dashboard
- 🔔 Toast Notifications
- 🎨 Modern Responsive UI

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- Axios
- WaveSurfer.js
- React Icons
- React Toastify

### Backend

- FastAPI
- Python
- Demucs
- FFmpeg
- Uvicorn

---

## 📂 Project Structure

```
AI-Vocal-Studio/
│
├── backend/
│   ├── routes/
│   ├── services/
│   ├── uploads/
│   ├── outputs/
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── .gitignore
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/AI-Vocal-Studio.git
```

---

### Backend

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt

python -m uvicorn main:app --reload
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend:

```
http://localhost:5173
```

Backend:

```
http://127.0.0.1:8000
```

---

## 📸 Screenshots

> Add screenshots of the application after deployment.

Suggested screenshots:

- Dashboard
- Upload Page
- Processing Screen
- Audio Preview
- Download Section

---

## 🔮 Future Improvements

- Real-time processing updates
- User authentication
- Cloud storage integration
- Batch processing queue
- Mobile-first responsive layout
- More AI separation models

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Developed by **Anekad**

If you found this project useful, consider giving it a ⭐ on GitHub.