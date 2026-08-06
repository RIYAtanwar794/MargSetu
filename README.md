# 🚀 MargSetu


![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![MongoDB Atlas](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![Google Gemini](https://img.shields.io/badge/AI-Google%20Gemini-4285F4?logo=google&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)


> **Prepare Smarter. Revise Consistently. Crack Interviews Confidently.**

**MargSetu** is a coding interview preparation platform featuring AI-powered mentoring, smart revision, company roadmaps, problem tracking, analytics, and curated learning resources—all in one place.

---

### 🔗 Links

- 🌐 **Live Demo:** https://marg-setu-ochre.vercel.app/

---

## ✨ Features

- **Dashboard** – Personalized preparation overview with real-time progress insights.
- **Problem Tracker** – Track coding problems with CRUD operations, favorites, filters, difficulty levels, and solving time.
- **Smart Revision** – Automated spaced-repetition scheduler to strengthen long-term retention.
- **AI Mentor** – Personalized interview guidance, concept explanations and preparation strategies powered by **Google Gemini**.
- **Company Roadmaps** – Structured interview preparation paths for top product-based companies.
- **Learning Hub** – Curated notes, video lectures, cheat sheets, and interview resources.
- **Analytics** – Topic-wise and difficulty-wise performance insights with visual progress tracking.
- **Authentication** – Secure JWT-based authentication with personalized user profiles.

---


## 🎯 Key Highlights

- AI-powered interview preparation platform
- Smart spaced-repetition revision system
- Personalized AI mentor using Google Gemini
- Company-specific preparation roadmaps
- Responsive and modern UI

---

## 🛠 Tech Stack

**Frontend:** React • Vite • Tailwind CSS • React Router • Axios • Framer Motion • React Hot Toast • Lucide React  
**Backend:** Node.js • Express.js • MongoDB • Mongoose • JWT Authentication • bcrypt  
**AI:** Google Gemini API  
**Deployment:** Vercel • Render • MongoDB Atlas  

---

## 🌟 Future Enhancements

-  AI Mock Interview Simulator
-  Resume Analyzer  
-  Daily Coding Challenges  
-  Community Features


## ⚙️ Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/MargSetu.git
cd MargSetu
```

### 2️⃣ Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd client
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in both **backend** and **client**.

**Backend (.env)**

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**Frontend (.env)**

```env
VITE_API_URL=http://localhost:5000/api
```

### 4️⃣ Run the Project

#### Start Backend

```bash
cd backend
npm run dev
```

#### Start Frontend

```bash
cd client
npm run dev
```

Open your browser and visit **http://localhost:5173**.

> **Note:** Ensure the backend server is running on **http://localhost:5000** before accessing the application.

