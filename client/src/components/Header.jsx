

import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = ({ setSearchTerm }) => {
  const location = useLocation(); // Get the current location
  const [searchInput, setSearchInput] = React.useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput); // Update the search term
  };

  const isRecipesPage = location.pathname === "/recipes";

  return (
    <header style={headerStyle}>
      <div style={headerContentStyle}>
        <nav style={navStyle}>
          <Link to="/" style={linkStyle}>
            Home
          </Link>
          <Link to="/recipes" style={linkStyle}>
            Recipes
          </Link>
          <Link to="/add-recipe" style={linkStyle}>
            Add Recipe
          </Link>

          {isRecipesPage && (
            <form onSubmit={handleSearch} style={searchFormStyle}>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search recipes..."
                style={searchInputStyle}
              />
              <button type="submit" style={searchButtonStyle}>
                Search
              </button>
            </form>
          )}
        </nav>
      </div>
    </header>
  );
};

// Styles remain unchanged
const headerStyle = {
  backgroundColor: "gray",
  padding: "10px",
};

const headerContentStyle = {
  display: "flex",
  justifyContent: "space-between", // Space between search bar and navigation
  alignItems: "center", // Center items vertically
};

const navStyle = {
  display: "flex",
  gap: "20px", // Space between tags
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "16px",
};

const searchFormStyle = {
  display: "flex",
  alignItems: "center",
  marginLeft: "300px",
};

const searchInputStyle = {
  padding: "5px",
  fontSize: "16px",
  marginRight: "5px",
};

const searchButtonStyle = {
  padding: "5px 10px",
  fontSize: "16px",
};

export default Header;
