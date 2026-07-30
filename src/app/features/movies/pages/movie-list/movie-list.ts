import { Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MovieCard } from '../../components/movie-card/movie-card';
import { SERVICE } from '../../../../core/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesList } from '../../../../core/models/MovieList';

@Component({
  selector: 'app-movie-list',
  imports: [AsyncPipe, MovieCard],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.scss',
})
export class MovieList {
  private activatedRoute = inject(ActivatedRoute);
  private category = signal<MoviesList>('popular');
  discoverService = inject(SERVICE.discover);
  discovers = this.discoverService.getMovieList('1', this.category());

  constructor() {
    this.category.set(this.activatedRoute.snapshot.paramMap.get('category') as MoviesList);
  }
}
