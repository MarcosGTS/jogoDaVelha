export function renderScreen(game, canvas, requestAnimationFrame) {
    const state = game.state
    const context = canvas.getContext('2d')
    context.clearRect(0, 0, 500, 500 )
    
    const WIDTH = Number(canvas.width)
    const HEIGHT = Number(canvas.height)

    for (let i = 0; i < state.screen.h; i++){
        for (let j = 0; j < state.screen.w; j++){
            const cell = state.table[i][j]
            const player = state.players[cell]
            
           if ( player ){
                const w = WIDTH / state.screen.w
                const h = HEIGHT / state.screen.h

                context.fillStyle = player.color
                context.fillRect(j*w, i*h, w, h)
           
           }   
        }
    }

    requestAnimationFrame(() => {
        renderScreen(game, canvas, requestAnimationFrame)
    })
    
}

// export function renderPlayers (game, playersList, requestAnimationFrame) {
//     let html = ""
//     for (const player in game.state.players){
//         html += `<p>${player}<p>`
//     }
//     playersList.innerHTML = html
//     requestAnimationFrame(() => {
//         renderPlayers(game, playersList, requestAnimationFrame)
//     })
// }