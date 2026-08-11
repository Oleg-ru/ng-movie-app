import { Component, input } from '@angular/core';
import { Movie, Tv } from '../../../../core/models/MovieList';

@Component({
  selector: 'app-movie-card',
  imports: [],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
})
export class MovieCard {
  movie = input<Movie | Tv>();

  handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = '/assets/no-image.jpg';
  }

  protected isMovie(item: Movie | Tv): item is Movie {
    return 'title' in item;
  }

  protected isTv(item: Movie | Tv): item is Tv {
    return 'name' in item;
  }

  getTitle(item: any) {
    if (this.isMovie(item)) {
      return item.title;
    }
    if (this.isTv(item)) {
      return item.name;
    }
    return '';
  }

  getDate(item: any) {
    if (this.isMovie(item)) {
      return item.release_date;
    }
    if (this.isTv(item)) {
      return item.first_air_date;
    }
    return '';
  }
}
