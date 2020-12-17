import { API_KEY } from "@env";
import axios from "axios";
import { defer, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Convert, Result } from "../models/MoviesResponse";
import { SearchType } from "../Utils/utils";

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3"
});

tmdb.interceptors.request.use(req => {
  req.params["api_key"] = API_KEY;

  console.log(`${req.method} ${req.url}`);
  // Important: request interceptors **must** return the request.
  return req;
});

tmdb.interceptors.response.use(res => {
  console.log(res.data.results[0]);
  // Important: response interceptors **must** return the response.
  return res;
});

export const searchTMDB = (
  type: SearchType,
  query: string
): Observable<Result[]> => {
  return defer(() =>
    tmdb.get(`/search/${type}`, {
      params: {
        language: "en-US",
        query
      }
    })
  ).pipe(
    map(x =>
      Convert.toMoviesResponse(JSON.stringify(x.data)).results.filter(
        x => x.poster_path && x.overview
      )
    )
  );
};

export const searchMovie = async (query: string) => {
  ///search/movie?api_key=a5968df59cc3e43725bcb8d5a89aa34c&language=en-US&query=Avengers
  const res = await tmdb.get("/search/movie", {
    params: {
      language: "en-US",
      query
    }
  });
  return Convert.toMoviesResponse(JSON.stringify(res.data));
};

export const searchTV = async (query: string) => {
  ///search/movie?api_key=a5968df59cc3e43725bcb8d5a89aa34c&language=en-US&query=Avengers
  const res = await tmdb.get("/search/tv", {
    params: {
      language: "en-US",
      query
    }
  });
  return Convert.toMoviesResponse(JSON.stringify(res.data));
};
