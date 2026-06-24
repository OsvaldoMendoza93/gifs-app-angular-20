import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollState {

  trendingScrollState = signal<number>(0);

}
