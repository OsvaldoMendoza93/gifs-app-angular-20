import { Component, inject, Injector, runInInjectionContext, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { GifsList } from "../../components/gifs-list/gifs-list";

import { GifsService } from '../../services/gifs.service';

import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search',
  imports: [GifsList],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  private gifsService = inject(GifsService);
  injector = inject(Injector);

  gifs = signal<Gif[]>([]);

  onSearch(txtSearch: string) {
    this.gifsService.searchGifs(txtSearch).subscribe((resp) => {
      this.gifs.set(resp)
    });
  }
}
