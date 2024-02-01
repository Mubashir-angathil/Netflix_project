import React from "react";
import NavBarComponent from "../components/nav-bar/NavBarComponent";
import BannerComponent from "../components/banner/BannerComponent.jsx";
import RowPostersComponent from "../components/row-post/RowPostersComponent";
import { services } from "../services/api/Services";

function PageHome() {
  return (
    <div>
      {/* Navigation Bar Component */}
      <NavBarComponent />

      {/* Banner Component */}
      <BannerComponent />

      {/* RowPosters Components for Different Movie Categories */}
      <RowPostersComponent
        api={services.getNetflixOriginals}
        title="Popular on Netflix"
      />
      <RowPostersComponent
        api={() => services.getMovies({ with_genres: 28 })}
        title="Action Movies"
        isSmall
      />
      <RowPostersComponent
        api={() => services.getMovies({ with_genres: 878, page: 2 })}
        title="Science Fiction"
        isSmall
      />
      <RowPostersComponent
        api={() => services.getMovies({ with_genres: 27 })}
        title="Horror"
        isSmall
      />
      <RowPostersComponent
        api={services.getMollyWoodMovies}
        title="Malayalam Movies"
        isSmall
      />
    </div>
  );
}

export default PageHome;
