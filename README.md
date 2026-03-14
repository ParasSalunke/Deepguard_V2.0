<p align="center">
  <img src="https://img.shields.io/badge/DeepGuard-Explainable%20AI-6366f1?style=for-the-badge" alt="DeepGuard" />
  <img src="https://img.shields.io/badge/Python-3.11-3776ab?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
  <img src="https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TensorFlow-2.16-ff6f00?style=for-the-badge&logo=tensorflow&logoColor=white" alt="TensorFlow" />
  <img src="https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
</p>

# 🛡️ DeepGuard

**Explainable AI for Image Authenticity Detection**

DeepGuard is an academic-grade system that detects whether an uploaded image is **Real** or **AI-Generated**, and visually explains its decision using **Grad-CAM heatmaps**. Suitable for research presentations, hackathons, and university jury demonstrations.

---

## 📐 Architecture

```
User Upload Image
       ↓
  React Frontend  (Vite + Tailwind CSS)
       ↓
    REST API
       ↓
  FastAPI Backend  (Python)
       ↓
 CNN Model Prediction  (ResNet50 — Transfer Learning)
       ↓
 Grad-CAM Heatmap  (Explainability)
       ↓
  JSON Response  { label, confidence, reliability, heatmap }
       ↓
 Frontend Displays Results
```

---

## 📂 Project Structure

```
DeepGuard/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI entry point
│   │   ├── routes/
│   │   │   └── predict.py       # POST /predict endpoint
│   │   ├── services/
│   │   │   ├── model_service.py # ResNet50 inference
│   │   │   └── gradcam.py       # Grad-CAM heatmap generation
│   │   └── utils/
│   │       └── image_utils.py   # Image preprocessing & helpers
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── UploadSection.jsx
│   │   │   ├── ResultsSection.jsx
│   │   │   ├── FeaturesSection.jsx
│   │   │   └── Footer.jsx
│   │   ├── services/
│   │   │   └── api.js           # Axios API layer
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── vercel.json
├── model/
│   └── deepguard_model.h5       # Trained model (you must train or provide this)
├── training/
│   └── train_model.py           # Full training script
├── dataset/
│   ├── real/                    # Real photos
│   └── ai_generated/           # AI-generated images
├── render.yaml                  # Render deployment blueprint
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

| Tool       | Version |
| ---------- | ------- |
| Python     | ≥ 3.10  |
| Node.js    | ≥ 18    |
| npm        | ≥ 9     |
| pip / venv | latest  |

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/DeepGuard.git
cd DeepGuard
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate — Windows
venv\Scripts\activate
# Activate — macOS / Linux
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn app.main:app --reload --port 8000
```

The API will be available at **http://localhost:8000**.  
Health check: `GET http://localhost:8000/health`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

The app will be available at **http://localhost:5173**.  
The Vite dev server automatically proxies `/predict` and `/health` to the backend.

---

## 📊 Dataset Preparation

Organise your dataset with two sub-folders:

```
dataset/
├── real/            ← Real photographs (JPG/PNG)
└── ai_generated/    ← AI-generated images (JPG/PNG)
```

**Recommended sources:**

| Dataset                     | Description                            |
| --------------------------- | -------------------------------------- |
| CIFAKE                      | 60 K real + 60 K AI images (CIFAR-based) |
| ArtiFact                    | Multi-generator AI image dataset       |
| Stable Diffusion outputs    | Generate your own with SD / DALL-E     |
| Unsplash / Pexels           | High-quality real photographs          |

> **Tip:** Aim for at least 1 000 images per class. More data = better accuracy.

---

## 🏋️ Model Training

```bash
cd training

# Basic training (expects ../dataset with real/ and ai_generated/)
python train_model.py

# Custom options
python train_model.py \
  --dataset ../dataset \
  --output ../model/deepguard_model.h5 \
  --epochs 20 \
  --batch 64 \
  --lr 0.0001
```

The best model is automatically saved to `model/deepguard_model.h5`.

### Training Arguments

| Arg            | Default                         | Description                        |
| -------------- | ------------------------------- | ---------------------------------- |
| `--dataset`    | `../dataset`                    | Path to dataset directory          |
| `--output`     | `../model/deepguard_model.h5`   | Output model path                  |
| `--epochs`     | `15`                            | Training epochs                    |
| `--batch`      | `32`                            | Batch size                         |
| `--img_size`   | `224`                           | Image size (square)                |
| `--lr`         | `1e-4`                          | Learning rate                      |
| `--fine_tune_at` | `140`                         | Unfreeze base layers from this idx |

---

## 🔌 API Reference

### Health Check

```
GET /health
```

```json
{ "status": "running" }
```

### Prediction

```
POST /predict
Content-Type: multipart/form-data
```

**Request:** Form field `file` with a JPG or PNG image (≤ 10 MB).

**Response:**

```json
{
  "label": "AI-Generated",
  "confidence": 0.93,
  "reliability": "High",
  "heatmap": "<base64_encoded_png>"
}
```

### Testing with curl

```bash
curl -X POST http://localhost:8000/predict \
  -F "file=@test_image.jpg"
```

---

## ☁️ Deployment

### Frontend → Vercel

1. Push the repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your repo.
3. Set **Root Directory** to `frontend`.
4. Set **Build Command** to `npm run build` and **Output Directory** to `dist`.
5. Add environment variable:
   ```
   VITE_API_URL=https://your-backend.onrender.com
   ```
6. Deploy.

### Backend → Render

1. Go to [render.com](https://render.com) → **New Web Service**.
2. Connect your GitHub repo.
3. Set **Root Directory** to `backend`.
4. Set **Build Command** to `pip install -r requirements.txt`.
5. Set **Start Command** to `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
6. Choose **Python 3.11** runtime.
7. Upload your trained `deepguard_model.h5` to the `model/` directory (or use Render Disks).
8. Deploy.

> **Tip:** The included `render.yaml` file can be used with Render Blueprints for one-click deployment.

---

## 🧪 Tech Stack

| Layer          | Technology                     |
| -------------- | ------------------------------ |
| Frontend       | React 18, Vite, Tailwind CSS   |
| HTTP Client    | Axios                          |
| Icons          | Lucide React                   |
| Backend        | Python 3.11, FastAPI           |
| AI Framework   | TensorFlow / Keras 2.16        |
| Model          | ResNet50 (Transfer Learning)   |
| Explainability | Grad-CAM                       |
| Image Processing | OpenCV, Pillow, NumPy        |

---

## 📜 License

This project is released for **academic and educational purposes**.  
It is not intended for production forensic or legal use.

---

<p align="center">
  Built with ❤️ for Explainable AI research
</p>
