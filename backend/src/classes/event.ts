import { IPlayer } from "./player";
import { ITournament } from "./tournament";

export interface IEvent {
    id: string;
    name: string;
    dateStart: Date;
    dateEnd: Date;
    tournaments: ITournament[];
    players: IPlayer[];
    location?: string;
    details?: string;
    inProgress: boolean;
    creatorId: string;
}

