const assert = require('chai').assert;
const Player = require('../src/player.js');
const Ship = require('../src/ship.js');

let attack = function(player,positions){
  positions.forEach(position=>{player.shipDamagedAt(position)});
}

describe('player module',()=>{
  beforeEach('creating player',()=>{
    player = new Player("kalyan");
    player.addShip('cruiser',3,[15,25,35]);
    player.addShip('submarine',3,[36,37,38]);
    player.addShip('Battleship',4,[53,43,33,23]);
  })
  it('should return name when asked for name',()=>{
    assert.equal(player.name,'kalyan');
  });
  it('should return the list of ship objects',()=>{
    let expected = [];
    expected.push(new Ship('cruiser',3,[15,25,35]));
    expected.push(new Ship('submarine',3,[36,37,38]));
    expected.push(new Ship('Battleship',4,[53,43,33,23]));
    assert.deepEqual(expected,player.allShips);
  });
  it('should return the list of sunk ships',()=>{
    let expected = [];
    let ship = new Ship('cruiser',3,[15,25,35]);
    ship.damagedAt(15)
    ship.damagedAt(25)
    ship.damagedAt(35)
    expected.push(ship);
    attack(player,[15,25,35]);
    assert.deepEqual(player.getSunkShips,expected);
  });
  it('should return the count of sailingShips',()=>{
    assert.equal(player.sailingShips,3);
  })
  it('should lost if all ships are sunk',()=>{
    attack(player,[15,25,35,36,37,38,53,43,33,23]);
    assert.isOk(player.isLost);
  });
  it('should not lose if not all ships are sunk',()=>{
    attack(player,[15,25,35,36,37,38,53,43,33]);
    assert.isNotOk(player.isLost);
  });
  it('should give the positions attacked by opponent',()=>{
    let expected = [53,43,33,32,67,34,32];
    expected.forEach(pos=>player.attackedByOpponenentAt(pos));
    assert.deepEqual(player.getOpponentAttackedLocations,expected);
  })
  it('should give the positions player attacked',()=>{
    let expected = [23,42,1,5,65,4,6,20,8];
    expected.forEach(pos=>player.attackedOnOpponentAt(pos));
    assert.deepEqual(expected,player.getAttackedPositions);
  })
  it('should give the damaged positions of all ships',()=>{
    let expected = [36,38,25,43,23];
    expected.forEach((pos)=>player.shipDamagedAt(pos));
    assert.sameMembers(player.hitPositions,expected);
  })
  it('should return undefined when asked for a ship at position where there is no ship',()=>{
    assert.isUndefined(player.getShipAt(59));
  });
  it.skip('should return a ship object when asked to getShip',()=>{
    let ship = player.getShipAt(37);
    assert.isObject(ship);
    assert.include(ship,'name');
  });
})
