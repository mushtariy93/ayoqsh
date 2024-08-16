const db = require("../config/db");

const createGasStation = (req, res) => {
  const { name, region_id, district_id, location_id, address, open_hours } =
    req.body;
  const query =
    "INSERT INTO GasStation (name, region_id, district_id, location_id, address, open_hours) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [name, region_id, district_id, location_id, address, open_hours],
    (err, result) => {
      if (err) {
        console.error("Error creating gas station:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      res
        .status(201)
        .json({
          message: "Gas station created successfully",
          gasStationId: result.insertId,
        });
    }
  );
};

const getGasStations = (req, res) => {
  const query = "SELECT * FROM GasStation";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching gas stations:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    res.json({ message: "OK", data: result });
  });
};

const updateGasStation = (req, res) => {
  const { id } = req.params;
  const { name, region_id, district_id, location_id, address, open_hours } =
    req.body;
  const query =
    "UPDATE GasStation SET name = ?, region_id = ?, district_id = ?, location_id = ?, address = ?, open_hours = ? WHERE id = ?";
  db.query(
    query,
    [name, region_id, district_id, location_id, address, open_hours, id],
    (err, result) => {
      if (err) {
        console.error("Error updating gas station:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      if (result.affectedRows > 0) {
        res.json({ message: "Gas station updated successfully" });
      } else {
        res.status(404).json({ message: "Gas station not found" });
      }
    }
  );
};

const deleteGasStation = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM GasStation WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting gas station:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.affectedRows > 0) {
      res.json({ message: "Gas station deleted successfully" });
    } else {
      res.status(404).json({ message: "Gas station not found" });
    }
  });
};


// function


const getNearestAndCheapestGasStation = (req, res) => {
  const { latitude, longitude, fuelType } = req.body;
  const query = `
    SELECT 
      GasStation.name,
      GasPrice.price_per_liter,
      FuelType.type,
      Location.latitude,
      Location.longitude,
      (
        6371 * acos(
          cos(radians(?)) * cos(radians(Location.latitude)) * cos(radians(Location.longitude) - radians(?)) +
          sin(radians(?)) * sin(radians(Location.latitude))
        )
      ) AS distance
    FROM 
      GasStation
    JOIN 
      Location ON GasStation.location_id = Location.id
    JOIN 
      GasPrice ON GasStation.id = GasPrice.gas_station_id
    JOIN 
      FuelType ON GasPrice.fuel_type_id = FuelType.id
    WHERE 
      FuelType.type = ?
    ORDER BY 
      distance ASC, 
      GasPrice.price_per_liter ASC
    LIMIT 1;
  `;
  db.query(query, [latitude, longitude, latitude, fuelType], (err, result) => {
    if (err) {
      console.error("Error fetching nearest and cheapest gas station:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (result.length > 0) {
      res.json({
        message: "Nearest and cheapest gas station found",
        data: result[0], 
      });
    } else {
      res.status(404).json({
        message: "No gas stations found for the specified fuel type",
      });
    }
  });
};

module.exports = {
    createGasStation,
    getGasStations,
    updateGasStation,
    deleteGasStation,
    getNearestAndCheapestGasStation
}