import {ContextFrom, EventFrom} from "xstate";
import {RobotModel} from "./machine/robotMachine";

export enum Roles {
    MASTER=0,
    SLAVE1 = 1,
    SLAVE2 = 2,
    SLAVE3 = 3,
    SLAVE4 = 4
}
export enum D_ACTIONS{
    DROITE = 'D',
    GAUCHE = 'G',
    AVANCER = 'A',
    NEUTRE = 'N',
    RECULER = 'R'
}

export type Membre = {
    id: string,
    name: string,
    role: Roles
}
export type Position ={
    x: bigint
    y: bigint
}
export  enum INSTRUCTIONS{
    DROITE = 'DROITE',
    GAUCHE = 'GAUCHE',
    AVANT = 'AVANT',
    RETOUR = 'RETOUR',
    NEUTRE = 'NEUTRE',
    STOP ='STOP',
    CONFIGURE = 'CONFIGURE',
    START = 'START'
}

export enum RobotStates {
    START = "START",
    CONFIG = "CONFIG",
    SCAN = "SCAN",
    CMD_VOCAL= "CMD_VOCAL",
    STOP = "STOP",
    RUN = "RUN",
    DEPLACEMENT = "DEPLACEMENT",
    MANEUVRE = "MANEUVRE",
    TATONE = "TATONE",
    ECOUTE = "ECOUTE",
    INFOS = "INFOS",
    NEUTRE = "NEUTRE"
}

export type CellEmpty = 'X'
export enum CELL_STATES {
    EMPTY= 'X',
    NOT_EMPTY= 'O',
    CURRENT_CELL= 'R'
}
export type CellState = CELL_STATES.EMPTY
    | CELL_STATES.NOT_EMPTY
    | CELL_STATES.CURRENT_CELL
    | D_ACTIONS.GAUCHE
    | "X" | "O" | "R"
export  type GridState = CellState[][]
export type RobotContext = ContextFrom<typeof RobotModel>
export  type RobotEvents = EventFrom<typeof RobotModel>
export type RobotEvent<T extends RobotEvents["type"]> = RobotEvents & {type: T}
export type RobotGuard<T extends RobotEvents["type"]> = (
    context: RobotContext,
    event: RobotEvent<T>
) => boolean

export type RobotAction<T extends RobotEvents["type"]> = (
    context: RobotContext,
    event: RobotEvent<T>
) => Partial<RobotContext>