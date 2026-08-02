import { Component, computed, inject, signal } from '@angular/core';
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
  protected category = signal<MoviesList>('popular');
  protected discoverService = inject(SERVICE.discover);
  protected discovers = this.discoverService.getMovieList('1', this.category());

  protected titleList: Record<Exclude<MoviesList, null>, string> = {
    popular: 'Популярные',
    now_playing: 'Сейчас смотрят',
    top_rated: 'Лучшие',
    upcoming: 'Ожидаемые',
  };
  protected currentTitle = computed(() => {
    const title = this.category();
    return this.titleList[title ?? 'popular'] ?? 'Фильмы';
  })

  constructor() {
    this.category.set(this.activatedRoute.snapshot.paramMap.get('category') as MoviesList);
  }
}
