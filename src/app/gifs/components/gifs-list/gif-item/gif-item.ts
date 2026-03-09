import { Component, input } from '@angular/core';

@Component({
  selector: 'gif-item',
  imports: [],
  templateUrl: './gif-item.html',
  styleUrl: './gif-item.scss',
})
export class GifItem {
  gif = input<string>('');
}
