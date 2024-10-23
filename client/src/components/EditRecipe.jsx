import React, { useEffect, useState } from "react";
import axios from "axios";

const EditRecipe = ({ recipe, onUpdate, onClose }) => {
  const [title, setTitle] = useState(recipe.title);
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [instructions, setInstructions] = useState(recipe.instructions);
  const [image, setImage] = useState(null);

  useEffect(() => {
    setTitle(recipe.title);
    setIngredients(recipe.ingredients);
    setInstructions(recipe.instructions);
    setImage(null); // Reset image for new uploads
  }, [recipe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("ingredients", ingredients);
    formData.append("instructions", instructions);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.put(
        `http://localhost:8000/api/recipes/${recipe.id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  return (
    <div style={modalStyle}>
      <div style={formStyle}>
        <button style={closeButtonStyle} onClick={onClose}>
          X
        </button>
        <h3>Edit Recipe</h3>
        {recipe.image && (
          <img
            src={`http://localhost:8000${recipe.image}`}
            alt={recipe.title}
            style={imagePreviewStyle}
          />
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
            style={inputStyle}
          />
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Ingredients"
            required
            style={textareaStyle}
          />
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Instructions"
            required
            style={textareaStyle}
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            style={fileInputStyle}
          />
          <button type="submit" style={submitButtonStyle}>
            Update Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

// Styles
const modalStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.85)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const formStyle = {
  backgroundColor: "#fff",
  padding: "40px",
  borderRadius: "10px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
  position: "relative",
  width: "90%",
  maxWidth: "600px",
  overflowY: "auto",
  maxHeight: "90%", // Allows scrolling if the content is too long
};

const closeButtonStyle = {
  position: "absolute",
  top: "15px",
  right: "15px",
  backgroundColor: "#ff3b3b",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  padding: "5px 10px",
  cursor: "pointer",
  fontSize: "16px",
};

const imagePreviewStyle = {
  maxWidth: "100%",
  height: "auto",
  marginBottom: "10px",
  borderRadius: "5px",
};

const inputStyle = {
  width: "100%",
  padding: "15px",
  marginBottom: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  fontSize: "16px",
};

const textareaStyle = {
  width: "100%",
  padding: "15px",
  marginBottom: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  fontSize: "16px",
  height: "100px",
  resize: "none",
};

const fileInputStyle = {
  marginBottom: "10px",
  padding: "10px",
};

const submitButtonStyle = {
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  padding: "15px 20px",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  width: "100%",
};

export default EditRecipe;
