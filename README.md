# 🖥️ Custom Homepage Dashboard

A clean, self-hosted web dashboard for your homelab, powered by HTML, CSS, and JavaScript — packaged in a lightweight Debian-based Docker container.

Built for extensibility, speed, and style.

---

## ✨ Features

- 🧭 Responsive dashboard layout (CSS Grid)
- 🌙 Dark theme (Nordic Nightfall)
- ⏰ Live digital clock in sticky navbar
- 📦 Dockerized using Debian + Node.js + http-server
- 🔌 Widget placeholders ready for:
  - Weather display
  - Jellyseerr search
  - Docker container stats
  - System info
  - Terminal (ttyd)

---

## 🗂️ Project Structure

custom-homepage/
├── public/
│   ├── index.html      # Main UI layout
│   ├── style.css       # Custom dark theme
│   └── script.js       # Clock + dynamic widgets
├── Dockerfile          # Debian + Node.js container
└── docker-compose.yml  # One-command deployment

---

## 🚀 Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/seantylermcdonald/homepage.git
   cd homepage

2. **Build & Run with 


3.	Visit your dashboard
	•	http://localhost:8080

---

🔧 Configuration (Coming Soon)

Widget settings will soon be managed via a config.js file:

 const HOMEPAGE_CONFIG = {
   weatherApiKey: "your-api-key",
   weatherLocation: "Sacramento,CA,US",
   jellyseerrUrl: "http://your-jellyseerr.local",
   jellyseerrApiKey: "your-api-key"
 };



📌 Todo & Planned Features
	•	🌤️ Weather widget using OpenWeatherMap API
	•	🔍 Jellyseerr inline search with request support
	•	🐳 Docker container stats
	•	📈 CPU, RAM, Disk usage
	•	⏱️ System uptime and load average
	•	🖥️ Embedded ttyd terminal
	•	🔄 Auto-refresh logic per widget
	•	🌗 Dark/light mode toggle
	•	🔐 Authentication (for public-facing dashboards)