import { Ship } from "./ship";

export class Gameboard {

    constructor(){
        this.board = this.generateBoard();
        this.ships = [];
        this.shipHits = [];
        this.missHits = [];
    }

    generateBoard(){
        const board = [];
        for (let i = 0; i < 10; i++) {
            const row = [];
            for (let j = 0; j < 10; j++) {
              row.push(null);
            }
            board.push(row);
          }
          return board;
    }

    placeShip(ship,x,y,orient){
        if(x<0 || y<0){ return false;}
        if(this.checkPlacement(ship,x,y,orient)){
            //TODO
            for(let i=0;i<=ship.size;i++){
                const posX = orient==="H" ? x+i : x; 
                const posY = orient==="H" ? y : y+i;
                this.board[posX][posY]=ship; 
                
            }
            this.ships.push(ship);
            return true
        }
        return false;
    }

    checkPlacement(ship,x,y,orient){
        if(orient==="H" && x+ship.size>=10){ return false;}
        if(orient==="V" && y+ship.size>=10){ return false;}
        for(let i=0;i<=ship.size;i++){
            const xTest = orient==="H" ? x+i : x; 
            const yTest = orient==="H" ? y : y+i; 
            if(this.board[xTest][yTest]  !== null){ ;return false;}
        }
        return true
    }

    receiveAttack(x,y){
        if(this.board[x][y] === "hit" || this.board[x][y] ==="miss"){ return "AlreadyAttacked"}
        else if(this.board[x][y] !== null){
            const hitShip = this.board[x][y];
            hitShip.hit();
            this.board[x][y] = "hit";
            return "Hit"
        }
        else{
            this.board[x][y] = "miss";
            return "Miss"
        }
    }

    checkSunkFleet(){
        return this.ships.every((ship) => ship.isSunk())
    }
}