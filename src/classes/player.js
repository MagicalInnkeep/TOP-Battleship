import { Gameboard } from "./gameboard";

export class Player{

    constructor (name, human){
        this.name= name;
        this.human= human;
        this.Gameboard = new Gameboard();
    }

    aiTargetting(callback) {
        let shot= null;
        console.log("hi");
        while(shot ==="AlreadyAttacked"|| shot===null){
            let x = Math.floor(Math.random()*10);
            let y = Math.floor(Math.random()*10);
            shot = callback(x,y);
        }
    }

}