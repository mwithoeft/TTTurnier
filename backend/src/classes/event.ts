import { IPlayer } from "./player";
import { ITournament } from "./tournament";

export interface IEvent {
    id: number;
    name: string;
    dateStart: Date;
    dateEnd: Date;
    tournaments: ITournament[];
    player: IPlayer[];
}

export class EventManager {
    private static events: IEvent[] = [];

    public static addEvent(event: IEvent) {
        this.events.push(event);
    }

    public static getEvents(): IEvent[] {
        return this.events;
    }
}