/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { configs } from "../../utils/configs/Configs";
import { Services } from "../../services/api/Services";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState();
  const [movieQueue, setMovieQueue] = useState([]);

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

  useEffect(() => {
    Services.getTrendingMovies()
      .then((res) => {
        setMovieQueue(res.data.results);
        shiftMovieQueue();
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      shiftMovieQueue();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
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
  }, [movie]);

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
}

export default Banner;
