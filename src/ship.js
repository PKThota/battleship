class Ship {
  constructor(name,noOfAttacksToSink,positions){
    this.name = name;
    this.noOfAttacksToSink = noOfAttacksToSink;
    this.positions = positions;
    this.hitAt = [];
  }
  get isSunk(){
    return this.hitAt.length == this.noOfAttacksToSink;
  }
  areYouAt(position){
    return this.positions.includes(position);
  }
  damagedAt(position){
    this.hitAt.push(position);
  }
}


module.exports = Ship;
