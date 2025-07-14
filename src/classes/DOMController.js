import { toggleMode } from "./lightdark";
import { GameController } from "./gameController";

export class DOMController{
    constructor(){
        let gameController;
        this.init();
        this.playerSelection();
        this.state=0;
        this.round=0;
        this.loss=[];
    }

    init(){
        console.log("init");
        // General UI events
        document.querySelector("#lightdark").addEventListener('click',toggleMode);
    }

    /*
    Creates dom for User Input of players
    Creates a new gameController
    and calles setupGamePlay
    */
    playerSelection(){
        

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
        playerTwoInputSwitch.setAttribute("id","human");
        const playerTwoSpan = document.createElement("span");
        playerTwoSpan.setAttribute("class","slider round");

        const btnCreatePlayer = document.createElement("button");
        btnCreatePlayer.textContent="Play";

        btnCreatePlayer.addEventListener('click', (event) =>{
            event.preventDefault();
            const player1Name = document.querySelector("#playerOne").value;
            const player2Name = document.querySelector("#playerTwo").value;
            this.multiplayer = document.querySelector("#human").checked; 

            this.gameController = new GameController(player1Name,true,player2Name,this.multiplayer);

            container.removeChild(playerCreate);
            this.setupPlayer();
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

    /*
     Shows the UI for the setup of the user. 
     Random ship placement for the AI.
     Calls ChangePlayer function with either PlayRound or SetupPlayer as argument.
    */
    setupPlayer(){
        console.log("Setup Player")

        if(this.multiplayer || this.state==0){
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
        else{
            this.gameController.computerShipPlacement(this.gameController.currentPlayer);
            this.changePlayer(this.playRound.bind(this));
        }
        
    }

    /*
    Checks if victory has been achieved after each 'displayRound', so both players have equal chances.
    Then, if multiplayer, will prompt a screen so the players can pass the device.
    Else, just execute callback
    */
    changePlayer(callback){

        const container = document.querySelector(".content");
        container.innerHTML = '';

        const state =this.checkVictory();
        this.displayRound = Math.round(this.round/2);
        if(this.round%2===0 && state !== false){

            const divEnd = document.createElement("div");
            divEnd.setAttribute("class","gameOver");
            divEnd.textContent=state==="stale"?"Mutual Destruction!":`${state} has lossed all ships!`

            container.appendChild(divEnd);

            // Sidebar update
            const sidebar = document.querySelector("#mySidebar");
            sidebar.innerHTML='';

            const playerDisplay = document.createElement("div");
            playerDisplay.textContent=`Gameover!`;

            sidebar.appendChild(playerDisplay);
        }
        else if(this.multiplayer){
            console.log("Change Player");
            //Change player
            this.gameController.nextPlayer();
            //Display Wait  screen
            this.displayCurrentPlayer("Waiting", this.gameController.currentPlayer);
            

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
        else{
            this.gameController.nextPlayer();
            container.innerHTML ='';
            callback();
        }
    }

    /*
    Helper function to display sidebar info
    */
    displayCurrentPlayer(phase,player){
        const playerName= player.name;
        const sidebar = document.querySelector("#mySidebar");
        sidebar.innerHTML='';

        const playerDisplay = document.createElement("div");
        const aiDisplay = this.multiplayer?'(AI) ':'';
        playerDisplay.textContent=`${phase}:   ${aiDisplay}${playerName}`;

        sidebar.appendChild(playerDisplay);

    }

    /*
    Function to display the grids. Both for the enemy as for the player
     */
    displayGrid(mode,player,element){
        const container = document.querySelector(element);
        let gameMode = mode;
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

        gameEnv.addEventListener('click', (event)=>{
            const clickedX = event.target.id.slice(4)[0];
            const clickedY = event.target.id.slice(4)[1];
            if (clickedX===undefined || clickedY===undefined ||gameMode==='nofog' || gameMode==='shot'){}
            else{
                player.Gameboard.receiveAttack(clickedX,clickedY);
                const container = document.querySelector(".targetArea");
                container.innerHTML = '';
                this.displayGrid('shot',this.gameController.otherPlayer(),".targetArea");
               
                const btnFinished = document.createElement("button");
                btnFinished.textContent="Ready"

                const onReady = (event) => {
                    event.preventDefault();
                    if (player.Gameboard.checkSunkFleet()) {
                        this.loss.push(player);
                    }
                    this.changePlayer(this.multiplayer ? this.playRound.bind(this) : this.aiPlayRound.bind(this));
                };
                
                btnFinished.addEventListener('click', onReady);
                
                // Add keydown listener for Enter key
                window.addEventListener('keydown', function handleEnter(e) {
                    if (e.key === 'Enter') {
                        onReady(e);
                        window.removeEventListener('keydown', handleEnter); // Clean up to avoid multiple triggers
                    }
                });

                const btnContainer = document.createElement("div");
                btnContainer.setAttribute("class","btnContainer");
    
                btnContainer.appendChild(btnFinished);
                container.appendChild(btnContainer);
            }
        });

        container.appendChild(gameEnv);
    }

    /*
    UI for gameplay.
    */
    playRound(){
        console.log("PlayRound");
        //Update sidebar
        this.round+=1;
        this.displayRound = Math.round(this.round/2);
        
        this.displayCurrentPlayer(`round ${this.displayRound}`,this.gameController.currentPlayer);

        //Clear container.
        const container = document.querySelector(".content");
        container.innerHTML = '';
        
        //Create new main div
        const mainDiv = document.createElement("div");
        mainDiv.setAttribute("class","mainBattleScreen");

        //Create div for both grids.
        const divLeft = document.createElement("div");
        divLeft.setAttribute("class","targetArea");
        const h3Left = document.createElement("h3");
        h3Left.textContent="Target Area"

        const divRight = document.createElement("div");
        divRight.setAttribute("class","ownArea");
        const h3Right = document.createElement("h3");
        h3Right.textContent="Own Area"

        divLeft.appendChild(h3Left);
        divRight.appendChild(h3Right);
        mainDiv.appendChild(divLeft);
        mainDiv.appendChild(divRight);
        container.appendChild(mainDiv);
        //Add grid of adversary to left div

        this.displayGrid('',this.gameController.otherPlayer(),".targetArea");
        //Add own grid on right div.
        this.displayGrid('nofog',this.gameController.currentPlayer,'.ownArea');
    }

    /**
     * AI activity for playing a round;
     */
    aiPlayRound() {
        this.round+=1;
        const player= this.gameController.otherPlayer()
        const playerBoard = player.Gameboard;
        player.aiTargetting(playerBoard.receiveAttack.bind(playerBoard));
        if(playerBoard.checkSunkFleet()){
            this.loss.push(player);
        }
        
        this.changePlayer(this.playRound.bind(this));
    }

    checkVictory() {
        console.log(this.loss);
        if(this.loss.length===0){
            return false;
        }
        if(this.loss.length===2){
            if(this.loss[0].name===this.loss[1].name){ //Shouldn't occur but better safe then sorry
                return this.loss[0].name;
            }
            return "stale";
        }
        if(this.loss.length===1){
            return this.loss[0].name;
        }
    }
}