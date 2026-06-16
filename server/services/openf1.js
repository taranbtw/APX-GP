const axios = require("axios");

async function getPositions() {
  const response = await axios.get("https://api.openf1.org/v1/position");

  return response.data;
}

async function getDrivers() {
  const response = await axios.get("https://api.openf1.org/v1/drivers");

  return response.data;
}

module.exports = {
  getPositions,
  getDrivers,
};
