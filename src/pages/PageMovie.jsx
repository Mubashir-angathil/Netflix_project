import React, { Suspense, lazy } from "react";
const MovieView = lazy(() => import("../components/movie-view/MovieView.jsx"));
// import MovieView from "../components/movie-view/MovieView";

const PageMovie = () => (
  <div>
    <Suspense fallback={<>Loading...</>}>
      <MovieView />
    </Suspense>
  </div>
);

export default PageMovie;
