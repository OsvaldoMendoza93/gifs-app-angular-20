import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { GifsList } from "../../components/gifs-list/gifs-list";

import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-treding',
  imports: [GifsList],
  templateUrl: './treding.html',
  styleUrl: './treding.scss',
})
export class Treding {
  gifsService = inject(GifsService);

  gifs = toSignal(this.gifsService.loadTrendingGifs(), {
    initialValue: []
  });

  isLoading = computed(() => this.gifsService.trendingGifsLoading());
}
