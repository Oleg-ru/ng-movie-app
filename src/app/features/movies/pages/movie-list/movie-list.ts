import { Component, computed, inject, signal } from '@angular/core';
import { MovieCard } from '../../components/movie-card/movie-card';
import { SERVICE } from '../../../../core/core';
import { ActivatedRoute } from '@angular/router';
import { MovieListResponse, MoviesList } from '../../../../core/models/MovieList';

@Component({
  selector: 'app-movie-list',
  imports: [MovieCard],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.scss',
})
export class MovieList {
  private activatedRoute = inject(ActivatedRoute);
  protected category = signal<MoviesList>('popular');
  protected discoverService = inject(SERVICE.discover);
  protected discovers = signal<MovieListResponse | null>(null);

  protected titleList: Record<Exclude<MoviesList, null>, string> = {
    popular: 'Популярные',
    now_playing: 'Сейчас смотрят',
    top_rated: 'Лучшие',
    upcoming: 'Ожидаемые',
  };
  protected currentTitle = computed(() => {
    const title = this.category();
    return this.titleList[title ?? 'popular'] ?? 'Фильмы';
  });

  constructor() {
    //this.category.set(this.activatedRoute.snapshot.paramMap.get('category') as MoviesList);

  }

  loadMovies() {
    this.discoverService.getMovieList('1', this.category()).subscribe({
      next: (data) => this.discovers.set(data),
      error: (err) => console.error(err)
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params['category']);
      this.category.set(params['category']);
      console.log(this.category());
    });
    this.loadMovies();
  }
}
