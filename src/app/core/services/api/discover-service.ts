import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_API_URL } from '../../core';
import { ENVIRONMENT } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DiscoverService {
  http = inject(HttpClient);

  getNowPlaying() {
    return this.http.get<any>(`${BASE_API_URL}/movie/now_playing?language=en-US&page=1`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${ENVIRONMENT.apiKey}`,
      },
    });
  }
}
