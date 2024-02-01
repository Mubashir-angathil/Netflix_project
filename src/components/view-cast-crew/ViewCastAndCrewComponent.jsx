import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { configs } from "../../utils/configs/Configs";
import "./ViewCastAndCrew.css";
import { services } from "../../services/api/Services";

const ViewCastAndCrewComponent = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState();
  const [movieCredits, setMovieCredits] = useState();

  React.useEffect(() => {
    // Fetch movie details and credits when the component mounts
    if (!params?.movieId) navigate("/", { replace: true });
    else {
      Promise.all([
        services.getMovieDetails(params.movieId),
        services.getMovieCredits(params.movieId),
      ])
        .then(async (response) => {
          if (response[0].status === 200) {
            setMovie(response[0].data);
          }
          if (response[1].status === 200) {
            setMovieCredits(response[1].data);
          }
        })
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div>
      {/* Movie title header */}
      <div>
        <div
          className="flex movie-title-header"
          style={{
            backgroundImage: `linear-gradient(to right,
      rgba(0,0,0,0.74),rgba(0,0,0,0.74)), url(${configs.imageUrl.concat(
        movie?.backdrop_path
      )})`,
          }}
        >
          <div className="movie-title-header-content-wrapper ps-5">
            {/* Movie poster */}
            <img
              src={`${configs.imageUrl.concat(movie?.poster_path)}`}
              alt="poster"
              className="rounded"
            />
            {/* Movie title and back button */}
            <div className="d-flex align-items-start text-light flex-column justify-content-center">
              <h2 className="ms-3">{movie?.title}</h2>
              <span
                className="btn fw-bold"
                style={{ color: "rgb(167, 167, 167)" }}
                onClick={() => navigate(-1)}
              >
                &laquo; Back to main
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Cast and Crew information */}
      <div className="gap-2 p-md-5 p-4 row d-flex justify-content-center rounded">
        {/* All Casts */}
        <div className="col">
          <h3>
            All Casts
            <span>
              {movieCredits?.cast?.length > 0 &&
                ` (${movieCredits?.cast.length})`}
            </span>
          </h3>
          {movieCredits?.cast.map((cast) => (
            <div key={cast.id} className="profileItem d-flex p-2 gap-3">
              {/* Cast profile image */}
              <img
                src={
                  cast.profile_path
                    ? configs.imageUrl.concat(cast.profile_path)
                    : "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg"
                }
                alt="profile"
              />
              <div>
                <h6>{cast.name}</h6>
                <p>{cast.character}</p>
              </div>
            </div>
          ))}
        </div>

        {/* All Crews */}
        <div className="col">
          <h3>
            All Crews{" "}
            <span>
              {movieCredits?.crew?.length > 0 &&
                `(${movieCredits?.crew.length})`}
            </span>
          </h3>
          {movieCredits?.crew.map((crew) => (
            <div
              key={crew.id.toString().concat(crew.job)}
              className="profileItem d-flex p-2 gap-3"
            >
              {/* Crew profile image */}
              <img
                src={
                  crew.profile_path
                    ? configs.imageUrl.concat(crew.profile_path)
                    : "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg"
                }
                alt="profile"
              />
              <div>
                <h6>{crew.name}</h6>
                <p>{crew.job}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewCastAndCrewComponent;
