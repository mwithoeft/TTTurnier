import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [MessageService]
})
export class AppComponent implements OnInit {

  items!: MenuItem[];

  activeItem!: MenuItem;

  constructor(private router: Router, private primengConfig: PrimeNGConfig, private userService: UserService, private messageService: MessageService) { }

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.userService.loggedIn.subscribe((loggedIn) => {
      if (loggedIn) {
        this.items = [
          { label: 'Start', icon: 'pi pi-fw pi-home', routerLink: '/home' },
          { label: 'Events', icon: 'pi pi-fw pi-calendar', routerLink: '/event' },
          { label: 'Meine Events', icon: 'pi pi-fw pi-user', routerLink: '/my-events', style: { 'margin-left': 'auto' } },
          { label: 'Benutzer', icon: 'pi pi-fw pi-user-edit', routerLink: '/user' },
          { label: 'Logout', icon: 'pi pi-fw pi-sign-out', command: () => this.logoutUser() }
        ];
      } else {
        this.items = [
          { label: 'Start', icon: 'pi pi-fw pi-home', routerLink: '/home' },
          { label: 'Events', icon: 'pi pi-fw pi-calendar', routerLink: '/event' },
          { label: 'Login', icon: 'pi pi-fw pi-sign-in', routerLink: '/login', style: { 'margin-left': 'auto' } }
        ];
      }
    });

    this.activeItem = this.items[0];
    this.router.navigate(['/home']);
    this.checkLocalStorage();
  }

  checkLocalStorage() {
    const userStr = localStorage.getItem('loggedUser');
    if (userStr != null) {
      const user = JSON.parse(userStr);
      const id = user.id;
      const username = user.username;
      const timestamp = user.timestamp;
      this.userService.validateUser(id, username, timestamp).then((data) => {
        data.subscribe((success) => {
          if (success) {
            this.messageService.add({ severity: 'info', summary: 'Log in', detail: 'Du wurdest erfolgreich wieder eingeloggt.' });
          }
        });
      });
    }
  }

  logoutUser() {
    this.userService.logoutUser().then((data) => {
      data.subscribe((success) => {
        if (success) {
          this.messageService.add({ severity: 'success', summary: 'Erfolg', detail: 'Benutzer erfolgreich ausgeloggt.' });
          this.router.navigate(['/home']);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Benutzer konnte nicht ausgeloggt werden.' });
          this.router.navigate(['/home']);
        }
      });
    });
  }

}
