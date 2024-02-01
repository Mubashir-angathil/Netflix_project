import React from "react";
import { services } from "../../services/api/Services";
import { configs } from "../../utils/configs/Configs";
import "./Banner.css"

// BannerComponent: Rotating movie banner with dynamic background image
const BannerComponent = () => {
  const [movie, setMovie] = React.useState();
  const [movieQueue, setMovieQueue] = React.useState([]);

  // Shifts the movie queue to create a rotating effect
  const shiftMovieQueue = () => {
    setMovieQueue((prevMovies) => {
      const updatedMovies = [...prevMovies];
      if (updatedMovies && updatedMovies.length > 1) {
        const currentMovie = updatedMovies.shift();
        updatedMovies.push(currentMovie);
        setMovie(updatedMovies[updatedMovies.length - 1]);
      }

      return updatedMovies;
    });
  };

  // Fetches trending movies and initializes the movie queue
  React.useEffect(() => {
    services
      .getTrendingMovies()
      .then((res) => {
        setMovieQueue(res.data.results);
        shiftMovieQueue();
      })
      .catch((err) => console.log(err));
  }, []);

  // Sets up a timer to shift the movie queue at regular intervals
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      shiftMovieQueue();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  // Updates the banner and queue appearance on movie change
  React.useEffect(() => {
    const bannerElement = document.querySelector(".banner");
    const queueElement = document.querySelector(".queue");

    bannerElement.classList.add("animated-banner-setting");
    queueElement.firstChild?.classList.add("active");
    bannerElement.style.backgroundImage = `url(${
      configs.imageUrl +
      (movieQueue && movieQueue.length > 0
        ? movieQueue[movieQueue.length - 1].backdrop_path
        : "")
    })`;

    const onAnimationEnd = () => {
      bannerElement.classList.remove("animated-banner-setting");

      queueElement.firstChild?.classList.remove("active");
      bannerElement.removeEventListener("animationend", onAnimationEnd);
    };

    bannerElement.addEventListener("animationend", onAnimationEnd);

    return () => {
      bannerElement.removeEventListener("animationend", onAnimationEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie]);

  // Handles a click on the queue item to change the banner
  const handleBannerChange = (movie) => {
    setMovieQueue((prevMovies) => {
      let updatedMovies = [...prevMovies];
      if (updatedMovies && updatedMovies.length > 1) {
        updatedMovies = updatedMovies.filter((item) => item.id !== movie.id);
        updatedMovies.push(movie);
        setMovie(movie);
      }

      return updatedMovies;
    });
  };

  return (
    <div className="banner-container">
      <div className="banner">
        <div className="content">
          <h1 className="title">
            {movie ? (movie.title ? movie.title : movie.name) : ""}
          </h1>
          <div className="banner_buttons">
            <button className="button">Play</button>
            <button className="button">My List</button>
          </div>
          <p className="description mt-2">
            {movie ? movie.overview : "Description"}
          </p>
        </div>
        <div className="fade_bottom"></div>
      </div>
      <div className="queue col-12 col-md-7">
        {movieQueue?.map((movie, index) => (
          <div
            key={index}
            onClick={() => {
              if (movieQueue.length !== index + 1) handleBannerChange(movie);
            }}
            className="queue-item"
          >
            <img
              className="upcoming-img"
              src={configs.imageUrl + movie.backdrop_path}
              alt={`img-${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerComponent;
