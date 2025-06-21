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

it("Invalid placement: negative coordinates",() =>{
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