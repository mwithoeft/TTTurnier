import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [MessageService]
})
export class LoginComponent implements AfterViewInit{

  @ViewChild('usernameInput') usernameInput!: ElementRef;
  @ViewChild('loginButton') loginButton!: ElementRef;
  @ViewChild('registerButton') registerButton!: ElementRef;

  username: string = "";
  password: string = '';

  constructor(private userService: UserService, private messageService: MessageService, private router: Router) { }

  ngAfterViewInit() {
    this.usernameInput.nativeElement.focus();
  }

  @HostListener('window:keyup', ['$event'])
  onKeydown(event: any) {
    if (event.key === "Enter" ) {
      if (this.loginButton.nativeElement == document.activeElement || this.registerButton.nativeElement == document.activeElement) return;
      this.login();
    }
  }
  login() {
    if (this.username == "" || this.password == "") {
      this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Bitte geben Sie einen Benutzernamen und ein Passwort ein.' });
      return;
    }
    this.userService.loginUser(this.username, this.password).then((data) => {

      data.subscribe((success) => {
        if (success) {
          this.messageService.add({ severity: 'success', summary: 'Erfolg', detail: 'Benutzer erfolgreich eingeloggt.' });
          this.router.navigate(['/home']);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Benutzer konnte nicht eingeloggt werden.' });
        }
      });
    });
  }

  register() {
    if (this.username == "" || this.password == "") {
      this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Bitte geben Sie einen Benutzernamen und ein Passwort ein.' });
      return;
    }
    this.userService.registerUser(this.username, this.password).then((data) => {
      data.subscribe((success) => {
        if (success) {
          this.messageService.add({ severity: 'success', summary: 'Erfolg', detail: 'Benutzer erfolgreich registriert. Du kannst Dich jetzt einloggen.' });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Benutzer konnte nicht registriert werden.' });
        }
      });
    });
  }

}
