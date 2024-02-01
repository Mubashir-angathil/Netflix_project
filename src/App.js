import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageHome from "./pages/PageHome";
import PageMovie from "./pages/PageMovie";
import "./App.css";
import PageCastAndCrew from "./pages/PageCastAndCrew";

function App() {
  return (
    // BrowserRouter provides the navigation context for the app
    <BrowserRouter>
      {/* Routes component defines the routes of the application */}
      <Routes>
        {/* Route for the home page */}
        <Route index element={<PageHome />} />

        {/* Route for individual movies with nested routes for different pages */}
        <Route path="movie/:movieId">
          {/* Nested route for the movie details page */}
          <Route index element={<PageMovie />} />

          {/* Nested route for the cast and crew page */}
          <Route path="credits" element={<PageCastAndCrew />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
