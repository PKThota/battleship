const Ship = require("./ship.js");

class Player {
  constructor(name) {
    this.playerName = name;
    this.ships = {};
    this.locationsAttacked = [];
    this.opponentAttackedLocations = [];
    this.sunkShips = {};
  }
  get allShips (){
    let ships = [];
    Object.keys(this.ships).forEach((shipName)=>{
      ships.push(this.ships[shipName]);
    });
    return ships;
  }
  get name(){
    return this.playerName;
  }
  get getSunkShips(){
    let ships = [];
    Object.keys(this.sunkShips).forEach((shipName)=>{
      ships.push(this.sunkShips[shipName]);
    });
    return ships;
  }
  get sailingShips(){
    return this.allShips.length;
  }
  get isLost(){
    return this.sailingShips == 0;
  }
  getShipAt(pos){
    return this.allShips.find((ship)=>{
      return ship.areYouAt(pos);
    });
  }
  doesThePositionOccupied(pos){
    return this.allShips.some(function(ship){
      return ship.areYouAt(pos);
    });
  }
  shipDamagedAt(position){
    let ship = this.getShipAt(position);
    ship.damagedAt(position);
    if(ship.isSunk){
      this.sunkShips[ship.name] = ship;
      delete this.ships[ship.name];
    }
  }
  addShip(name,noOfModules,positions){
    let ship = new Ship(name,noOfModules,positions);
    this.ships[name] = ship;
  }
  attackedByOpponenentAt(pos){
    this.opponentAttackedLocations.push(pos);
  }
  get getOpponentAttackedLocations(){
    return this.opponentAttackedLocations;
  }
  attackedOnOpponentAt(pos){
    this.locationsAttacked.push(pos);
  }
  get getAttackedPositions(){
    return this.locationsAttacked;
  }
}

module.exports = Player;
