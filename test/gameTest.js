const assert = require('chai').assert;
const Player = require('../src/player.js');
const Game = require('../src/game.js');

describe("game stores two players and performs following:",()=>{
  beforeEach(()=>{
    game = new Game();
  });
  it("should store two player details.",()=>{
    game.addPlayer("harvar");
    game.addPlayer("pawan");
    let expected = [];
    expected.push(new Player("harvar"));
    expected.push(new Player("pawan"));
    assert.deepEqual(game.getPlayers,expected);
  });
  it("player joined first becomes the current player, when game starts",()=>{
    game.addPlayer("harvar");
    game.addPlayer("pawan");
    let harvar = new Player("harvar");
    let pawan = new Player("pawan");
    assert.deepEqual(game.currentPlayer,harvar);
    assert.deepEqual(game.nextPlayer,pawan);
  });
  it("after an attack, game updates the currentPlayer.",()=>{
    game.addPlayer("harvar");
    game.addPlayer("pawan");
    let harvar = new Player("harvar");
    let pawan = new Player("pawan");
    game.addShip("pawan","cruiser",3,[21,22,23]);
    pawan.addShip("cruiser",3,[21,22,23]);
    game.attack(22);
    harvar.attackedOnOpponentAt(22);
    pawan.attackedByOpponenentAt(22);
    assert.deepEqual(game.currentPlayer,pawan);
    assert.deepEqual(game.nextPlayer,harvar);
  });
});
