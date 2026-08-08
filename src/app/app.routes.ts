import { Routes } from '@angular/router';
import { Welcome } from './features/welcome/pages/welcome/welcome';
import { MovieList } from './features/movies/pages/movie-list/movie-list';
import { NotFound } from './features/not-found/not-found';

export const routes: Routes = [
  {path: "", component: Welcome},
  {path: ':movieType', children: [
      {path: '', redirectTo: 'popular', pathMatch: 'full'},
      {path: ':category', component: MovieList}
    ]},
  {path: '**', component: NotFound}
];
