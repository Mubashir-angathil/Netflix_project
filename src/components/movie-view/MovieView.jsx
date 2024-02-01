/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { configs } from "../../utils/configs/Configs";
import "./MovieView.css";
import { useGeneralHook } from "../../utils/hooks/GeneralHook";
import CastCard from "../card/cast-card/CastCard";
import LoadingComponent from "../loading/LoadingComponent";
import { services } from "../../services/api/Services";
import MediaPlayer from "../media-player/MediaPlayer";

const MovieView = () => {
  // Extracting movieId from route parameters
  const params = useParams();
  // Navigation function from react-router-dom
  const navigate = useNavigate();
  // State variables for movie details, credits, casts, crew, runtime, and color
  const [movie, setMovie] = React.useState();
  const [movieCredits, setMovieCredits] = React.useState([]);
  const [topBilledCasts, setTopBilledCasts] = React.useState([]);
  const [providers, setProviders] = React.useState([]);
  const [mainCrew, setMainCrew] = React.useState([]);
  const [movieRuntime, setMovieRuntime] = React.useState("0hr");
  const [modalOpen, setModalOpen] = React.useState(false);

  // Custom hook for calculating average color, runtime, etc.
  const { averageColor, getAverageColor, calculateRuntime } = useGeneralHook();

  // Function to filter main crew based on specified job roles
  const filterMainCrew = (mainCrew) => {
    const formattedCrew = [];
    if (mainCrew.length > 0) {
      const mainJobs = ["Director", "Story", "Screenplay", "Characters"];
      mainCrew
        .filter((crew) => mainJobs.includes(crew.job) && crew)
        .forEach((crew) => {
          const findIndex = formattedCrew.findIndex(
            (value) => value.id === crew.id
          );
          if (findIndex !== -1) {
            const updatedCrew = { ...formattedCrew[findIndex] };
            formattedCrew[findIndex] = {
              ...updatedCrew,
              job: updatedCrew.job.concat(",", crew.job),
            };
          } else {
            const { id, job, name } = crew;
            formattedCrew.push({ id, job, name });
          }
        });
    }
    return formattedCrew;
  };

  // Function to format providers in india with specific format
  const formatProviders = (results) => {
    if (results.length > 0) {
      const providerDetails = [];
      const providersInIndia = Object.entries(results).find(
        (result) => result[0] === "IN"
      );
      Object.entries(providersInIndia[1]).forEach((prov) => {
        if (typeof prov[1] === "object") {
          const isPresent = providerDetails.some(
            (details) => details.provider_id === prov[1].provider_id
          );
          if (!isPresent) providerDetails.push(prov[1]);
        }
      });

      return [providersInIndia[1].link].concat(providerDetails);
    }
    return [];
  };

  // Initial fetch
  React.useEffect(() => {
    // Redirect to home page if movieId is not provided
    if (!params?.movieId) navigate("/", { replace: true });
    else {
      // Fetch movie details, credits, and providers when component mounts
      Promise.all([
        services.getMovieDetails(params.movieId),
        services.getMovieCredits(params.movieId),
        services.getProviders(params.movieId),
      ])
        .then(async (response) => {
          // Set movie details and calculate average color
          if (response[0].status === 200) {
            setMovie(response[0].data);
            await getAverageColor(
              configs.imageUrl.concat(response[0].data.backdrop_path)
            );
          }
          // Set movie credits, top-billed casts, and main crew
          if (response[1].status === 200) {
            setMovieCredits(response[1].data);
            if (response[1].data.cast.length > 10) {
              setTopBilledCasts(response[1].data.cast.slice(0, 10));
            } else {
              setTopBilledCasts(response[1].data.cast);
            }
            if (response[1].data.crew) {
              setMainCrew(filterMainCrew(response[1].data.crew));
            }
          }

          // Set movie credits, top-billed casts, and main crew
          if (response[2].status === 200) {
            setProviders(formatProviders(response[2]?.data?.results));
          }
        })
        .catch((err) => console.error(err));
    }
  }, []);

  // Calculate and set movie runtime when movie details are available
  React.useEffect(() => {
    const { hours, minutes } = calculateRuntime(movie?.runtime);
    if (movie) {
      setMovieRuntime(`${hours}hr ${minutes}m`);
    }
  }, [movie]);

  // Render the component based on the state
  return movie ? (
    <div>
      {/* Movie backdrop section */}
      <div
        className="movie-backdrop p-md-4"
        style={{
          backgroundImage: movie
            ? averageColor
              ? `linear-gradient(to right, 
          rgba(10.5, 31.5, 31.5, 1) calc((50vw - 170px) - 340px),${averageColor} 50%,${averageColor} 100%),
          url(${configs.imageUrl.concat(movie?.backdrop_path)})`
              : `linear-gradient(to right, 
            rgba(10.5, 31.5, 31.5, 1) calc((50vw - 170px) - 340px), rgba(10.5, 31.5, 31.5, 0.84), rgba(10.5, 31.5, 31.5,0.84)),url(${configs.imageUrl.concat(
              movie?.backdrop_path
            )})`
            : "",
        }}
      >
        {/* Movie content wrapper */}
        <div className="movie-content-wrapper">
          {/* Movie poster */}
          <div className="movie-poster">
            <img
              className="mx-4 mb-2"
              src={configs.imageUrl.concat(movie?.poster_path)}
              alt="poster"
              loading="eager"
            />
          </div>
          {/* Movie details content */}
          <div className="movie-content px-4">
            <h1>
              {movie?.original_title} (
              {movie?.release_date &&
                new Date(movie?.release_date).getFullYear()}
              )
            </h1>
            {/* Movie details list */}
            <ul>
              <li>
                {movie?.release_date &&
                  new Date(movie.release_date).toLocaleDateString()}
              </li>
              <li>{movie?.genres?.map((genre) => genre.name).join(", ")}</li>
              <li>{movieRuntime}</li>
            </ul>
            {/* Play trailer button */}
            <span
              className="play mb-2 btn"
              onClick={() => setModalOpen(!modalOpen)}
            >
              <span className="play-icon"></span>
              Play Trailer
            </span>
            {modalOpen && (
              <MediaPlayer
                movieId={movie.id}
                open={modalOpen}
                setOpen={setModalOpen}
              />
            )}
            {/* Movie tagline */}
            <p className="tagline">{movie?.tagline}</p>
            <h6>Overview</h6>
            {/* Movie overview */}
            <p>{movie?.overview}</p>
            {/* Crew details */}
            <div className="crew-wrapper col-12">
              {mainCrew?.map((crew) => {
                return (
                  <div key={crew.id}>
                    {/* Crew member name */}
                    <h6 className="crew-name">{crew.name}</h6>
                    {/* Crew member job designation */}
                    <p className="crew-designation">{crew.job}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* Fade bottom section */}
      <div className="fade-bottom" />

      {/* Providers */}
      {providers[1]?.length > 0 && (
        <div
          className="col-12 px-4"
          style={{ transform: "translate(0px,-45px)" }}
        >
          <h5 className="text-white">Providers</h5>
          <div className="d-flex gap-2 overflow-auto">
            {providers[1]?.map((provider) => {
              return (
                <a
                  title={provider?.provider_name}
                  key={provider?.provider_id}
                  className="provider-card text-white overflow-hidden"
                  href={providers[0]}
                >
                  <img
                    className="img-fluid"
                    src={configs.imageUrl.concat(provider?.logo_path)}
                    alt="logo"
                  />
                </a>
              );
            })}
          </div>
        </div>
      )}
      {/* Top billed cast section */}
      <div className="px-4 mb-5 col-12">
        <h5 className="text-white">Top Billed Cast</h5>
        <div className="d-flex overflow-auto">
          {/* Render top billed cast members */}
          {topBilledCasts?.map((credit, index) => {
            return (
              <span key={credit.id} className="d-flex">
                {/* Render CastCard component */}
                <CastCard
                  url={credit?.profile_path}
                  name={credit?.name}
                  character={credit?.character}
                />
                {/* View More button */}
                {movieCredits.cast.length > topBilledCasts.length &&
                  index === topBilledCasts.length - 1 && (
                    <div
                      className="d-flex text-light align-items-center btn flex-shrink-0"
                      onClick={() => navigate("credits")}
                    >
                      View More &raquo;
                    </div>
                  )}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    // Render LoadingComponent when movie details are not available
    <LoadingComponent />
  );
};

export default MovieView;
