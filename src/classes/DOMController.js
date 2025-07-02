import { toggleMode } from "./lightdark";
import { GameController } from "./gameController";

export class DOMController{
    constructor(){
        let gameController;
        this.init();
        this.playerSelection();
    }

    init(){
        console.log("init");
        // General UI events
        document.querySelector("#lightdark").addEventListener('click',toggleMode);
    }

    playerSelection(){
        //Creates dom for User Input of players

        const container = document.querySelector(".content");

        const playerCreate = document.createElement("form");
        playerCreate.setAttribute("class","playerCreateForm");

        const playerOneLabel = document.createElement("label");
        playerOneLabel.setAttribute("for","playerOne");
        playerOneLabel.textContent="Name Player 1: ";
        const playerTwoLabel = document.createElement("label");
        playerTwoLabel.setAttribute("for","playerTwo");
        playerTwoLabel.textContent="Name Player 2: ";
        const playerOneInput = document.createElement("input");
        playerOneInput.setAttribute("id","playerOne");
        playerOneInput.setAttribute("name","playerOne");
        playerOneInput.setAttribute("value","Horatio Nelson");
        const playerTwoInput = document.createElement("input");
        playerTwoInput.setAttribute("id","playerTwo");
        playerTwoInput.setAttribute("name","playerTwo");
        playerTwoInput.setAttribute("value","Pierre de Villeneuve");
        const humanLabel = document.createElement("label");
        humanLabel.setAttribute("for","human");
        humanLabel.textContent="Human Player?";
        const playerTwoSwitch = document.createElement("label");
        playerTwoSwitch.setAttribute("class", "switch");
        const playerTwoInputSwitch = document.createElement("input");
        playerTwoInputSwitch.setAttribute("type","checkbox");
        const playerTwoSpan = document.createElement("span");
        playerTwoSpan.setAttribute("class","slider round");
        playerTwoSpan.setAttribute("id","human");

        const btnCreatePlayer = document.createElement("button");
        btnCreatePlayer.textContent="Play";

        btnCreatePlayer.addEventListener('click', (event) =>{
            event.preventDefault();
            const player1Name = document.querySelector("#playerOne").value;
            const player2Name = document.querySelector("#playerTwo").value;
            const player2Bool = document.querySelector("#human").checked; 

            this.gameController = new GameController(player1Name,true,player2Name,player2Bool);

            container.removeChild(playerCreate);
            this.setupGamePlay();
        });

        playerTwoSwitch.appendChild(playerTwoInputSwitch); 
        playerTwoSwitch.appendChild(playerTwoSpan); 

        playerCreate.appendChild(playerOneLabel);
        playerCreate.appendChild(playerOneInput);
        playerCreate.appendChild(playerTwoLabel);
        playerCreate.appendChild(playerTwoInput);
        playerCreate.appendChild(humanLabel);
        playerCreate.appendChild(playerTwoSwitch);
        playerCreate.appendChild(btnCreatePlayer);

        container.appendChild(playerCreate);
    }

    setupGamePlay(){
        console.log("Setup the game!");
        this.setupPlayer();
    }

    setupPlayer(){
        //sidebar populate
        this.displayCurrentPlayer('Setup',this.gameController.currentPlayer);
        //Display grid
        this.gameController.computerShipPlacement(this.gameController.currentPlayer);
        this.displayGrid()
        //Add eventListeners

        //Finish Button
        
    }

    changePlayer(){
        //Change player
        this.gameController.changePlayer();
        //Display Wait  screen
        this.displayCurrentPlayer("Waiting", this.gameController.currentPlayer);
        const container = document.querySelector(".content");
        container.innerHTML = '';
        

        const btnNextPlayer = document.createElement("button");
        btnNextPlayer.textContent=`Waiting on ${this.gameController.currentPlayer}`;

        btnNextlayer.addEventListener('click', (event) =>{
            event.preventDefault();
            container.innerHTML = '';
            this.setupPlayer();
        });
    }

    displayCurrentPlayer(phase,player){
        const playerName= player.name;
        const sidebar = document.querySelector("#mySidebar");

        const playerDisplay = document.createElement("div");
        playerDisplay.textContent=`${phase}:   ${playerName}`;

        sidebar.appendChild(playerDisplay);

    }

    displayGrid(){
        const container = document.querySelector(".content");

        const gameEnv = document.createElement("div");
        gameEnv.setAttribute("class","gameEnv");
        for(let i=0;i<10;i++){
            for(let j=0;j<10;j++){
                const cell = document.createElement("div");
                cell.setAttribute("id",`cell${i}${j}`);
                const val = this.gameController.currentPlayer.Gameboard.board[i][j];
                let celcontent;
                if(typeof val==='object' && val!==null){
                    celcontent=val.name;
                }
                else{
                    celcontent=val===null?'null':val;
                }

                cell.setAttribute("class",`content-${celcontent}`)

                gameEnv.appendChild(cell);
            }
        }

        container.appendChild(gameEnv);
    }
}