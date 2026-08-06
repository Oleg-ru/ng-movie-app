import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { MENU_ITEMS } from '../../../core/constants/menu.constants';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected menuList = MENU_ITEMS.map((item) => item.title);
  protected router = inject(Router);

  private menuState = new Map<string, WritableSignal<boolean>>();

  constructor() {
    MENU_ITEMS.forEach((id) => this.menuState.set(id.title, signal(false)));
  }

  //Вычисляем субсписок
  protected subMenu = computed(() => {
    let activeTitle = '';
    this.menuState.forEach((state, title) => {
      if (state()) {
        activeTitle = title;
      }
    });

    return MENU_ITEMS.find((menu) => menu.title === activeTitle)?.children?.map(
      (child) => child.label,
    );
  });

  // Флаг отображения субменю
  protected isOpen(id: string) {
    return this.menuState.get(id)?.();
  }

  // При уходе фокуса с меню
  protected isClose() {
    this.menuState.forEach((menu) => menu.set(false));
  }

  // При наведении на меню скрываем отсальные субменю, и отображает целевой
  toggleMenu(id: string) {
    this.menuState.forEach((menu) => menu.set(false));
    this.menuState.get(id)?.set(true);
  }

  // Роутинг на целевой выбранный пункт субменю
  moveTo(itemMenu: string, menu: string) {
    //const urls = this.router.url.split('/').filter((item) => (item.length > 1 ? item : ''));
    let parentUrl = '';
    let childUrl = '';

    MENU_ITEMS.find((menuItem) => {
      const isValid = menuItem.title === itemMenu;
      if (isValid) {
        parentUrl = menuItem.id;
      }
      return isValid;
    })?.children.find((child) => {
      const isValid = child.label === menu;
      if (isValid) {
        childUrl = child.route;
      }
      return isValid;
    })?.route;

    void this.router.navigate([`/${parentUrl}/${childUrl}`]);
  }
}
