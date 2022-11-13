import {RobotAction} from "../types";
import {actions} from "xstate";

export const joinTeamRobotAction: RobotAction<"join_team"> = (context, event) => ({
    membres: [...context.membres, {id: event.memberID, name:event.name, role: event.role}]
})

export const resetConfAction: RobotAction<"reset"> = (context, event) => ({
    membres: [],
    configuration: null
})

export const configureAction: RobotAction<"configure"> = (context, event) => ({
    configuration: event.name

})

export const deplaceAction: RobotAction<"deplacement"> = ({grid, currentPosition}, {action})=>{
    const newGrid = grid.map((row, y) => row.map((v, x) => x))
    return {
        grid: newGrid
    }
}