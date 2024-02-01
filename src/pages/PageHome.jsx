import React from "react";
import { Services } from "../services/api/Services";
import NavBarComponent from "../components/nav-bar/NavBarComponent.jsx";
import BannerComponent from "../components/banner/BannerComponent.jsx";
import RowPosters from "../components/row-post/RowPostersComponent.jsx";

const PageHome = () => {
  return (
    <div>
      {/* Navigation Bar Component */}
      <NavBarComponent />

      {/* Banner Component */}
      <BannerComponent />

      {/* RowPosters Components for Different Movie Categories */}
      <RowPosters
        api={Services.getNetflixOriginals}
        title="Popular on Netflix"
      />
      <RowPosters
        api={() => Services.getMovies({ with_genres: 28 })}
        title="Action Movies"
        isSmall
      />
      <RowPosters
        api={() => Services.getMovies({ with_genres: 878, page: 2 })}
        title="Science Fiction"
        isSmall
      />
      <RowPosters
        api={() => Services.getMovies({ with_genres: 27 })}
        title="Horror"
        isSmall
      />
      <RowPosters
        api={Services.getMollyWoodMovies}
        title="Malayalam Movies"
        isSmall
      />
    </div>
  );
};

export default PageHome;
