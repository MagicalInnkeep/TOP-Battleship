import { toggleMode } from "./lightdark";
import { GameController } from "./gameController";

export class DOMController{
    constructor(){
        let gameController;
        this.init();
        this.playerSelection();
        this.state=0;
        this.round=0;
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
        this.displayGrid('nofog',this.gameController.currentPlayer, '.content');
        //Add eventListeners
        const container = document.querySelector(".content");

        //Buttons
        const btnContainer = document.createElement("div");
        btnContainer.setAttribute("class","btnContainer");
        const btnReGenerate = document.createElement("button");
        btnReGenerate.textContent=`Random positions`;

        btnReGenerate.addEventListener('click', (event) =>{
            event.preventDefault();
            container.innerHTML='';
            this.gameController.currentPlayer.Gameboard.reset();
            this.setupPlayer();
        });

        const btnFinished = document.createElement("button");
        btnFinished.textContent="Ready"

        btnFinished.addEventListener('click', (event)=>{
            event.preventDefault();
            this.state+=1; //needed persistent tracker to define function of button.
            this.changePlayer(this.state>1?this.playRound.bind(this):this.setupPlayer.bind(this));
        })

        btnContainer.appendChild(btnReGenerate);
        btnContainer.appendChild(btnFinished);
        container.appendChild(btnContainer);

        
    }

    changePlayer(callback){
        //Change player
        this.gameController.nextPlayer();
        //Display Wait  screen
        this.displayCurrentPlayer("Waiting", this.gameController.currentPlayer);
        const container = document.querySelector(".content");
        container.innerHTML = '';
        

        const btnNextPlayer = document.createElement("button");
        btnNextPlayer.textContent=`Waiting on ${this.gameController.currentPlayer.name}`;

        btnNextPlayer.addEventListener('click', (event) =>{
            event.preventDefault();
            container.innerHTML = '';
            callback();
        });

        const btnContainer = document.createElement("div");
        btnContainer.setAttribute("class","btnContainer");

        btnContainer.appendChild(btnNextPlayer);
        container.appendChild(btnContainer);
    }

    displayCurrentPlayer(phase,player){
        const playerName= player.name;
        const sidebar = document.querySelector("#mySidebar");
        sidebar.innerHTML='';

        const playerDisplay = document.createElement("div");
        playerDisplay.textContent=`${phase}:   ${playerName}`;

        sidebar.appendChild(playerDisplay);

    }

    displayGrid(mode,player,element){
        const container = document.querySelector(element);

        const gameEnv = document.createElement("div");
        gameEnv.setAttribute("class","gameEnv");
        for(let i=0;i<10;i++){
            for(let j=0;j<10;j++){
                const cell = document.createElement("div");
                cell.setAttribute("id",`cell${i}${j}`);
                const val = player.Gameboard.board[i][j];
                let celcontent;
                if(typeof val==='object' && val!==null){
                    celcontent=mode=='nofog'?val.name:'null';
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

    playRound(){
        //Update sidebar
        this.round+=1;
        this.displayCurrentPlayer(`round ${this.round}`,this.gameController.currentPlayer);

        //Clear container.
        const container = document.querySelector(".content");
        container.innerHTML = '';

        //Create new main div
        const mainDiv = document.createElement("div");
        mainDiv.setAttribute("class","mainBattleScreen");

        //Create div for both grids.
        const divLeft = document.createElement("div");
        divLeft.setAttribute("class","targetArea");
        const divRight = document.createElement("div");
        divRight.setAttribute("class","ownArea");

        mainDiv.appendChild(divLeft);
        mainDiv.appendChild(divRight);
        container.appendChild(mainDiv);
        //Add grid of adversary to left div
        this.displayGrid('',this.gameController.otherPlayer(),".targetArea");
        //Add own grid on right div.
        this.displayGrid('nofog',this.gameController.currentPlayer,'.ownArea');


    }
}