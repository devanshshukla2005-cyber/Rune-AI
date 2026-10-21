# Rune AI

An intelligent AI assistant featuring an interactive 3D frontend interface powered by Three.js and React, integrated with a Python Flask backend powered by Mistral AI.

## Project Structure

```
Rune-Ai/
├── backend/            # Flask API server & Mistral AI integration
│   ├── .env.example    # Template for backend environment variables
│   ├── main.py         # AI interaction & logic
│   ├── server.py       # Flask REST API endpoints
│   └── requirements.txt# Python dependencies
├── frontend/           # React + Vite + Three.js client application
│   ├── public/         # Static assets and 3D models (.glb)
│   ├── src/            # UI components, 3D scenes, chat interface
│   ├── package.json    # Frontend dependencies
│   └── vite.config.js  # Vite configuration
└── .gitignore          # Git exclusion rules
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Python (v3.10+ recommended)
- Mistral AI API Key ([Sign up here](https://console.mistral.ai/))

### 1. Backend Setup
1. Open a terminal in the `backend/` directory:
   ```bash
   cd backend
   ```
2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Create your `.env` file from the example:
   ```bash
   cp .env.example .env
   ```
   Add your `MISTRAL_API_KEY` in `.env`.
4. Run the server:
   ```bash
   python server.py
   ```
   The backend server runs on `http://127.0.0.1:5000`.

### 2. Frontend Setup
1. Open a terminal in the `frontend/` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Access the interface in your browser (typically `http://localhost:5173`).
