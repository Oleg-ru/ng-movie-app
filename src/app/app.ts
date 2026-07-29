import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SERVICE } from './core/core';
import { AsyncPipe } from '@angular/common';
import { MovieCard } from './features/movies/components/movie-card/movie-card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe, MovieCard],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  discoverService = inject(SERVICE.discover);
  discovers = this.discoverService.getMovieList('1', 'popular');
}
