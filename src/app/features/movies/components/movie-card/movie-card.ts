import { Component, input } from '@angular/core';
import { Movie } from '../../../../core/models/MovieList';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  imports: [DatePipe],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
})
export class MovieCard {
  movie = input<Movie>();

  handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = '/assets/no-image.jpg';
  }
}
