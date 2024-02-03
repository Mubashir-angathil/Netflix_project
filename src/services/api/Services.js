import axios from "./Api";

/**
 * Movie-related services utilizing the Axios library for making API requests.
 */
export const services = {
  /**
   * Fetch trending movies for the current week.
   * @returns {Promise} A promise that resolves to the response from the API.
   */
  getTrendingMovies: async () => {
    return await axios.get("/movie/now_playing", {
      params: {
        language: "IN",
        include_adult: false,
      },
    });
  },

  /**
   * Fetch Netflix originals movies.
   * @returns {Promise} A promise that resolves to the response from the API.
   */
  getNetflixOriginals: async () => {
    return await axios.get("discover/movie", {
      params: {
        sort_by: "popularity.desc",
        with_watch_monetization_types: "flatrate,free,ads",
      },
    });
  },

  /**
   * Fetch movies based on provided configurations.
   * @param {Object} configs - Additional configurations for the API request.
   * @returns {Promise} A promise that resolves to the response from the API.
   */
  getMovies: async (configs) => {
    return await axios.get(`discover/movie`, {
      params: {
        ...configs,
        sort_by: "vote_count.desc",
      },
    });
  },

  /**
   * Fetch Malayalam (Mollywood) movies.
   * @param {string} country - The country for which to fetch movies.
   * @param {string} language - The language of the movies.
   * @returns {Promise} A promise that resolves to the response from the API.
   */
  getMollyWoodMovies: async (country = "IN", language = "ml") => {
    return await axios.get(`discover/movie`, {
      params: {
        with_original_country: country,
        with_original_language: language,
        sort_by: "popularity.desc",
      },
    });
  },

  /**
   * Fetch details of a specific movie.
   * @param {number} movieId - The ID of the movie for which to fetch details.
   * @returns {Promise} A promise that resolves to the response from the API.
   */
  getMovieDetails: async (movieId) => {
    return await axios.get(`/movie/${movieId}`);
  },

  /**
   * Fetch credits (cast and crew) of a specific movie.
   * @param {number} movieId - The ID of the movie for which to fetch credits.
   * @returns {Promise} A promise that resolves to the response from the API.
   */
  getMovieCredits: async (movieId) => {
    return await axios.get(`/movie/${movieId}/credits`);
  },

  /**
   * Fetch streaming providers for a specific movie.
   * @param {number} movieId - The ID of the movie for which to fetch providers.
   * @returns {Promise} A promise that resolves to the response from the API.
   */
  getProviders: async (movieId) => {
    return await axios.get(`/movie/${movieId}/watch/providers`);
  },

  /**
   * Fetch related videos for a specific movie.
   * @param {number} movieId - The ID of the movie for which to fetch related videos.
   * @returns {Promise} A promise that resolves to the response from the API.
   */
  getMovieRelatedVideos: async (movieId) => {
    return await axios.get(`/movie/${movieId}/videos`);
  },
};
