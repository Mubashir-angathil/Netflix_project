// PageHome.jsx
import React, { Suspense, lazy } from "react";
import NavBarComponent from "../components/nav-bar/NavBarComponent.jsx";
import { services } from "../services/api/Services.js";
import LoadingComponent from "../components/loading/LoadingComponent.jsx";
const BannerComponent = lazy(() =>
  import("../components/banner/BannerComponent.jsx")
);
const RowPosters = lazy(() =>
  import("../components/row-post/RowPostersComponent.jsx")
);

const PageHome = () => {
  return (
    <div>
      {/* Navigation Bar Component */}
      <NavBarComponent />

      {/* Banner Component */}
      <Suspense fallback={<LoadingComponent />}>
        <BannerComponent />

        {/* RowPosters Components for Different Movie Categories */}
        <RowPosters
          api={services.getNetflixOriginals}
          title="Popular on Netflix"
        />
        <RowPosters
          api={() => services.getMovies({ with_genres: 28 })}
          title="Action Movies"
          isSmall
        />
        <RowPosters
          api={() => services.getMovies({ with_genres: 878, page: 2 })}
          title="Science Fiction"
          isSmall
        />
        <RowPosters
          api={() => services.getMovies({ with_genres: 27 })}
          title="Horror"
          isSmall
        />
        <RowPosters
          api={services.getMollyWoodMovies}
          title="Malayalam Movies"
          isSmall
        />
      </Suspense>
    </div>
  );
};

export default PageHome;
