export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Tv {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface MovieListResponse<E> {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: E[];
  total_pages: number;
  total_results: number;
}

export type MoviesList = 'now_playing' | 'popular' | 'top_rated' | 'upcoming' | null;
