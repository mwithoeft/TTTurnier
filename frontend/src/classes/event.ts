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