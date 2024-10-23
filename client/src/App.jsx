import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Use Routes instead of Switch
import Header from "./components/Header";
import ListAllRecipe from "./components/ListAllRecipe";
import AddRecipe from "./components/AddRecipePage"; // Assuming you have this component
import Home from "./components/HomePage"; // Assuming you have a Home component

const  App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Router>
      <div className="App">
        <Header setSearchTerm={setSearchTerm} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/recipes"
            element={<ListAllRecipe searchTerm={searchTerm} />}
          />
          <Route path="/add-recipe" element={<AddRecipe />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
