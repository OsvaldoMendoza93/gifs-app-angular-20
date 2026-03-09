import { Component, input } from '@angular/core';
import { GifItem } from "./gif-item/gif-item";

@Component({
  selector: 'gifs-list',
  imports: [GifItem],
  templateUrl: './gifs-list.html',
  styleUrl: './gifs-list.scss',
})
export class GifsList {
  gifs = input<string[]>([]);
}
