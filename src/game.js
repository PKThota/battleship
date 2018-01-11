const Player = require('./player');

class Game {
  constructor() {
    this.players = [];
    this._status = {};
    this.currentPlayerIndex = 0;
    this.nextPlayerIndex = 1;
  }
  get status(){
    return this._status;
  }
  addPlayer(name){
    this.players.push(new Player(name));
  }
  get getPlayers(){
    return this.players;
  }
  get currentPlayer(){
    return this.players[this.currentPlayerIndex];
  }
  get nextPlayer(){
    return this.players[this.nextPlayerIndex];
  }
  addShip (playerName,shipName,noOfModules,positions){
    let player = this.players.find((player)=>player.name == playerName);
    player.addShip(shipName,noOfModules,positions);
  }
  updateStatus(){
    let currentPlayer = this.currentPlayer;
    let nextPlayer = this.nextPlayer;
    this._status.hasCompleted = false;
    if(currentPlayer.isLost){
      this._status.hasCompleted = true;
      this._status.winner = nextPlayer;
      this._status.message = `${nextPlayer.name} Won`;
    }else if(nextPlayer.isLost){
      this._status.hasCompleted = true;
      this._status.winner = currentPlayer;
      this._status.message = `${currentPlayer.name} Won`;
    }else{
      this._status.message = `${currentPlayer.name}'s turn`;
    }
    this._status.hitPositions = this.players.reduce(function(hitPositions,player){
      hitPositions[player.name] = player.hitPositions
      return hitPositions;
    },{});
  }
  updatePlayers(){
    this.nextPlayerIndex = this.currentPlayerIndex;
    this.currentPlayerIndex = 1 - this.currentPlayerIndex;
  }
  storeAttackedPosition(pos){
    this.currentPlayer.attackedOnOpponentAt(pos);
    this.nextPlayer.attackedByOpponenentAt(pos);
  }
  attack(pos){
    let currentPlayer = this.currentPlayer;
    let nextPlayer = this.nextPlayer;
    this.storeAttackedPosition(pos);
    this.updatePlayers();
    this.updateStatus();
  }
}

module.exports = Game;
