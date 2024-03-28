const TicTacToe = (function(){

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

        function PlayerFactory(name, symbol){
            let prevMoves = [false, false, false, false, false, false, false, false, false];
    
            function move(index){
                gameboard[index] = true;
                prevMoves[index] = true;
                console.log(name + prevMoves);
            }

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
                        printWinner();
                        return true;
                    }
                }
                return false;
            }
    
            return {
                name: name,
                symbol: symbol,
                prevMoves,
                move,
                determineWinner
            }
        }

        return {
            gameboard,
            player1,
            player2,
            tie
        }
    }

    
    function playGame(){
        if (document.querySelector("#player1").value == "" || document.querySelector("#player2").value == ""){
            document.querySelector("#messages").textContent = "Enter player names.";
        } else {
            const {gameboard, player1, player2, tie} = GameFactory(document.querySelector("#player1").value, document.querySelector("#player2").value);
            console.log({gameboard, player1, player2, tie});
            let currentPlayer = player1;
            const square = document.querySelectorAll("td");

            for (let i = 0; i < square.length; i++){
                square[i].addEventListener("click", () => {
                    if (gameboard[i] == false){
                        square[i].textContent = currentPlayer.symbol;
                        currentPlayer.move(square[i].id);
                    }
                    if (currentPlayer.determineWinner() == true || tie() == true){
                        for (let i = 0; i < gameboard.length; i++){
                            gameboard[i] = true;
                        }
                        console.log("game ended");
                        return;
                    }
                    console.log("gameboard" + gameboard);
                    if (currentPlayer == player1){
                        currentPlayer = player2;
                    } else {
                        currentPlayer = player1;
                    }
                });
            }
        }
    }


    const start = document.querySelector("#start");
    start.addEventListener("click", playGame);

    const restart = document.querySelector("#restart");
    restart.addEventListener("click", () => {
        const squares = document.querySelectorAll("td");
        for (let i = 0; i < squares.length; i++){
            squares[i].textContent = "";
        }
        document.querySelector("#messages").textContent = "";
        playGame();
    });
})();
