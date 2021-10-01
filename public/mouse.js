export default function createInputListener(document, gameState, canvas, playerId) {
    
    document.addEventListener("click", inputHandle)
    const screen = gameState.screen
    
    const canvasObj = {
        offset: {
            x: canvas.offsetLeft,
            y: canvas.offsetTop
        },
        size: {
            w: Number(canvas.width),
            h: Number(canvas.height)
        },
        cellSize: {
            w: Number(canvas.width) / screen.w,
            h: Number(canvas.height) / screen.h
        }
    }

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

    function isInBetween (command){
        const {x, y} = command
        const {originX, originY} = command
        const {endX, endY} = command

        return (originY  <= y && y < endY) && (originX <= x && x < endX);
    }

    function inputHandle(mouse){
        const relativeX = mouse.x - canvasObj.offset.x
        const relativeY = mouse.y - canvasObj.offset.y
        
        for (let i = 0; i < screen.h; i++){
            for (let j = 0; j < screen.w; j++){
                const coordinate = {
                    x: relativeX,
                    y: relativeY,
                    originX: j * canvasObj.cellSize.w,
                    originY: i * canvasObj.cellSize.h,
                    endX: (j + 1) * canvasObj.cellSize.w,
                    endY: (i + 1) * canvasObj.cellSize.h
                }

                const command = {
                    player: playerId,
                    move: {y:i, x:j}
                }

                if( isInBetween(coordinate) ){
                    notifyAll(command)
                }
            }
        }    
    }

    return {
        state,
        subscribe
    }
}
