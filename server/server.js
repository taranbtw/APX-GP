const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const {
  getPositions,
  getDrivers,
  getSessions,
  getCurrentSession,
  getTelemetry,
  getCurrentDrivers,
} = require("./services/openf1");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.use(cors());
app.use(express.json());

let cachedDrivers = null;
let cachedLeaderboard = [];
let cachedSession = null;

async function getCachedDrivers() {
  if (cachedDrivers) {
    return cachedDrivers;
  }

  cachedDrivers = await getDrivers();

  console.log("Drivers Cached");

  return cachedDrivers;
}

app.get("/api", (req, res) => {
  res.json({
    status: "OK",
    message: "APX-GP Server Running!",
  });
});

app.get("/api/live", async (req, res) => {
  try {
    if (cachedLeaderboard.length === 0) {
      return res.status(503).json({
        message: "Leaderboard loading...",
      });
    }

    res.json({
      session: cachedSession,
      leaderboard: cachedLeaderboard,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch live data",
    });
  }
});

app.get("/api/driver/:number", async (req, res) => {
  try {
    const drivers = await getCachedDrivers();

    const driver = drivers.find((d) => d.driver_number == req.params.number);

    if (!driver) {
      return res.status(404).json({
        message: "Driver not found",
      });
    }

    res.json(driver);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch driver",
    });
  }
});

app.get("/api/drivers", async (req, res) => {
  try {
    const drivers = await getCurrentDrivers();

    res.json(drivers);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch drivers",
    });
  }
});

app.get("/api/telemetry/:driver", async (req, res) => {
  try {
    const telemetry = await getTelemetry(req.params.driver);

    console.log(
      `Telemetry loaded for Driver ${req.params.driver}:`,
      telemetry.length,
    );

    res.json(telemetry);
  } catch (error) {
    console.error(
      "Telemetry Error:",
      error.response?.data || error.message || error,
    );

    res.status(500).json({
      message: "Failed to fetch telemetry",
    });
  }
});



async function broadcastLeaderboard() {
  try {
    const currentSession = await getCurrentSession();

    if (!currentSession) {
      console.log("No active session found");
      return;
    }

    const positions = await getPositions(currentSession.session_key);

    if (!positions.length) {
      console.log("No position data available");
      return;
    }

    const drivers = await getCachedDrivers();

    const driverMap = {};

    drivers.forEach((driver) => {
      driverMap[driver.driver_number] = driver;
    });

    const latestPositions = {};

    positions.forEach((position) => {
      const existing = latestPositions[position.driver_number];

      if (!existing || new Date(position.date) > new Date(existing.date)) {
        latestPositions[position.driver_number] = position;
      }
    });

    const leaderboard = Object.values(latestPositions)
      .sort((a, b) => a.position - b.position)
      .map((position) => ({
        position: position.position,
        driver_number: position.driver_number,
        driver_name: driverMap[position.driver_number]?.full_name || "Unknown",
        acronym: driverMap[position.driver_number]?.name_acronym || "---",
        team: driverMap[position.driver_number]?.team_name || "Unknown",
      }));

    cachedSession = {
      name: currentSession.session_name,
      circuit: currentSession.circuit_short_name,
      country: currentSession.country_name,
    };

    cachedLeaderboard = leaderboard;

    io.emit("leaderboardUpdate", {
      session: cachedSession,
      leaderboard: cachedLeaderboard,
    });

    console.log(`Leaderboard Sent (${leaderboard.length} drivers)`);
  } catch (error) {
    console.error(
      "Socket Error:",
      error.response?.data || error.message || error,
    );
  }
}

io.on("connection", (socket) => {
  console.log("Client Connected:", socket.id);

  if (cachedLeaderboard.length > 0) {
    socket.emit("leaderboardUpdate", {
      session: cachedSession,
      leaderboard: cachedLeaderboard,
    });
  }

  socket.on("disconnect", () => {
    console.log("Client Disconnected");
  });
});

setInterval(() => {
  broadcastLeaderboard();
}, 10000);

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await broadcastLeaderboard();

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Startup Error:", error);
  }
}

startServer();
