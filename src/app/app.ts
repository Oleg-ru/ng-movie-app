import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { MovieCard } from './features/movies/components/movie-card/movie-card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe, MovieCard],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {

}
