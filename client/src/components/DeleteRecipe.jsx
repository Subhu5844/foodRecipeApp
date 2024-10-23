import React from "react";
import axios from "axios";

const DeleteRecipe = ({ recipeId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/recipes/${recipeId}/`);
      onDelete(recipeId);
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <button onClick={handleDelete} style={deleteButtonStyle}>
      Delete Recipe
    </button>
  );
};

const deleteButtonStyle = {
  backgroundColor: "red",
  color: "white",
  border: "none",
  padding: "5px 10px",
  borderRadius: "5px",
  cursor: "pointer",
};

export default DeleteRecipe;
