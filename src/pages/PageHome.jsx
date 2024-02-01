import React from "react";
import NavBarComponent from "../components/nav-bar/NavBarComponent.jsx";
import RowPosters from "../components/row-post/RowPostersComponent.jsx";
import BannerComponent from "../components/banner/BannerComponent.jsx";
import { services } from "../services/api/Services.js";

const PageHome = () => {
  return (
    <div>
      {/* Navigation Bar Component */}
      <NavBarComponent />

      {/* Banner Component */}
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
    </div>
  );
};

export default PageHome;
