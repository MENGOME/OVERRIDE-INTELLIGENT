import {beforeEach, describe, expect, it} from "vitest";
import {interpret, InterpreterFrom} from "xstate";
import {makeRobot, RobotMachine, RobotModel} from "../../src/machine/robotMachine";
import {D_ACTIONS, RobotStates, Roles, Position} from "../../src/types";
import {canDeplaceGuard} from "../../src/machine/guards";

describe("machine/RobotMachine", () => {
    describe("Join_team", () => {
        let machine: InterpreterFrom<typeof RobotMachine>
        beforeEach(() => {
            machine = interpret(RobotMachine).start()
        })

        it(' quand un membre rejoind la team, la taille incremente', () => {
            expect(machine.send(RobotModel.events.join_team("1","idriss", Roles.MASTER)).changed).toBe(true)
            expect(machine.state.context.membres).toHaveLength(1)
            expect(machine.send(RobotModel.events.join_team("2","idriss", Roles.SLAVE1)).changed).toBe(true)
            expect(machine.state.context.membres).toHaveLength(2)
        })

    })

    describe("deplacement", () => {
        const machine =makeRobot(RobotStates.RUN, {
            membres: [{
                id: '1',
                name: "idriss",
                role: Roles.MASTER
            },{
                id: '2',
                name: 'lonte',
                role: Roles.SLAVE1
            }],
            membresCourant: '2',
            grid: [
                ["X", "X", "X", "X", "X", "X", "O", "X", "X", "X"],
                ["X", "O", "X", "X", "O", "X", "X", "X", "X", "X"],
                ["X", "X", "X", "O", "X", "O", "X", "X", "O", "O"],
                ["X", "X", "O", "X", "X", "X", "X", "X", "O", "X"],
                ["R", "X", "X", "X", "O", "O", "X", "X", "O", "X"],
                ["O", "O", "X", "X", "X", "X", "X", "X", "O", "X"],
                ["O", "X", "O", "X", "X", "X", "X", "X", "O", "X"],
                ["O", "X", "X", "X", "X", "O", "O", "O", "O", "X"],
                ["O", "O", "O", "O", "O", "O", "X", "X", "X", "X"],
                ["X", "X", "X", "X", "X", "X", "X", "O", "X", "X"],
                ["X", "X", "X", "O", "X", "X", "X", "X", "X", "X"],
            ]
        })

        it('possible de faire une action de deplacement', () =>{
            expect(canDeplaceGuard(machine.state.context, RobotModel.events.deplacement(D_ACTIONS.AVANCER))).toBe(true)
            //expect(machine.send(RobotModel.events.deplacement(D_ACTIONS.AVANCER, {x:0n, y:0n})).changed).toBe(true)
        })

    })
})