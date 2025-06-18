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
}