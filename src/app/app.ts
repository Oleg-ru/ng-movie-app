import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SERVICE } from './core/core';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  discoverService = inject(SERVICE.discover);
  discovers = this.discoverService.getNowPlaying();
}
