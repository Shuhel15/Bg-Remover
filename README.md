# ✂️ BG.REMOVER - AI-Powered Background Removal Web Application

![BG.REMOVER Banner](./frontend/public/during.png)

<p align="center">
  <b>A modern, high-performance web application designed to strip image backgrounds automatically using AI. Built with Next.js 16, FastAPI, and <code>rembg</code>.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/FastAPI-0.141-009688?style=for-the-badge&logo=fastapi" alt="FastAPI" />
  <img src="https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python" alt="Python" />
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb" alt="MongoDB" />
</p>

---

## 🌟 Overview

**BG.REMOVER** is a full-stack image processing web application that allows users to upload photos, automatically extract foreground subjects with high precision using machine learning (`rembg` with ONNX runtime), customize photo background colors, and export high-resolution transparent PNG images in seconds.

The application features a sleek dark-themed, glassmorphic UI built with **Next.js 16 (App Router)** and **Framer Motion**, backed by a fast **Python FastAPI** AI microservice and secure **MongoDB + NextAuth.js** authentication.

---

## 🖼️ Application Screenshots & Previews

### 1. Home / Landing Page
The landing page showcases a dynamic hero section with smooth floating image micro-animations and interactive call-to-actions.

![Landing Page](./frontend/public/during.png)

### 2. Before vs After Background Removal
Upload any image (PNG, JPG, WEBP) and convert it into a clean transparent PNG asset in seconds.

| Original Image | Background Removed Result |
| :---: | :---: |
| ![Original Image](./frontend/public/before.png) | ![Removed Background Result](./frontend/public/after.png) |

### 3. About & Workflow Section
Minimalist and clean layout highlighting the user experience and straightforward workflow.

![About Section](./frontend/public/about.png)

---

## ✨ Features

- 🧠 **AI-Powered Background Removal**: Uses `rembg` (u2net model) to accurately detect and remove complex backgrounds from subjects.
- 🎨 **Custom Color Canvas**: Replace transparent backgrounds with custom solid background colors using an integrated color picker or preset color swatches.
- ⚡ **Real-Time Drag & Drop**: Drag-and-drop interface supporting PNG, JPG, and WEBP image formats with live client-side preview.
- 🔒 **User Authentication**: Secure user registration and login system powered by **NextAuth.js (v5)**, **bcryptjs** password encryption, and **MongoDB**.
- 💫 **Interactive UI Animations**: Micro-interactions, animated transitions, and floating card effects using **Framer Motion**.
- 📥 **Client-Side Canvas Export**: Download full-resolution processed images cleanly exported via HTML5 Canvas.

---

## 🛠️ Tech Used

### **Frontend Stack**
- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Authentication**: [NextAuth.js v5](https://next-auth.js.org/)
- **Database Client**: [Mongoose](https://mongoosejs.com/) & MongoDB Atlas

### **Backend Stack**
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **AI Processing**: [`rembg`](https://github.com/danielgatis/rembg) (u2net ONNX Model)
- **ASGI Server**: [Uvicorn](https://www.uvicorn.org/)
- **Image Processing**: [Pillow (PIL)](https://python-pillow.org/)
- **Runtime Environment**: Python 3.10+

---

## 📁 Folder Structure

```text
bg-remover/
├── backend/                  # Python FastAPI AI Microservice
│   ├── venv/                 # Python Virtual Environment
│   ├── .env                  # Backend Environment Variables (CORS Allowed Origins)
│   ├── main.py               # FastAPI App & Background Removal Route
│   └── requirements.txt      # Python Dependencies (rembg, fastapi, uvicorn)
│
├── frontend/                 # Next.js 16 Frontend Web Application
│   ├── public/               # Public Image Assets & Previews
│   │   ├── about.png         # About Section Screenshot
│   │   ├── after.png         # Removed Background Output Sample
│   │   ├── before.png        # Original Image Sample
│   │   └── during.png        # Main Hero Screenshot
│   ├── src/
│   │   ├── app/              # Next.js App Router Routes
│   │   │   ├── api/          # Next.js API Routes (NextAuth Authentication)
│   │   │   │   └── auth/     # Auth Handlers
│   │   │   ├── login/        # Login Page Component
│   │   │   ├── register/     # Registration Page Component
│   │   │   ├── remove-background/ # Protected Background Removal Tool Page
│   │   │   ├── globals.css   # Global Tailwind CSS Setup
│   │   │   ├── layout.tsx    # Root Application Layout & Navbar/Footer
│   │   │   └── page.tsx      # Main Home Landing Page
│   │   ├── components/       # Reusable UI Components
│   │   │   ├── About.tsx     # About Section
│   │   │   ├── CTA.tsx       # Call to Action Banner
│   │   │   ├── Features.tsx  # Application Features Grid
│   │   │   ├── Footer.tsx    # Footer Component
│   │   │   ├── Hero.tsx      # Interactive Hero Component
│   │   │   ├── HowItWorks.tsx# Step-by-Step Guide Component
│   │   │   ├── Navbar.tsx    # Navigation Bar
│   │   │   ├── Review.tsx    # User Testimonials / Reviews Component
│   │   │   └── SessionProvider.tsx # NextAuth Session Wrapper
│   │   ├── lib/              # Core Utilities & Configurations
│   │   │   ├── auth.ts       # NextAuth Credentials Provider Config
│   │   │   └── mongodb.ts    # MongoDB Connection Handler
│   │   └── models/           # Mongoose Data Models
│   │       └── User.ts       # User Database Schema
│   ├── .env                  # Frontend Environment Variables (DB URI, Auth Secret, API URL)
│   ├── next.config.ts        # Next.js Configuration
│   ├── package.json          # Node Dependencies & NPM Scripts
│   └── tsconfig.json         # TypeScript Configuration
└── README.md                 # Project Documentation
```

---

## ⚡ How to Install & Run Locally

Follow these step-by-step instructions to get the application running on your local machine.

### **Prerequisites**
Make sure you have the following installed on your system:
- **Node.js**: v18.0.0 or higher
- **Python**: v3.10 or higher
- **Git**: Installed
- **MongoDB**: Active local instance or MongoDB Atlas Connection String

---

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/bg-remover.git
cd bg-remover
```

---

### **2. Setup & Start the Backend (FastAPI)**

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Create a Python virtual environment:
   ```bash
   # On Windows:
   python -m venv venv
   
   # On macOS/Linux:
   python3 -m venv venv
   ```

3. Activate the virtual environment:
   ```bash
   # On Windows (PowerShell):
   .\venv\Scripts\Activate.ps1

   # On Windows (CMD):
   .\venv\Scripts\activate.bat

   # On macOS/Linux:
   source venv/bin/activate
   ```

4. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Create a `.env` file in the `backend/` directory:
   ```env
   FRONTEND_URL=http://localhost:3000
   ```

6. Run the FastAPI development server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```
   The backend API will start running at `http://127.0.0.1:8000`.

---

### **3. Setup & Start the Frontend (Next.js)**

1. Open a new terminal window and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install Node modules:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `frontend/` directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   AUTH_SECRET=your_nextauth_secret_key
   NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
   ```

4. Run the Next.js development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
   ```text
   http://localhost:3000
   ```

---

## 🔑 Environment Variables Reference

### **Frontend Environment (`frontend/.env`)**

| Variable | Description | Example |
| :--- | :--- | :--- |
| `MONGODB_URI` | Connection URI for MongoDB Atlas or local MongoDB database | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` |
| `AUTH_SECRET` | Secret key for signing NextAuth JWT tokens | `super-secret-key-32-chars` |
| `NEXT_PUBLIC_API_URL` | URL of the Python FastAPI backend server | `http://127.0.0.1:8000` |

### **Backend Environment (`backend/.env`)**

| Variable | Description | Example |
| :--- | :--- | :--- |
| `FRONTEND_URL` | Frontend URL allowed by FastAPI CORS middleware | `http://localhost:3000` |

---

## 🔌 API Endpoints

### **FastAPI Backend (`http://127.0.0.1:8000`)**

#### `GET /`
Health check endpoint to verify backend server status.
- **Response**: `{"message": "BG Removal API is running"}`

#### `POST /remove-background`
Processes an uploaded image file and returns the transparent background-removed PNG.
- **Content-Type**: `multipart/form-data`
- **Body**: `file` (Image file: `.png`, `.jpg`, `.jpeg`, `.webp`)
- **Response**: `image/png` (Binary stream)

---

## Made by Shuhel Ahmed
