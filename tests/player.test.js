import { player } from "../src/classes/player";

it("Test Real Player",() => {
    const player1= new player('Abe',true);
    expect(player1.name).toBe('Abe');
    expect(player1.human).toBe(true);
})

it("Test Ai Player",() => {
    const player1= new player('Bismark',false);
    expect(player1.name).toBe('Bismark');
    expect(player1.human).toBe(false);
})