import { isWebTarget } from "webpack-dev-server";
import { Gameboard } from "../src/classes/gameboard";
import { Ship } from "../src/classes/ship";

// Test for placeShip() basic: no preexisting ships

function shipPlaceTest(testCase){
    const ship = new Ship(testCase.name, testCase.size);
    const gameboard = new Gameboard();

    expect(gameboard.placeShip(ship,testCase.x,testCase.y,testCase.orient))
        .toBe(testCase.expected)
}

it("Basic placement",() =>{
    const testCase = { name: "BattleShip", size: 4, x: 0, y: 0, orient: "H", expected: true };
    shipPlaceTest(testCase);
});

it("Invalid placement: negative coordinates",() =>{
    const testCase = { name: "BattleShip", size: 4, x: -1, y: 0, orient: "H", expected: false };
    shipPlaceTest(testCase);
});

it("Correct placement",() =>{
    const testCase = { name: "BattleShip", size: 4, x: 5, y: 0, orient: "H", expected: true };
    shipPlaceTest(testCase);
});

it("Invalid placement: out of bounds Horizontal",() =>{
    const testCase = { name: "BattleShip", size: 4, x: 6, y: 0, orient: "H", expected: false };
    shipPlaceTest(testCase);
});

it("Correct placement Vertical",() =>{
    const testCase = { name: "BattleShip", size: 4, x: 6, y: 5, orient: "V", expected: true };
    shipPlaceTest(testCase);
});

it("Invalid placement: out of bounds Vertical",() =>{
    const testCase = { name: "BattleShip", size: 4, x: 6, y: 6, orient: "V", expected: false };
    shipPlaceTest(testCase);
});

// Test for placeShip() with preexisting ships

function shipPlaceTestAdvanced(testCase){
    const ship1 = new Ship(testCase.name1, testCase.size1);
    const ship2 = new Ship(testCase.name2, testCase.size2);
    const gameboard = new Gameboard();
    gameboard.placeShip(ship1,testCase.x1,testCase.y2, testCase.orient1);
    
    expect(gameboard.placeShip(ship2,testCase.x2,testCase.y2,testCase.orient2))
        .toBe(testCase.expected)
}

it("Valid Placement: no overlap",() =>{
    const testCase = { name1: "BattleShip", size1: 4, x1: 6, y1: 4, orient1: "V", name2: "Carrier", size2: 5, x2: 0, y2:0, orient2: "H", expected: true };
    shipPlaceTestAdvanced(testCase);
});

it("Invalid Placement: overlap",() =>{
    const testCase = { name1: "BattleShip", size1: 4, x1: 0, y1: 3, orient1: "V", name2: "Carrier", size2: 5, x2: 0, y2:0, orient2: "H", expected: false };
    shipPlaceTestAdvanced(testCase);
});

// Test for receiveAttack()


it("receiveAttack: hit",() =>{
    const testCase = {name: "BattleShip", size:4, x:0, y:0, orient: "H", hitx: 0, hity: 0, expected: "Hit"};
    const ship = new Ship(testCase.name, testCase.size);
    const gameboard = new Gameboard();
    gameboard.placeShip(ship, testCase.x, testCase.y, testCase.orient);

    expect(gameboard.receiveAttack(testCase.hitx, testCase.hity))
        .toBe(testCase.expected);
})

it("receiveAttack: miss",() =>{
    const testCase = {name: "BattleShip", size:4, x:0, y:0, orient: "H", hitx: 1, hity: 1, expected: "Miss"};
    const ship = new Ship(testCase.name, testCase.size);
    const gameboard = new Gameboard();
    gameboard.placeShip(ship, testCase.x, testCase.y, testCase.orient);

    expect(gameboard.receiveAttack(testCase.hitx, testCase.hity))
        .toBe(testCase.expected);
})
it("receiveAttack: already-hit",() =>{
    const testCase = {name: "BattleShip", size:4, x:0, y:0, orient: "H", hitx: 0, hity: 0, expected1: "Hit", expected2: "AlreadyAttacked"};
    const ship = new Ship(testCase.name, testCase.size);
    const gameboard = new Gameboard();
    gameboard.placeShip(ship, testCase.x, testCase.y, testCase.orient);

    expect(gameboard.receiveAttack(testCase.hitx, testCase.hity))
        .toBe(testCase.expected1);

    expect(gameboard.receiveAttack(testCase.hitx, testCase.hity))
        .toBe(testCase.expected2);
})

it("receiveAttack: already-hit",() =>{
    const testCase = {name: "BattleShip", size:4, x:0, y:0, orient: "H", hitx: 1, hity: 1, expected1: "Miss", expected2: "AlreadyAttacked"};
    const ship = new Ship(testCase.name, testCase.size);
    const gameboard = new Gameboard();
    gameboard.placeShip(ship, testCase.x, testCase.y, testCase.orient);

    expect(gameboard.receiveAttack(testCase.hitx, testCase.hity))
        .toBe(testCase.expected1);

    expect(gameboard.receiveAttack(testCase.hitx, testCase.hity))
        .toBe(testCase.expected2);
})