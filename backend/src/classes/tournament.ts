export interface ITournament {
    id: number;
    name: string;
    date: Date;
    settings: TournamentSettings;
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