import React, { useEffect, useState } from "react";
import axios from "axios";
import EditRecipe from "./EditRecipe";
import DeleteRecipe from "./DeleteRecipe";

const ListAllRecipe = ({ searchTerm }) => {
  // Accept searchTerm as a prop
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingRecipe, setEditingRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/recipes/");
        setRecipes(response.data.reverse());
        console.log("this is recipe ", recipes);
      } catch (error) {
        setError("Failed to fetch recipes. Please try again.");
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleUpdate = (updatedRecipe) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    );
    setEditingRecipe(null); // Close the edit form
  };

  const handleDelete = (recipeId) => {
    setRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe.id !== recipeId)
    );
  };

  if (loading) {
    return <p>Loading recipes...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Filter recipes based on the search term
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={recipeListStyle}>
      <h2>Recipe List</h2>
      <ul style={ulStyle}>
        {filteredRecipes.map((recipe) => (
          <li key={recipe.id} style={liStyle}>
            {recipe.image && (
              <img
                src={`http://localhost:8000${recipe.image}`}
                alt={recipe.title}
                style={imageStyle}
              />
            )}
            <h3>{recipe.title}</h3>
            <p>
              <strong>Ingredients:</strong> {recipe.ingredients}
            </p>
            <p>
              <strong>Instructions:</strong> {recipe.instructions}
            </p>
            <p>
              <em>
                Created at: {new Date(recipe.created_at).toLocaleString()}
              </em>
            </p>
            <button onClick={() => setEditingRecipe(recipe)}>
              Edit Recipe
            </button>
            <DeleteRecipe recipeId={recipe.id} onDelete={handleDelete} />
          </li>
        ))}
      </ul>
      {editingRecipe && (
        <EditRecipe
          recipe={editingRecipe}
          onUpdate={handleUpdate}
          onClose={() => setEditingRecipe(null)}
        />
      )}
    </div>
  );
};

// Styling for the RecipeList component
const recipeListStyle = {
  textAlign: "center",
  marginTop: "30px",
  padding: "20px",
  backgroundColor: "#f9f9f9",
  borderRadius: "10px",
  width: "80%",
  margin: "auto",
};

const ulStyle = {
  listStyleType: "none",
  padding: 0,
};

const liStyle = {
  border: "1px solid #ccc",
  borderRadius: "5px",
  padding: "10px",
  margin: "10px 0",
  backgroundColor: "#fff",
};

const imageStyle = {
  maxWidth: "200px",
  height: "auto",
  display: "block",
  margin: "10px auto",
};

export default ListAllRecipe;
