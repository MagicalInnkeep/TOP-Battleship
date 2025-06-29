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
            this.domGamePlay();
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

    domGamePlay(){
        console.log("Play the game!");
        console.log(this.gameController);
        this.displayCurrentPlayer(this.gameController.currentPlayer);
    }

    displayCurrentPlayer(player){
        const playerName= player.name;
        const container = document.querySelector(".content");

        const playerDisplay = document.createElement("h1");
        playerDisplay.textContent=playerName;

        container.appendChild(playerDisplay);

    }
}