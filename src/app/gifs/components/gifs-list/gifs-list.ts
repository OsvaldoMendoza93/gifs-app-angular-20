import { Component, input } from '@angular/core';

import { GifItem } from "./gif-item/gif-item";

import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'gifs-list',
  imports: [GifItem],
  templateUrl: './gifs-list.html',
  styleUrl: './gifs-list.scss',
})
export class GifsList {
  gifs = input.required<Gif[]>();
}
