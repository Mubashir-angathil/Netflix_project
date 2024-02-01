import React from "react";
import ModalComponent from "../modal/ModalComponent";
import { services } from "../../services/api/Services";
import { enqueueSnackbar } from "notistack";

/**
 * MediaPlayer component plays a movie trailer using a modal with an embedded YouTube video.
 * @param {object} props - The component props.
 * @param {string} props.movieId - The ID of the movie for which the trailer is to be played.
 * @param {function} props.setOpen - Function to set the modal's open state.
 * @param {boolean} props.open - The current open state of the modal.
 * @returns {JSX.Element|null} - The JSX for the MediaPlayer component or null if no valid trailer is found.
 */
const MediaPlayer = ({ movieId, setOpen, open }) => {
  // State to store information about the trailer
  const [trailer, setTrailer] = React.useState();

  /**
   * Fetches and plays the trailer for the specified movie.
   * @param {string} movieId - The ID of the movie.
   */
  const handlePlayTrailer = (movieId) => {
    if (movieId) {
      services
        .getMovieRelatedVideos(movieId)
        .then((response) => {
          // Find a trailer with type "TRAILER" and site "YOUTUBE"
          const trailerResponse = response.data.results.find(
            (value) =>
              value.type.toUpperCase() === "TRAILER" &&
              value.site.toUpperCase() === "YOUTUBE"
          );

          if (trailerResponse?.key) {
            // Set the trailer in the component state and open the modal
            setTrailer(trailerResponse);
            return setOpen(true);
          }

          // Display an error message if no valid trailer is found
          enqueueSnackbar({
            message: "Trailer not available",
            variant: "error",
          });
        })
        .catch((err) => console.error(err));
    }
  };

  // Fetch and play the trailer when the component mounts or movieId changes
  React.useEffect(() => {
    if (movieId) {
      handlePlayTrailer(movieId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  // Render the ModalComponent with the YouTube video iframe if a valid trailer is found
  return (
    trailer?.key && (
      <ModalComponent open={open} setOpen={setOpen}>
        <iframe
          title="YouTube Video"
          width="100%"
          className="video-player"
          src={`https://www.youtube.com/embed/${trailer.key}`}
          allowFullScreen
        ></iframe>
      </ModalComponent>
    )
  );
};

export default MediaPlayer;
