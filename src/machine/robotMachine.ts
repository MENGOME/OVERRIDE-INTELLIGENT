import {createMachine, interpret, InterpreterFrom} from "xstate";
import {createModel} from "xstate/lib/model";
import {D_ACTIONS, GridState, INSTRUCTIONS, Membre, Position, RobotContext, RobotStates} from "../types";
import {canConfigureGuard, canJoinTeamGuard, canResetConfGuard} from "./guards";
import {configureAction, joinTeamRobotAction, resetConfAction} from "./actions";


export const RobotModel = createModel({
    membres: [] as Membre[],
    membresCourant: null as null |Membre['id'],
    configuration: null as null | string,
    direction: "x" as string | "y" as string,
    sens: 1 | -1,
    currentPosition: {x:5n, y:0n} as Position,
    grid: [
        ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
        ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
        ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
        ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
        ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
        ["R", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
        ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
        ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
        ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
        ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
        ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
    ] as GridState
},
    {
        events : {
            join_team: (memberID:Membre['id'],name:Membre['name'],role: Membre['role'])=> ({memberID, name, role}),
            configure: (memberID:Membre["id"], role: Membre["role"], name: string)=> ({memberID, role, name}),
            instruction: (memberID:Membre["id"], role: Membre["role"], instruction: INSTRUCTIONS, curentRole: Membre["role"], jeton: boolean)=> ({memberID, role, instruction, curentRole, jeton}),
            start: (memberID:Membre["id"], role: Membre["role"])=> ({memberID, role}),
            deplacement: (action: D_ACTIONS)=> ({action}),
            stop: (memberID:Membre["id"], role: Membre["role"])=> ({memberID, role}),
            reset: (memberID:Membre["id"], role: Membre["role"])=> ({memberID, role}),
            close_server: (ipServer: string) =>({ipServer}),
            close_network: (UIDNet: string) =>({UIDNet}),
            save_database: (ipDatabase: string, DatabaseName: string) =>({ipDatabase, DatabaseName}),
            clean_config: (ConfigName: string) =>({ConfigName}),
            check_server: (ipServer: string, serverName: string) =>({ipServer, serverName}),
            check_network: (uidNet: string) =>({uidNet}),
            check_dataBase: (ipDatabase: string, DatabaseName: string) =>({ipDatabase, DatabaseName}),
            check_config: (isSet:boolean) =>({isSet}),
            run: (configName: string) =>({configName}),
           }
    })


export const RobotMachine = RobotModel.createMachine({
    id: 'robot',
    context: RobotModel.initialContext,
    initial: RobotStates.START,
    states:{
        [RobotStates.START]:{
            on: {
                join_team: {
                    cond: canJoinTeamGuard,
                    actions: [RobotModel.assign(joinTeamRobotAction)],
                    target: RobotStates.CONFIG
                },
                check_server:{
                    target: RobotStates.START
                },
                check_network:{
                    target: RobotStates.START
                },
                check_dataBase:{
                    target: RobotStates.START
                },
                check_config:{
                    target:RobotStates.START
                },
                stop:{
                    target:RobotStates.START
                },
                run:{
                    target:RobotStates.RUN
                },
                configure:{
                    target:RobotStates.CONFIG
                }
            }
        },
        [RobotStates.STOP]:{
            on: {
                close_server:{
                    target: RobotStates.STOP
                },
                close_network:{
                    target: RobotStates.STOP
                },
                save_database:{
                    target: RobotStates.STOP
                },
                clean_config:{
                    target:RobotStates.STOP
                }
            }
        },
        [RobotStates.RUN]:{
            on:{
                instruction:{
                    target:RobotStates.RUN
                },

            }
        },
        [RobotStates.CONFIG]:{
            on:{
                configure:{
                    cond: canConfigureGuard,
                    actions: configureAction,
                    target:RobotStates.CMD_VOCAL
                },
                join_team:{
                    cond: canJoinTeamGuard,
                    actions: [RobotModel.assign(joinTeamRobotAction)],
                    target: RobotStates.CONFIG

                },
                reset:{
                    cond: canResetConfGuard,
                    actions: [RobotModel.assign(resetConfAction)],
                    target:RobotStates.START
                }
            }
        },
        [RobotStates.CMD_VOCAL]:{
        on:{
            configure:{
                target:RobotStates.CMD_VOCAL
            },
            join_team:{
                cond: canJoinTeamGuard,
                target: RobotStates.CONFIG
            },
            reset:{
                target:RobotStates.START
            }
        }
    }
    }
})

export function makeRobot (state: RobotStates = RobotStates.START, context: Partial<RobotContext> = {}) :InterpreterFrom<typeof RobotMachine> {
    const machine = interpret(
        RobotMachine.withContext({
            ...RobotModel.initialContext,
            ...context
        })
    ).start()
    machine.state.value = state
    return machine
}