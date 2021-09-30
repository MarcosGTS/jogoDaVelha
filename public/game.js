export default function createGame (){
    const state = {
        table: [[ "", "", "" ],
                [ "", "", "" ],
                [ "", "", "" ]],
        
        players: {
        },

        cores: ["red", "purple"],

        screen: {w: 3, h: 3},

        currentPlayer: "player1"
    }

    function addPlayer (player){
        const playerId = player.id
        const score = (player["score"]) ? player["score"] : 0
        const color = state.cores.pop()

        state.players[playerId] = {score, color}
    }

    function removePlayer(player){
        delete state.players[player]
    }
    
    function initState (newState) {
        Object.assign(state, newState)
    }

    function movePlayer (command) {
        const table = state.table
        const move = command.move

        //if (state.currentPlayer === command.player){
            if (table[move.y][move.x] == ""){
                table[move.y][move.x] = command.player
                console.log(`WINNER? -> ${verifyVictory()}`)
                updateCurrentPlayer(state.currentPlayer)
            }   
        
        //}
    }

    function updateCurrentPlayer(currentPlayer){
        for (const player in state.players){
            if ( player != currentPlayer ) 
                state.currentPlayer = player       
        }
    }

    //Pode ser melhorado
    //verificar apenas a linha do movimento e nao todos os elementos

    function verifyVictory (){
        const table = state.table
        for (let i = 0; i < state.screen.height; i++){
            if (table[i][0] == table[i][1] && table[i][1] == table[i][2] && table[i][0] != "")
                return true
            
        }
        for (let i = 0; i < state.screen.width; i++){
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

    return {
        state, 
        movePlayer,
        updateCurrentPlayer,
        initState,
        addPlayer,
        removePlayer
    }
}


