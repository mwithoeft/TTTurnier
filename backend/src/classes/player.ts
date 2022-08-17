import { ITournament } from "./tournament";

export interface IPlayer{
    surname: string;
    firstname: string;
    birthdate: Date;
    tournaments: ITournament[];
}