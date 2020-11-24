export interface MoviesResponse {
  total_pages: number;
  results: Result[];
  total_results: number;
  page: number;
}

export interface Result {
  original_language: string;
  original_title: string;
  poster_path: string;
  title: string;
  vote_average: number;
  popularity: number;
  vote_count: number;
  release_date: Date;
  overview: string;
  adult: boolean;
  backdrop_path: string;
  id: number;
  genre_ids: number[];
  video: boolean;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toMoviesResponse(json: string): MoviesResponse {
    return JSON.parse(json);
  }

  public static moviesResponseToJson(value: MoviesResponse): string {
    return JSON.stringify(value);
  }
}
