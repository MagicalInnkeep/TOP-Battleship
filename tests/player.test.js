import { Player } from "../src/classes/player";

it("Test Real Player",() => {
    const player1= new Player('Abe',true);
    expect(player1.name).toBe('Abe');
    expect(player1.human).toBe(true);
})

it("Test Ai Player",() => {
    const player1= new Player('Bismark',false);
    expect(player1.name).toBe('Bismark');
    expect(player1.human).toBe(false);
})

test("Test Targetting",()=> {
    const player1 = new Player('Bismark',false);

    // Mock callback to simulate AI behavior
    const mockCallback = jest.fn()
        .mockImplementationOnce(() => "AlreadyAttacked")
        .mockImplementationOnce(() => "Hit");  // This breaks the loop

    player1.aiTargetting(mockCallback);

    // It should have called the callback 2 times until it gets a valid shot
    expect(mockCallback).toHaveBeenCalledTimes(2);
});
