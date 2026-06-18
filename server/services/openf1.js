const axios = require("axios");

async function getAllPositions() {
  const response = await axios.get("https://api.openf1.org/v1/position");

  return response.data;
}

async function getPositions(sessionKey) {
  const response = await axios.get(
    `https://api.openf1.org/v1/position?session_key=${sessionKey}`,
  );

  return response.data;
}

async function getDrivers() {
  const response = await axios.get("https://api.openf1.org/v1/drivers");

  const seen = new Set();

  const uniqueDrivers = response.data.filter((driver) => {
    const name = driver.full_name;

    if (!name || seen.has(name)) {
      return false;
    }

    seen.add(name);

    return true;
  });

  uniqueDrivers.sort((a, b) => a.full_name.localeCompare(b.full_name));

  return uniqueDrivers;
}

async function getCurrentDrivers() {
  const currentSession = await getCurrentSession();

  const response = await axios.get(
    `https://api.openf1.org/v1/drivers?session_key=${currentSession.session_key}`,
  );

  return response.data;
}

async function getSessions() {
  const response = await axios.get("https://api.openf1.org/v1/sessions");

  return response.data;
}

let cachedSession = null;

async function getCurrentSession() {
  if (cachedSession) {
    return cachedSession;
  }

  const sessions = await getSessions();

  cachedSession = sessions.reduce((latest, session) =>
    session.session_key > latest.session_key ? session : latest,
  );

  return cachedSession;
}

async function getTelemetry(driverNumber) {
  const currentSession = await getCurrentSession();

  const response = await axios.get(
    `https://api.openf1.org/v1/car_data?session_key=${currentSession.session_key}&driver_number=${driverNumber}`,
  );

  return response.data
    .filter((point) => point.speed > 0 || point.rpm > 0 || point.throttle > 0)
    .slice(-100);
}

module.exports = {
  getAllPositions,
  getPositions,
  getDrivers,
  getCurrentDrivers,
  getSessions,
  getCurrentSession,
  getTelemetry,
};
