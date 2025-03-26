import React, { useState } from "react";
import axios from "axios";

const EntryForm = ({ onNewEntry }) => {
  // State to manage the content of the textarea
  const [inputValue, setInputValue] = useState("");

  // Handle the change in textarea value
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  // Handle form submission and send POST request
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload on form submit
    console.log("Submitted value:", inputValue);

    try {
      // Make the POST request to your API endpoint
      await axios.post("http://localhost:5000/api", {
        message: inputValue, // Send 'message' instead of 'data'
      });

      // Log the response from the server
      console.log("Server response: Data inserted successfully");

      // Optionally clear the textarea after successful submission
      setInputValue("");

      // Call the callback passed as a prop to update the entries list
      onNewEntry();
    } catch (error) {
      // Handle error if request fails
      console.error("There was an error submitting the form:", error);
    }
  };

  return (
    <div className="entry-form-container">
      <form className="entry-form" onSubmit={handleSubmit}>
        <textarea
          className="entry-form-textarea"
          id="entryTextarea"
          value={inputValue}
          onChange={handleChange}
          placeholder="Type something..."
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EntryForm;
