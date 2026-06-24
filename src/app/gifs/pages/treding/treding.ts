import { AfterViewInit, Component, computed, effect, ElementRef, inject, signal, viewChild } from '@angular/core';

import { GifsList } from "../../components/gifs-list/gifs-list";

import { GifsService } from '../../services/gifs.service';
import { ScrollState } from '../../../shared/services/scroll-state/scroll-state';

@Component({
  selector: 'app-treding',
  imports: [],
  templateUrl: './treding.html',
  styleUrl: './treding.scss',
})
export class Treding implements AfterViewInit {
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');
  scrollTop = signal<number>(0);
  clientHeight = signal<number>(0);
  scrollHeight = signal<number>(0);
  isAtBottom = signal<boolean>(false);

  gifsService = inject(GifsService);
  scrollState = inject(ScrollState);

  gifs = computed(() => this.gifsService.trendingGifs());

  groupsGifs = computed(() => this.gifsService.trendingGifsGroup());

  isLoading = computed(() => this.gifsService.trendingGifsLoading());

  constructor() {
    this.gifsService.loadTrendingGifs().subscribe();
  }

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollState.trendingScrollState()
  }

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    this.scrollTop.set(scrollDiv.scrollTop);
    this.clientHeight.set(scrollDiv.clientHeight);
    this.scrollHeight.set(scrollDiv.scrollHeight);
    this.isAtBottom.set(this.scrollTop() + this.clientHeight() + 300 >= this.scrollHeight());

    this.scrollState.trendingScrollState.set(this.scrollTop());

    if (this.isAtBottom()) {
      this.gifsService.loadTrendingGifs().subscribe()
    }
  }
}
