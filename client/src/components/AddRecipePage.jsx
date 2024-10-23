import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddRecipePage = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState(null); // Updated to null
  const [message, setMessage] = useState(""); // To show success or error messages

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("ingredients", ingredients);
    formData.append("instructions", instructions);
    formData.append("image", image); // This will now handle file

    try {
      const response = await axios.post(
        "http://localhost:8000/api/recipes/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Recipe added successfully:", response.data);
      setMessage("Recipe added successfully!");

      navigate("/recipes");
    } catch (error) {
      console.error("There was an error adding the recipe:", error);
      setMessage("Failed to add the recipe. Please try again.");
    }
  };

  return (
    <div style={addRecipePageStyle}>
      <h2>Add a New Recipe</h2>
      {message && <p>{message}</p>} {/* Display success/error message */}
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputGroupStyle}>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label>Ingredients:</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
            style={textareaStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label>Instructions:</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
            style={textareaStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label>Image (optional):</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>
          Add Recipe
        </button>
      </form>
    </div>
  );
};

// Styling for the AddRecipePage component
const addRecipePageStyle = {
  textAlign: "center",
  marginTop: "30px",
  padding: "20px",
  backgroundColor: "#f9f9f9",
  borderRadius: "10px",
  width: "80%",
  margin: "auto",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "15px",
  maxWidth: "500px",
  margin: "auto",
};

const inputGroupStyle = {
  width: "100%",
  textAlign: "left",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  marginTop: "5px",
};

const textareaStyle = {
  ...inputStyle,
  height: "100px",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default AddRecipePage;
