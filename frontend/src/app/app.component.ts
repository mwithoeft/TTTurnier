import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  items!: MenuItem[];

  activeItem!: MenuItem;

  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.items = [
      { label: 'Start', icon: 'pi pi-fw pi-home', routerLink: '/' },
      { label: 'Veranstaltungen', icon: 'pi pi-fw pi-calendar', routerLink: '/event' },
      { label: 'Login', icon: 'pi pi-fw pi-users', routerLink: '/login' }
    ];

    this.activeItem = this.items[0];
  }
}
