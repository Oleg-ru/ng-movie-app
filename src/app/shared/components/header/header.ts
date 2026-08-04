import { Component, computed, signal, WritableSignal } from '@angular/core';
import { MENU_ITEMS } from '../../../core/constants/menu.constants';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected menuList = MENU_ITEMS.map((item) => item.title);
  menuState = new Map<string, WritableSignal<boolean>>();

  constructor() {
    MENU_ITEMS.forEach((id) => this.menuState.set(id.title, signal(false)));
  }

  protected subMenu = computed(() => {
    let activeTitle = ''
    this.menuState.forEach((state, title) => {
      if (state()) {
        activeTitle = title;
      }
    });

    return MENU_ITEMS.find(menu => menu.title === activeTitle)?.children?.map(child => child.label)
  });

  isOpen(id: string) {
    return this.menuState.get(id)?.();
  }

  isClose(id: string) {
    this.menuState.forEach((menu) => menu.set(false));
  }

  toggleMenu(id: string) {
    this.menuState.forEach((menu) => menu.set(false));
    this.menuState.get(id)?.set(true);
  }
}
