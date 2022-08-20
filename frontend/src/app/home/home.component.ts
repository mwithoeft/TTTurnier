import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEvent } from 'src/classes/event';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  events: IEvent[] = [];

  constructor(private socketService: SocketService, private router: Router) { }

  ngOnInit(): void {
    //this.requestActiveEvents();

    this.events = [
      {
        id: "1",
        name: 'Test',
        players: [],
        tournaments: [],
        dateStart: new Date(),
        dateEnd: new Date(),
        location: "Testlocation",
        details: "Testdetails",
        inProgress: true,
        creatorId: "1",
      }
    ];
  }

  async requestActiveEvents() {
    this.socketService.getActiveEvents().then((data) => {
      data.subscribe((events) => {
        this.events = events;
      });
    });
  }

  openTournament(id: string) {
    console.log(id);
  }

  openPage(page: string) {
    this.router.navigate([page]);
  }
}
