import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';

import { environment } from '@environments/environment';

import { GiphyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';

import { GifMapper } from '../mapper/gif.mapper';

@Injectable({ providedIn: 'root' })
export class GifsService {
    private http = inject(HttpClient);

    GIF_KEY: string = 'gifs'

    trendingGifs = signal<Gif[]>([]);
    trendingGifsLoading = signal<boolean>(false);
    private trendingPage = signal<number>(0);

    trendingGifsGroup = computed<Gif[][]>(() => {
        const groups = [];
        for (let i = 0; i < this.trendingGifs().length; i += 3) {
            groups.push(this.trendingGifs().slice(i, i + 3));

        }
        return groups;
    });

    searchHistory = signal<Record<string, Gif[]>>(this.loadFormLocalStorage());
    searchHistoryKey = computed(() => Object.keys(this.searchHistory()));

    saveGifsToLocalStorageEffect = effect(() => {
        if (this.searchHistory()) {
            localStorage.setItem('gifs', JSON.stringify(this.searchHistory()))
        }
    });

    loadFormLocalStorage() {
        const gifsFromLocalStorage = localStorage.getItem(this.GIF_KEY) ?? '{}';
        const gifs = JSON.parse(gifsFromLocalStorage);

        return gifs
    }

    loadTrendingGifs() {
        if (this.trendingGifsLoading()) return of([]);

        this.trendingGifsLoading.set(true);

        return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
            params: {
                api_key: environment.giphyApiKey,
                limit: 20,
                offset: this.trendingPage() * 20,
            }
        }).pipe(
            map((resp) => GifMapper.mapGiphyItemsToGifArray(resp.data)),
            tap((gifs) => {
                this.trendingGifs.update(currentGifs => [
                    ...currentGifs,
                    ...gifs
                ]);
                this.trendingPage.update(currentPage => currentPage + 1);
                this.trendingGifsLoading.set(false);
            })
        );
    }

    searchGifs(query: string): Observable<Gif[]> {
        return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
            params: {
                api_key: environment.giphyApiKey,
                limit: 20,
                q: query
            }
        }).pipe(
            map((resp) => GifMapper.mapGiphyItemsToGifArray(resp.data)),
            tap(items => {
                this.searchHistory.update(history => ({
                    ...history,
                    [query.toLowerCase()]: items
                }))
            })
        );
    }

    getHistoryGifsByKey(query: string): Gif[] {
        return this.searchHistory()[query] ?? [];
    }

}