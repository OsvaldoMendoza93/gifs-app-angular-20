import { Component, inject, signal, effect, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifsService } from '../../../services/gifs.service';

interface MenuOption {
  icon: string
  label: string;
  route: string;
  subLabel: string;
}

@Component({
  selector: 'side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.html',
  styleUrl: './side-menu-options.scss',
})
export class SideMenuOptions {
  gifsService = inject(GifsService);

  searchKeys = computed(() => this.gifsService.searchHistoryKey());

  menuOptions = signal<MenuOption[]>([
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Treding',
      subLabel: 'Gifs populares',
      route: '/dashboard/treding'
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Buscador',
      subLabel: 'Buscar gifs',
      route: '/dashboard/search'
    }
  ])
}
