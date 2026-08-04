export interface MenuItem {
  id: string;
  title: string;
  children: SubMenuItem[];
}

export interface SubMenuItem {
  route: string;
  label: string;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'movie',
    title: 'Фильмы',
    children: [
      {
        route: 'popular',
        label: 'Популярные',
      },
      {
        route: 'now_playing',
        label: 'Смотрят сейчас',
      },
      {
        route: 'upcoming',
        label: 'Ожидаемые',
      },
      {
        route: 'top_rated',
        label: 'Лучшие',
      },
    ],
  },
  {
    id: 'tv',
    title: 'Сериалы',
    children: [
      {
        route: 'popular',
        label: 'Популярные',
      },
      {
        route: 'airing_today',
        label: 'В эфире сегодня',
      },
      {
        route: 'on_the_air',
        label: 'По телевидению',
      },
      {
        route: 'top_rated',
        label: 'Лучшие',
      },
    ],
  },
  {
    id: 'person',
    title: 'Люди',
    children: [
      {
        route: 'popular',
        label: 'Популярные',
      },
    ],
  },
];
