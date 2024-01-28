import axios from "./Api";
export const Services = {
  getTrendingMovies: async () => {
    return await axios.get("/trending/all/week", {
      params: {
        language: "IN",
      },
    });
  },
  getNetflixOriginals: async () => {
    return await axios.get("discover/movie/", {
      params: {
        sort_by: "popularity.desc",
        with_watch_monetization_types: "flatrate,free,ads",
      },
    });
  },
  getMovies: async (configs) => {
    return await axios.get(`discover/movie`, {
      params: {
        ...configs,
        sort_by: "vote_count.desc",
      },
    });
  },
  getMollyWoodMovies: async (country = "IN", language = "ml") => {
    return await axios.get(`discover/movie`, {
      params: {
        with_original_country: country,
        with_original_language: language,
        sort_by: "popularity.desc",
      },
    });
  },
};
