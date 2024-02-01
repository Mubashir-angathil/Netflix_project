import React from "react";
import NavBar from "../components/nav-bar/NavBar";
import RowPosters from "../components/row-post/RowPosters";
import { Services } from "../services/api/Services";
import Banner from "../components/banner/Banner";

const PageHome = () => {
  return (
    <div>
      {/* Navigation Bar Component */}
      <NavBar />

      {/* Banner Component */}
      <Banner />

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
