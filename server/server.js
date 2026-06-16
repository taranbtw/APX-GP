const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { getPositions, getDrivers } = require("./services/openf1");

const app = express();


app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
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

    const driverMap = {};

    drivers.forEach((driver) => {
      driverMap[driver.driver_number] = driver;
    });

    const leaderboard = positions.slice(0, 20).map((position) => ({
      position: position.position,

      driver_number: position.driver_number,

      driver_name: driverMap[position.driver_number]?.full_name || "Unknown",

      acronym: driverMap[position.driver_number]?.name_acronym || "---",

      team: driverMap[position.driver_number]?.team_name || "Unknown",
    }));

    res.json(leaderboard);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch live data",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})