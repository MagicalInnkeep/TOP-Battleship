import { Gameboard } from "./gameboard";

export class player{

    constructor (name, human){
        this.name= name;
        this.human= human;
        this.Gameboard = new Gameboard();
    }
}