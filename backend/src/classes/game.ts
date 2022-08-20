import { IPlayer } from "./player";

export interface IGame {
    winningSets: 1 | 2 | 3 | 4;
    player1: IPlayer;
    player2: IPlayer;
    sets: ISet[];
    winner?: IPlayer;
}

export interface ISet {
    player1Points: number;
    player2Points: number;
}