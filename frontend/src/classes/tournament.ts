import { IGame } from "./game";
import { IPlayer } from "./player";

export interface ITournament {
    id: number;
    name: string;
    date: Date;
    settings: TournamentSettings;
    games: IGame[];
    players: IPlayer[];
    inProgress: boolean;
}


export interface TournamentSettings {
    singlesOnly: boolean;
    mode: Mode;
}

export enum Mode {
    GROUPKO,
    KO,
    ROUNDROBIN,
    GROUPKOCONSOLATION,
    DOUBLEKO
}