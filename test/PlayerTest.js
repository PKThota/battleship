const assert = require('assert');
const Player = require('../src/Player.js');

let test = {};

test["addShip should add the ship into the shipsData "] = function(){
  let player = new Player();
  player.addShip("submarine",3,[34,35,36]);
  assert.equal(player.totalShips,1);
}

test["addShip shouldn't add the ship if any of its positions are previously occuiped"] = function(){
  let player = new Player();
  player.addShip('submarine',3,[34,35,36]);
  player.addShip('carrier',3,[24,34,44]);
  assert.equal(player.totalShips,1);
}

exports.test = test;
