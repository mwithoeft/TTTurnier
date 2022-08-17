import { IEvent } from "./classes/event";

export class EventManager {
    private static events: IEvent[] = [];

    public static addEvent(event: IEvent) {
        this.events.push(event);
    }

    public static getEvents(): IEvent[] {
        return this.events;
    }
}