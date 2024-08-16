const db = require("../config/db");
const mysql = require("mysql2");

const createDistrict = (req, res) => {
  const { name, region_id } = req.body;
  const query = "INSERT INTO District (name, region_id) VALUES (?, ?)";
  db.query(query, [name, region_id], (err, result) => {
    if (err) {
      console.error("Error creating district:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    res
      .status(201)
      .json({
        message: "District created successfully",
        districtId: result.insertId,
      });
  });
};

const getDistricts = (req, res) => {
  const query = "SELECT * FROM District";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching districts:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    res.json({ message: "OK", data: result });
  });
};

const updateDistrict = (req, res) => {
  const { id } = req.params;
  const { name, region_id } = req.body;
  const query = "UPDATE District SET name = ?, region_id = ? WHERE id = ?";
  db.query(query, [name, region_id, id], (err, result) => {
    if (err) {
      console.error("Error updating district:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.affectedRows > 0) {
      res.json({ message: "District updated successfully" });
    } else {
      res.status(404).json({ message: "District not found" });
    }
  });
};

const deleteDistrict = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM District WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting district:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.affectedRows > 0) {
      res.json({ message: "District deleted successfully" });
    } else {
      res.status(404).json({ message: "District not found" });
    }
  });
};


module.exports = {
  createDistrict,
  getDistricts,
  updateDistrict,
  deleteDistrict
}