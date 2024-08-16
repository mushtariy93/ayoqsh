const db = require("../config/db");

const db = require("../config/db");

const createLocation = (req, res) => {
  const { latitude, longitude } = req.body;
  const query = "INSERT INTO Location (latitude, longitude) VALUES (?, ?)";
  db.query(query, [latitude, longitude], (err, result) => {
    if (err) {
      console.error("Error creating location:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    res
      .status(201)
      .json({
        message: "Location created successfully",
        locationId: result.insertId,
      });
  });
};

const getLocations = (req, res) => {
  const query = "SELECT * FROM Location";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching locations:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    res.json({ message: "OK", data: result });
  });
};

const updateLocation = (req, res) => {
  const { id } = req.params;
  const { latitude, longitude } = req.body;
  const query = "UPDATE Location SET latitude = ?, longitude = ? WHERE id = ?";
  db.query(query, [latitude, longitude, id], (err, result) => {
    if (err) {
      console.error("Error updating location:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.affectedRows > 0) {
      res.json({ message: "Location updated successfully" });
    } else {
      res.status(404).json({ message: "Location not found" });
    }
  });
};

const deleteLocation = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM Location WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting location:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.affectedRows > 0) {
      res.json({ message: "Location deleted successfully" });
    } else {
      res.status(404).json({ message: "Location not found" });
    }
  });
};

module.exports = {
  createLocation,
  getLocations,
  updateLocation,
  deleteLocation
}