import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { IEvent } from 'src/classes/event';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) {
    this.socket.on('connect', () => {
      console.log('Connected to Server');
    });
    this.socket.on('disconnect', () => {
      console.log('Disconnected from Server');
    });
  }

  public async getActiveEvents(): Promise<Observable<IEvent[]>> {
    this.socket.removeAllListeners('activeEvents');
    this.socket.emit('getActiveEvents', {});

    return new Observable<IEvent[]>(observer => {
      this.socket.on('getActiveEvents', (data: IEvent[]) => {
        observer.next(data);
      });
    });
  }

  


}
