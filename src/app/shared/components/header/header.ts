import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { MENU_ITEMS } from '../../../core/constants/menu.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected menuList = MENU_ITEMS.map((item) => item.title);
  menuState = new Map<string, WritableSignal<boolean>>();
  protected router = inject(Router);

  constructor() {
    MENU_ITEMS.forEach((id) => this.menuState.set(id.title, signal(false)));
  }

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

  isOpen(id: string) {
    return this.menuState.get(id)?.();
  }

  isClose() {
    this.menuState.forEach((menu) => menu.set(false));
  }

  toggleMenu(id: string) {
    this.menuState.forEach((menu) => menu.set(false));
    this.menuState.get(id)?.set(true);
  }

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
    })?.children.find(
      (child) => {
        const isValid = child.label === menu;
        if (isValid) {
          childUrl = child.route;
        }
        return isValid;
      },
    )?.route;

    void this.router.navigate([`/${parentUrl}/${childUrl}`]);
  }
}
