const db = require("../config/db");

const createGasPrice = (req, res) => {
  const { gas_station_id, fuel_type_id, price_per_liter } = req.body;
  const query =
    "INSERT INTO GasPrice (gas_station_id, fuel_type_id, price_per_liter) VALUES (?, ?, ?)";
  db.query(
    query,
    [gas_station_id, fuel_type_id, price_per_liter],
    (err, result) => {
      if (err) {
        console.error("Error creating gas price:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      res
        .status(201)
        .json({
          message: "Gas price created successfully",
          gasPriceId: result.insertId,
        });
    }
  );
};

const getGasPrices = (req, res) => {
  const query = "SELECT * FROM GasPrice";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching gas prices:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    res.json({ message: "OK", data: result });
  });
};

const updateGasPrice = (req, res) => {
  const { id } = req.params;
  const { gas_station_id, fuel_type_id, price_per_liter } = req.body;
  const query =
    "UPDATE GasPrice SET gas_station_id = ?, fuel_type_id = ?, price_per_liter = ? WHERE id = ?";
  db.query(
    query,
    [gas_station_id, fuel_type_id, price_per_liter, id],
    (err, result) => {
      if (err) {
        console.error("Error updating gas price:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      if (result.affectedRows > 0) {
        res.json({ message: "Gas price updated successfully" });
      } else {
        res.status(404).json({ message: "Gas price not found" });
      }
    }
  );
};

const deleteGasPrice = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM GasPrice WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting gas price:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.affectedRows > 0) {
      res.json({ message: "Gas price deleted successfully" });
    } else {
      res.status(404).json({ message: "Gas price not found" });
    }
  });
};

module.exports = {
  createGasPrice,
  getGasPrices,
  updateGasPrice,
  deleteGasPrice
}