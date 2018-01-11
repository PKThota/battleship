const assert = require('assert');
const Ship = require('../src/Ship.js');

let test = {}

test["isSunk should return true if all the positions of the ship are attacked"] = function(){
  let cruiser = new Ship("cruiser",3,[21,22,23]);
  cruiser.damagedAt(21);
  cruiser.damagedAt(22);
  cruiser.damagedAt(23);
  assert.ok(cruiser.isSunk());
}

test["isSunk should return false if not all the position of the ship are attacked"] = function(){
  let cruiser = new Ship("cruiser",3,[21,22,23]);
  cruiser.damagedAt(21);
  cruiser.damagedAt(22);
  assert.ok(!cruiser.isSunk());
}

test["areYouAt should return true if the ship is at that position"] = function(){
  let BattleShip = new Ship("Battle ship",4,[32,42,52,62]);
  assert.ok(BattleShip.areYouAt(32))
}

test["areYouAt should return false if the ship is not at that position"] = function(){
  let BattleShip = new Ship("Battle ship",4,[32,42,52,62]);
  assert.ok(!BattleShip.areYouAt(33))
}

exports.test = test;
