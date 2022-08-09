import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { API_KEY, imageUrl } from "../../constants/constants";
import "./Banner.css";
function Banner() {
  const [movie, setMovie] = useState();
  useEffect(() => {
    axios
      .get(`/trending/all/week?api_key=${API_KEY}&language=en-US`)
      .then((res) => {
        console.log(res.data.results[Math.floor(Math.random()*20)]);
        
        setMovie(res.data.results[Math.floor(Math.random()*20)]);
      });
  }, []);

  return (
    <div className="banner col-sm-12 " style={{backgroundImage:`url(${movie?imageUrl+movie.backdrop_path:''})`}}>
      <div className="content">
        <h1 className="title">{movie ?movie.title?movie.title:movie.name : ''}</h1>
        <div className="banner_buttons">
          <button className="button">Play</button>
          <button className="button">Mylist</button>
        </div>
        <h1 className="description">
          {movie ? movie.overview : "Description"}
        </h1>
      </div>
      <div className="fade_bottom"></div>
    </div>
  );
}

export default Banner;
