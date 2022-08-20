import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private socket: Socket) {}

  public async registerUser(username: string, password: string): Promise<Observable<boolean>> {
    this.socket.emit('registerUser', { username, password });

    return new Observable<boolean>(observer => {
      this.socket.once('registerUser', (data: boolean) => {
        observer.next(data);
      });
    });
  }

  public async loginUser(username: string, password: string): Promise<Observable<boolean>> {
    this.socket.emit('loginUser', { username, password });
    
    return new Observable<boolean>(observer => {
      this.socket.once('loginUser', (data: {id: string, username: string}) => {
        if (data.id && data.username) {
          localStorage.setItem('loggedUser', JSON.stringify({id: data.id, username: data.username, timestamp: new Date().getTime()}));
          observer.next(true);
          this.loggedIn.next(true);
        } else {
          observer.next(false);
        }
      });
    });
  }

  public async logoutUser(): Promise<Observable<boolean>> {
    this.socket.emit('logoutUser');
    return new Observable<boolean>(observer => {
      this.socket.once('logoutUser', (data: boolean) => {
        if (data) {
          localStorage.removeItem('loggedUser');
          observer.next(true);
          this.loggedIn.next(false);
        } else {
          observer.next(false);
        }
      });
    });
  }

  public async validateUser(id: string, username: string, timestamp: number): Promise<Observable<boolean>> {
    this.socket.emit('validateUser', { id, username, timestamp });
    return new Observable<boolean>(observer => {
      this.socket.once('validateUser', (data: boolean) => {
        if (data) {
          console.log("Logged in with localstorage");
          observer.next(true);
          this.loggedIn.next(true);
        } else {
          localStorage.removeItem('loggedUser');
          observer.next(false);
        }
      });
    });
  }

  public async changePassword(userId: string, oldPassword: string, newPassword: string): Promise<Observable<boolean>> {
    this.socket.emit('changePassword', { userId, oldPassword, newPassword });
    return new Observable<boolean>(observer => {
      this.socket.once('changePassword', (data: boolean) => {
        observer.next(data);
      });
    });
  }

  public getUserId(): string {
    const user = localStorage.getItem('loggedUser');
    if (user) {
      return JSON.parse(user).id;
    } else {
      return "";
    }
  }
}
