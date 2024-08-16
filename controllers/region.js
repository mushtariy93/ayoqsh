
const db = require("../config/db");

const createRegion = (req, res) => {
  const { name } = req.body;
  const query = "INSERT INTO Region (name) VALUES (?)";
  db.query(query, [name], (err, result) => {
    if (err) {
      console.error("Error creating region:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    res
      .status(201)
      .json({
        message: "Region created successfully",
        regionId: result.insertId,
      });
  });
};

const getRegions = (req, res) => {
  const query = "SELECT * FROM Region";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching regions:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    res.json({ message: "OK", data: result });
  });
};

const updateRegion = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const query = "UPDATE Region SET name = ? WHERE id = ?";
  db.query(query, [name, id], (err, result) => {
    if (err) {
      console.error("Error updating region:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.affectedRows > 0) {
      res.json({ message: "Region updated successfully" });
    } else {
      res.status(404).json({ message: "Region not found" });
    }
  });
};

const deleteRegion = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM Region WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting region:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.affectedRows > 0) {
      res.json({ message: "Region deleted successfully" });
    } else {
      res.status(404).json({ message: "Region not found" });
    }
  });
};

module.exports = {
    createRegion,
    getRegions,
    updateRegion,
    deleteRegion
}