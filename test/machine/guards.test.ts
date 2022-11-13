import {beforeEach, describe, expect, it} from "vitest";
import {interpret, InterpreterFrom} from "xstate";
import {RobotMachine, RobotModel} from "../../src/machine/robotMachine";
import {Roles} from "../../src/types";

describe("machine/guards", () => {
    describe("canJoinTeamRobot", () => {
        let machine: InterpreterFrom<typeof RobotMachine>
        beforeEach(() => {
            machine = interpret(RobotMachine).start()
        })

        it('un membre rejoind la team', () => {
            expect(machine.send(RobotModel.events.join_team("1","idriss", 'MASTER' as Roles)).changed).toBe(true)
        })

        it('interdit l\'acces au 2éme id identique', () => {
            expect(machine.send(RobotModel.events.join_team("1","idriss", 'MASTER' as Roles)).changed).toBe(true)
            expect(machine.send(RobotModel.events.join_team("1","idriss", 'MASTER' as Roles)).changed).toBe(false)

        })

        it('interdit l\'acces au 2éme membre avec un meme role', () => {
            expect(machine.send(RobotModel.events.join_team("1","idriss", 'MASTER' as Roles)).changed).toBe(true)
            expect(machine.send(RobotModel.events.join_team("2","lonte", 'MASTER' as Roles)).changed).toBe(false)

        })

    })
})