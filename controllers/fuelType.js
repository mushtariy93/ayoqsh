const db = require("../config/db");

const createFuelType = (req, res) => {
  const { type } = req.body;
  const query = "INSERT INTO FuelType (type) VALUES (?)";
  db.query(query, [type], (err, result) => {
    if (err) {
      console.error("Error creating fuel type:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    res
      .status(201)
      .json({
        message: "Fuel type created successfully",
        fuelTypeId: result.insertId,
      });
  });
};

const getFuelTypes = (req, res) => {
  const query = "SELECT * FROM FuelType";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching fuel types:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    res.json({ message: "OK", data: result });
  });
};

const updateFuelType = (req, res) => {
  const { id } = req.params;
  const { type } = req.body;
  const query = "UPDATE FuelType SET type = ? WHERE id = ?";
  db.query(query, [type, id], (err, result) => {
    if (err) {
      console.error("Error updating fuel type:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.affectedRows > 0) {
      res.json({ message: "Fuel type updated successfully" });
    } else {
      res.status(404).json({ message: "Fuel type not found" });
    }
  });
};

const deleteFuelType = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM FuelType WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting fuel type:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.affectedRows > 0) {
      res.json({ message: "Fuel type deleted successfully" });
    } else {
      res.status(404).json({ message: "Fuel type not found" });
    }
  });
};

module.exports = {
  createFuelType,
  getFuelTypes,
  updateFuelType,
  deleteFuelType
}