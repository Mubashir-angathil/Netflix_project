import React from "react";
import NavBar from "./components/navBar/NavBar";
import Banner from "./components/Banner/Banner";
import RowPosters from "./components/RowPost/RowPosters";
import "./App.css";

import { Services } from "./services/api/Services";
function App() {
  return (
    <div sx={{ border: "1px solid red" }}>
      <NavBar />
      <Banner />
      <RowPosters
        api={Services.getNetflixOriginals}
        title="Popular on Netflix"
      />
      <RowPosters
        api={() =>
          Services.getMovies({
            with_genres: 28,
          })
        }
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
}

export default App;
