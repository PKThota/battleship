class Ship {
  constructor(name,noOfAttacksToSink,positions){
    this.name = name;
    this.noOfAttacksToSink = noOfAttacksToSink;
    this.positions = positions;
    this.damagedPositions = [];
  }
  get isSunk(){
    return this.damagedPositions.length == this.noOfAttacksToSink;
  }
  get hitAt(){
    return this.damagedPositions;
  }
  areYouAt(position){
    return this.positions.includes(position);
  }
  damagedAt(position){
    this.damagedPositions.push(position);
  }
}


module.exports = Ship;
