const express = require("express");
const cors = require("cors");
require("dotenv").config();

const {
  getPositions,
  getDrivers,
  getSessions,
  getCurrentSession,
} = require("./services/openf1");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({
    status: "OK",
    message: "APX-GP Server Running!",
  });
});

app.get("/api/positions", async (req, res) => {
  const positions = await getPositions();

  res.json(positions);
});

app.get("/api/live", async (req, res) => {
  try {
    const positions = await getPositions();
    const drivers = await getDrivers();
    const sessions = await getSessions();

    const latestSessionKey = positions.reduce(
      (max, position) =>
        position.session_key > max ? position.session_key : max,
      positions[0].session_key,
    );

    const currentSession = sessions.find(
      (session) => session.session_key === latestSessionKey,
    );

    const sessionPositions = positions.filter(
      (position) => position.session_key === latestSessionKey,
    );

    console.log("Latest Session Key:", latestSessionKey);
    console.log("Total Positions:", positions.length);
    console.log("Session Positions:", sessionPositions.length);

    const driverMap = {};

    drivers.forEach((driver) => {
      driverMap[driver.driver_number] = driver;
    });

    const latestPositions = {};

    sessionPositions.forEach((position) => {
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

    console.log("Leaderboard Preview:");
    console.log(leaderboard.slice(0, 10));

    res.json({
      session: {
        name: currentSession?.session_name || "Unknown",
        circuit: currentSession?.circuit_short_name || "Unknown",
        country: currentSession?.country_name || "Unknown",
      },
      leaderboard,
    });
  } catch (error) {
    console.error("FULL ERROR:");
    console.error(error.response?.data || error.message || error);

    res.status(500).json({
      message: "Failed to fetch live data",
    });
  }
});

app.get("/api/test", async (req, res) => {
  const positions = await getPositions();

  res.json(positions.slice(0, 5));
});

app.get("/api/session", async (req, res) => {
  const sessions = await getSessions();

  res.json(sessions.slice(-5));
});

app.get("/api/debug", async (req, res) => {
  const positions = await getPositions();

  const sessionCounts = {};

  positions.forEach((position) => {
    sessionCounts[position.session_key] =
      (sessionCounts[position.session_key] || 0) + 1;
  });

  res.json(sessionCounts);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
