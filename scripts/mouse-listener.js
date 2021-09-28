export default function createInputListener(screen) {
    document.addEventListener("click", inputHandle)

    const state = {
        observers : []
    }

    function subscribe(observerFunction) {
        state.observers.push(observerFunction)
    }

    function notifyAll (command){
        for (const observerFunction of state.observers){
            observerFunction(command)
        }
    }

    function inputHandle(mouse){
        const x = mouse.x - SCREEN_OFFSET.x
        const y = mouse.y - SCREEN_OFFSET.y

        const xScale = WIDTH / screen.width
        const yScale = HEIGHT / screen.height

        
        for (let i = 0; i < screen.height; i++){
            for (let j = 0; j < screen.width; j++){
                const cellOrigin = {x: j * xScale, y: i * yScale}
                const cellEnd = {x: (j + 1) * xScale, y: (i + 1) * yScale}

                const command = {
                    player: "player1",
                    move: {y:i, x:j}
                }

                if( cellOrigin.y  <= y && y < cellEnd.y && cellOrigin.x <= x && x < cellEnd.x ){
                    notifyAll(command)
                    console.log("click evalueted")
                }
            }
        }    
    }

    return {
        state,
        subscribe
    }
}