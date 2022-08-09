import { API_KEY } from "./constants/constants";

export const NetflixOrginals=`discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;
export const Actions=`discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`;
