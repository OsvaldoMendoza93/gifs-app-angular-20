import { Component, inject, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GifsService } from '../../services/gifs.service';
import { GifsList } from "../../components/gifs-list/gifs-list";

@Component({
  selector: 'app-gif-history',
  imports: [GifsList],
  templateUrl: './gif-history.html',
  styleUrl: './gif-history.scss',
})
export class GifHistory {

  gifsService = inject(GifsService);

  query = toSignal(
    inject(ActivatedRoute).params.pipe(map((params => params['key'])))
  );

  gifs = computed(() => this.gifsService.getHistoryGifsByKey(this.query()));




}
