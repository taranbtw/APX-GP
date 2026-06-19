# 🏎️ ApexGP – Formula 1 Live Analytics Dashboard

ApexGP is a full-stack Formula 1 analytics platform that visualizes real-time race data using the OpenF1 API. It provides live driver standings, session-aware leaderboards, and a scalable backend architecture designed for real-time race tracking and future telemetry expansion.

---

## 🚀 Live Demo
- Frontend: https://apx-gp.vercel.app/  
- Backend: https://apx-gp.onrender.com/

---

## 📸 Features

- 🏁 Live Formula 1 driver standings dashboard
- 📊 Session-aware leaderboard with accurate position tracking
- 🔄 Auto-refreshing UI for near real-time updates
- ⚡ Backend data aggregation with duplicate position handling
- 🌐 REST API for race sessions, drivers, and standings
- 🔌 Socket.io integration (in progress) for real-time updates
- 📱 Fully responsive UI for desktop and mobile

---

## 🛠️ Tech Stack

**Frontend**
- React.js
- Tailwind CSS
- JavaScript (ES6+)

**Backend**
- Node.js
- Express.js

**Real-Time**
- Socket.io (in progress)

**API**
- OpenF1 API

**Deployment**
- Vercel (Frontend)
- Render (Backend)

---

## 🧠 Architecture Overview

- OpenF1 API → Backend (Express.js) → Data normalization layer  
- Backend processes race sessions & removes duplicate position entries using timestamp logic  
- Frontend fetches processed data and renders live leaderboard  
- Socket.io (planned) will push live updates without polling

---

## 📂 Project Structure


ApexGP/
│
├── client/ (React Frontend)
│ ├── src/
│ └── components/
│
├── server/ (Express Backend)
│ ├── routes/
│ ├── controllers/
│ └── utils/
│
└── README.md


---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/apexgp.git
cd apexgp
2. Backend setup
cd server
npm install
npm start
3. Frontend setup
cd client
npm install
npm start
🔮 Future Improvements
🛰️ Real-time telemetry charts per driver
🏎️ Driver profile pages with historical performance
🏆 Podium prediction system using analytics
📡 Full Socket.io live race feed integration
📈 Advanced race insights & strategy visualization
👨‍💻 Author

Taranjeet Singh

GitHub: https://github.com/taranbtw
LinkedIn: https://linkedin.com/in/taranbtw
📜 License

This project is open-source and available under the MIT License.
