import React, { useState, useEffect } from "react";
import EntryForm from "./EntryForm";
import EntryList from "./EntryList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";

function App() {
  // State to store the list of entries
  const [entries, setEntries] = useState([]);
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible((state) => !state);
  };

  // Fetch data from the server
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api");
      setEntries(response.data.message); // Assuming 'message' contains the entries
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  // UseEffect to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Callback to refresh the entries list after submitting a new entry
  const handleNewEntry = () => {
    fetchData(); // Re-fetch the entries list after a new entry is posted
  };

  // Callback to delete an entry and update the state
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/${id}`);
      console.log("Item deleted:", response.data);

      // Update the state by filtering out the deleted entry
      const updatedEntries = entries.filter((entry) => entry.ID !== id);
      setEntries(updatedEntries); // Update the state with the remaining entries
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  return (
    <div className="App container-sm">
      <h1 className="journal-heading">My Journal</h1>
      <button onClick={handleClick} className="create-btn">
        Create New
      </button>
      {visible && <EntryForm onNewEntry={handleNewEntry} />}
      <EntryList entries={entries} onDelete={handleDelete} />
    </div>
  );
}

export default App;
