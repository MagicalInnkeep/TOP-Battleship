import { Gameboard } from "./gameboard";

export class player{

    constructor (name, human){
        this.name= name;
        this.human= human;
        this.Gameboard = new Gameboard();
    }

    aiTargetting() {
        let shot;
        while(shot ==="AlreadyAttacked"|| shot===null){
            let x = Math.floor(Math.random()*10);
            let y = Math.floor(Math.random()*10);
            shot = this.Gameboard.receiveAttack(x,y);
        }
    }

}