import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.less']
})
export class EventComponent implements OnInit {

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.requestActiveEvents();
  }

  async requestActiveEvents() {
    this.socketService.getActiveEvents().then((data) => {
      data.subscribe((events) => {
        console.log(events);
      });
    });
  }

}
