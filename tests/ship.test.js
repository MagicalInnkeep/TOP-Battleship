import {ship} from '../src/classes/ship.js'

// Tests for ships creation

describe("Create ships", () => {
    test("it should return an object with properties name, size and hits", () => {
        const analyzeTestCases = [
            { input1: "BattleShip", input2: 4, expected: {name: "BattleShip", size:4, hits:0} },
            { input1: "Carrier", input2: 5, expected: {name: "Carrier", size:5, hits:0} },
            { input1: "Destroyer", input2: 3, expected: {name: "Destroyer", size:3, hits:0} },
        ];
        analyzeTestCases.forEach((testCase) => {
            const object = new ship(testCase.input1, testCase.input2);
            expect(object).toEqual(testCase.expected);
        })
    })
})

it("Error generation on invalid ship size",() => {
    expect(() => {const invalid = new ship("Error",0)}).toThrow();
});

// Test for isSunk() and therefor also hit().
it("Check if ship is sunk",() =>{
    const ship1 = new ship("BattleShip",4);
    expect(ship1.isSunk()).toBe(false);
    ship1.hit();
    expect(ship1.isSunk()).toBe(false);
    ship1.hit();
    expect(ship1.isSunk()).toBe(false);
    ship1.hit();
    expect(ship1.isSunk()).toBe(false);
    ship1.hit();
    expect(ship1.isSunk()).toBe(true);
    //Validate if extra hits dont impact 
    ship1.hit(); 
    expect(ship1).toEqual({name: "BattleShip", size: 4, hits: 4})
});
