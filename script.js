const TicTacToe = (function(){
    function PlayerFactory(name, symbol){
        let prevMoves = [false, false, false, false, false, false, false, false, false];

        function printWinner(){
            document.querySelector("#messages").textContent = name + " won!";
        }

        function determineWinner(){
            let winningCombos = [
                [true, true, true, false, false, false, false, false, false], 
                [false, false, false, true, true, true, false, false, false], 
                [false, false, false, false, false, false, true, true, true], 
                [true, false, false, true, false, false, true, false, false], 
                [false, true, false, false, true, false, false, true, false],
                [false, false, true, false, false, true, false, false, true],
                [true, false, false, false, true, false, false, false, true],
                [false, false, true, false, true, false, true, false, false]
            ]
            for (let i = 0; i < winningCombos.length; i++){
                //the temp array used to compare to winning combo
                let tester = [];
                for (let j = 0; j < winningCombos[i].length; j++){
                    if (winningCombos[i][j] && prevMoves[j]){
                        tester.push(true);
                    } else {
                        tester.push(false);
                    }
                }
                if (JSON.stringify(tester) === JSON.stringify(winningCombos[i])){
                    console.log("player won");
                    console.log(prevMoves);
                    printWinner();
                    return true;
                }
            }
            return false;
        }

        function resetPlayers(){
            for (let i = 0; i < prevMoves.length; i++){
                prevMoves[i] = false;
            }
        }

        return {
            name: name,
            symbol: symbol,
            prevMoves,
            determineWinner,
            resetPlayers,
            printWinner
        }
    }

    function GameFactory(name1, name2){
        let gameboard = [false, false, false, false, false, false, false, false, false];
        let player1 = PlayerFactory(name1, "X");
        let player2 = PlayerFactory(name2, "O");

        function tie(){
            for (let i = 0; i < gameboard.length; i++){
                if (gameboard[i] == false){
                    return false;
                }
            }
            document.querySelector("#messages").textContent = "There was a tie.";
            return true;
        }

        function resetBoard(){
            for (let i = 0; i < gameboard.length; i++){
                gameboard[i] = false;
            }
        }

        return {
            gameboard,
            player1,
            player2,
            tie,
            resetBoard
        }
    }

    function move(index, currentPlayer, currentGame){
        currentGame.gameboard[index] = true;
        currentPlayer.prevMoves[index] = true;
    }

    function playGame(){
        if (document.querySelector("#player1").value == "" || document.querySelector("#player2").value == ""){
            document.querySelector("#messages").textContent = "Enter player names.";
        } else {
            document.querySelector("#messages").textContent = "";
            let newGame = null;
            console.log('Before creating new game:' + newGame);
            newGame = GameFactory(document.querySelector("#player1").value,    document.querySelector("#player2").value);
            console.log('After creating new game:' + newGame);


            let currentPlayer = null;
            currentPlayer = newGame.player1;
            document.querySelector("#messages").textContent = "Player 1's Turn";
            let square = document.querySelectorAll("td");
            console.log(newGame);
            for (let i = 0; i < square.length; i++){
                square[i].addEventListener("click", function clickHandler(){
                    if (newGame.gameboard[i] == false){
                        square[i].textContent = currentPlayer.symbol;
                        move(square[i].id, currentPlayer, newGame);
                    }
                    if (currentPlayer.determineWinner() == true || newGame.tie() == true){
                        for (let i = 0; i < newGame.gameboard.length; i++){
                            newGame.gameboard[i] = true;
                        }
                        newGame.resetBoard();
                        newGame.player1.resetPlayers();
                        console.log("reset player1" + player1.prevMoves);
                        newGame.player2.resetPlayers();
                        console.log("reset player2" + player2.prevMoves);
                        return;
                    }
                    console.log("gameboard" + newGame.gameboard);
                    if (currentPlayer == newGame.player1){
                        currentPlayer = newGame.player2;
                        document.querySelector("#messages").textContent = "Player 2's Turn";

                    } else {
                        currentPlayer = newGame.player1;
                        document.querySelector("#messages").textContent = "Player 1's Turn";
                    }
                });
            }
        }
    }
    
    const start = document.querySelector("#start");
    start.addEventListener("click", () => {
        const squares = document.querySelectorAll("td");
        for (let i = 0; i < squares.length; i++){
            squares[i].textContent = "";
        }
        playGame();
    });

    const restart = document.querySelector("#restart");
    restart.addEventListener("click", () => {
        const squares = document.querySelectorAll("td");
        for (let i = 0; i < squares.length; i++){
            squares[i].textContent = "";
        }
        playGame();
    });
})();
