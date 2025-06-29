import { Player } from "./player";
import { Ship } from "./ship";

export class GameController {

    constructor(name1,humanBool1,name2,humanBool2){
        this.player1 =  new Player(name1,humanBool1);
        this.player2 = new Player(name2, humanBool2);
        this.currentPlayer = this.player1;
        this.ships = [
            {name:"Carrier",length:5},
            {name:"Battleship",length:4},
            {name:"Destroyer",length:3},
            {name:"Submarine" ,length:3},
            {name:"Patrol Boat",length:2} 
        ]
    }

    computerShipPlacement(player){
        this.ships.forEach((shipInfo)=>{
            const ship = new Ship(shipInfo.name, shipInfo.length);
            let placed = false;
            while(!placed){
                const x = Math.floor(Math.random()*10);
                const y = Math.floor(Math.random()*10);
                const o = Math.floor(Math.random())==0?"H":"V";
                placed  = player.placeShip(ship,x,y,o);
            }
        })
    }

}