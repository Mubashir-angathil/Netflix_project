import React, { Suspense, lazy } from "react";
const MovieView = lazy(() => import("../components/movie-view/MovieView.jsx"));

const PageMovie = () => (
  <div>
    <Suspense fallback={<>Loading...</>}>
      <MovieView />
    </Suspense>
  </div>
);

export default PageMovie;
