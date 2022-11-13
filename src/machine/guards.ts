import {INSTRUCTIONS, RobotContext, RobotEvent, RobotEvents, RobotGuard, Roles} from "../types";

export  const  canJoinTeamGuard: RobotGuard<"join_team"> = (context, event) => {
    return context.membres.length <5
        && event.memberID !== '9625'
        && context.membres.find(m => m.id ===event.memberID) === undefined
        && context.membres.find(m => m.role ===event.role) === undefined
}

export  const  canResetConfGuard: RobotGuard<"reset"> = (context, event) => {
    return context.membres.find(m => m.id ===event.memberID) !== undefined
        && event.role === Roles.MASTER
}
export  const  canConfigureGuard: RobotGuard<"configure"> = (context, event) => {
    return event.memberID === '9625'
        || (context.membres.find(m => m.id ===event.memberID) !== undefined && (event.role === Roles.MASTER))

}
export  const  canGiveInstructionGuard: RobotGuard<"instruction"> = (context, event) => {
    if ([INSTRUCTIONS.AVANT, INSTRUCTIONS.DROITE,
        INSTRUCTIONS.CONFIGURE,INSTRUCTIONS.GAUCHE,
        INSTRUCTIONS.NEUTRE, INSTRUCTIONS.RETOUR,
        INSTRUCTIONS.START, INSTRUCTIONS.STOP
    ].includes(event.instruction)){
        if (context.membres.find(m => m.id ===event.memberID) === undefined) return false
        if (event.curentRole === null) return true
        return event.role <= event.curentRole
    }
    return false

}

export const canDeplaceGuard:RobotGuard<"deplacement"> = (context ,event) => {
    if(context.currentPosition.x < context.grid[0].length &&
        context.currentPosition.y < context.grid.length &&
        context.currentPosition.y > -1 &&
        context.currentPosition.x > -1) {

    }
    return false

}