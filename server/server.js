const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Add this line to parse JSON request body

// Serve static files (your React app)
app.use(express.static(path.join(__dirname, "../build")));

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "pumpkin69", // Replace with your actual password
  database: "entries", // Your database name
});

// Simple GET route for testing
app.get("/api", (req, res) => {
  pool.query("SELECT * FROM entries", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: results }); // Send the query results as JSON
  });
});

// POST route for inserting entries
app.post("/api", (req, res) => {
  const { message } = req.body; // Retrieve the message from the request body

  if (!message) {
    return res.status(400).send("Message is required");
  }

  // Use parameterized queries to safely insert data
  pool.query(
    "INSERT INTO entries (Entry) VALUES (?)", // Use '?' as a placeholder
    [message], // The value to insert (provided via the request body)
    (err, result) => {
      if (err) {
        console.error("Error executing query:", err.stack);
        return res.status(500).send("Internal Server Error");
      }

      res.status(200).send("Data inserted successfully");
    }
  );
});

// DELETE by ID endpoint
app.delete("/api/:id", (req, res) => {
  const id = req.params.id; // Get the ID from the URL parameters
  console.log(`Attempting to delete entry with ID: ${id}`); // Debugging log

  // Query to delete the entry by ID
  pool.query(
    "DELETE FROM entries WHERE id = ?", // Use '?' as a placeholder for the ID
    [id], // Pass the id as a parameter to the query
    (err, results) => {
      if (err) {
        console.error("Error executing delete query:", err);
        return res.status(500).json({ error: err.message });
      }

      // Check if any rows were affected (deleted)
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Entry not found" });
      }

      // Successfully deleted the entry
      res.json({
        message: "Entry deleted successfully",
        deletedEntryId: id, // Return the deleted entry's ID (or other data if needed)
      });
    }
  );
});

// Catch-all route to serve the React app for any other requests
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
