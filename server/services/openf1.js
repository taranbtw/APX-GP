const axios = require("axios");

async function getPositions() {
  const response = await axios.get("https://api.openf1.org/v1/position");

  return response.data;
}

async function getDrivers() {
  const response = await axios.get("https://api.openf1.org/v1/drivers");

  return response.data;
}

async function getSessions() {
  const response = await axios.get("https://api.openf1.org/v1/sessions");

  return response.data;
}

async function getCurrentSession() {
  const positions = await getPositions();

  const latestSessionKey = positions.reduce(
    (max, position) =>
      position.session_key > max ? position.session_key : max,
    positions[0].session_key,
  );

  return latestSessionKey;
}

module.exports = {
  getPositions,
  getDrivers,
  getSessions,
  getCurrentSession,
};
