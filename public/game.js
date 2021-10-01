export default function createGame (){
    const state = {
        table: [[ "", "", "" ],
                [ "", "", "" ],
                [ "", "", "" ]],
        
        players: {
        },

        colors: ["red", "purple"],

        screen: {w: 3, h: 3},

        currentPlayer: null
    }

    const observers = []

    function subscribe(observerFunction) {
        observers.push(observerFunction)
    }

    function notifyAll (command){
        for (const observerFunction of observers){
            observerFunction(command)
        }
    }

    function addPlayer (command){
        const playerId = command.id
        const score = ("score" in command) ? command["score"] : 0
        const color = ("color" in command) ? command.color : state.colors.pop()

        state.players[playerId] = {score: score, color: color}

        notifyAll({
            emitType: "add-player",
            command: {
                id: playerId,
                score: score,
                color: color
            }
        })
    }

    function removePlayer(command){
        const playerId = command.id
        const playerColor = state.players[playerId].color
        
        if (playerColor)
            state.colors.push(playerColor)
       
        delete state.players[playerId]

        notifyAll({
            emitType: "remove-player",
            command:{
                id: playerId
            }
        })
    }
    
    function initState (newState) {
        Object.assign(state, newState)
    }
    //SOLUCAO: antes de efetuar o movimento verificar se o jogador esta entre os players
    function movePlayer (command) {
        const table = state.table
        const move = command.move
        const currentPlayer = state.currentPlayer

        if (command.player in state.players && (!currentPlayer || currentPlayer != `${command.player}`)){
            if (table[move.y][move.x] == ""){
                table[move.y][move.x] = command.player
                
                state.currentPlayer = command.player
            }  
        }

        if (verifyVictory()) {
            console.log (`Winner ${currentPlayer}`)
            resetGame()
        }else {
            notifyAll({
                emitType: "move-player",
                command: command
            })
        }
    }

    function updateCurrentPlayer(){
        const players = Object.keys(state.players)
        for (const player of players){
            console.log(player)
            if (player != state.currentPlayer){
                state.currentPlayer = player
                break;
            }
        }
    }

    //Pode ser melhorado
    //verificar apenas a linha do movimento e nao todos os elementos

    function verifyVictory (){
        const table = state.table

        if (!state.currentPlayer in state.players){
            return true
        }

        for (let i = 0; i < state.screen.h; i++){
            if (table[i][0] == table[i][1] && table[i][1] == table[i][2] && table[i][0] != "")
                return true
            
        }
        for (let i = 0; i < state.screen.w; i++){
            if (table[0][i] == table[1][i] && table[1][i] == table[2][i]  && table[0][i] != "")
                return true
            
        }

        if (table[0][0] == table[1][1] && table[1][1] == table[2][2]  && table[0][0] != ""){
            return true
        }

        if (table[2][0] == table[1][1] && table[1][1] == table[0][2]  && table[2][0] != ""){
            return true
        }

        

        return false
    }

    function resetGame (){
        for (let i = 0; i < state.screen.h; i++){
            for (let j = 0; j < state.screen.w; j++){
                state.table[i][j] = ""
            }
        }
        state.currentPlayer = null

        notifyAll({
            emitType: "reset-game",
        })
    }

    return {
        state, 
        movePlayer,
        updateCurrentPlayer,
        initState,
        addPlayer,
        removePlayer,
        subscribe, 
        notifyAll,
        resetGame
    }
}


