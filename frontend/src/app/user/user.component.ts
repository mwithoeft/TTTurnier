import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less'],
  providers: [MessageService]
})
export class UserComponent implements OnInit {

  oldPassword: string = '';
  newPassword: string = '';
  repeatPassword: string = '';

  deleteAccountUsername: string = '';
  deleteAccountPassword: string = '';

  constructor(private messageService: MessageService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  changePassword() {
    if (this.oldPassword == '' || this.newPassword == '' || this.repeatPassword == '') {
      this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Bitte geben Sie ein Passwort ein.' });
      return;
    }
    if (this.newPassword != this.repeatPassword) {
      this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Die Passwörter stimmen nicht überein.' });
      return;
    }
    const userId = this.userService.getUserId();
    if (userId == '') {
      this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Bitte loggen Sie sich erneut ein.' });
      this.userService.logoutUser();
      this.router.navigate(['/home']);
    }
    this.userService.changePassword(userId, this.oldPassword, this.newPassword).then((data) => {
      data.subscribe((success) => {
        if (success) {
          this.messageService.add({ severity: 'success', summary: 'Erfolg', detail: 'Passwort erfolgreich geändert.' });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Passwort konnte nicht geändert werden.' });
        }
      });
    });
  }


}
