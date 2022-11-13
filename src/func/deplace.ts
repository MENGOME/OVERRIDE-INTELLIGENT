import {CELL_STATES, GridState, Position} from "../types";

export function getCurrentPosition(grid:GridState): Position{
    for (let x =0; x < grid[0].length; x++){
        for (let y = grid.length -1; y>= 0; y--){
            if (grid[y][x] === CELL_STATES.CURRENT_CELL){
                return {x:BigInt(x), y:BigInt(y)}
            }
        }
    }
    return {x:-1n, y:-1n}
}