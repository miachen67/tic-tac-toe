function initializeGame(name1, name2){
    let gameboard = [false, false, false, false, false, false, false, false, false];
    let player1 = createPlayer(name1, "X");
    let player2 = createPlayer(name2, "O");
    return {
        gameboard,
        player1,
        player2
    }
}

function move(index){
    initializeGame.gameboard[index] = true;
    createPlayer.moves[index] = true;
}

function determineWinner(player){
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
            if (winningCombos[i][j] && player.moves[j]){
                tester.push(true);
            } else {
                tester.push(false);
            }
        }
        if (tester.equals(winningCombos[i])){
            player.winner();
            return true;
        }
    }
    return false;
}

function Player(name, symbol){
    let moves = [false, false, false, false, false, false, false, false, false];
    return {
        name: name,
        symbol: symbol,
        moves,
        winner: function(){
            console.log(name + " is the winner!")
        }
    }
}

