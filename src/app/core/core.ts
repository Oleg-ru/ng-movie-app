import { MovieListService } from './services/api/movie-list/movie-list.service';

export const BASE_API_URL = 'https://api.themoviedb.org/3';

export const SERVICES = {
  movies: MovieListService,
};
