const assert = require('chai').assert;
const Ship = require('../src/Ship.js');

describe("ship should tell about itself",()=>{
  beforeEach(()=>{
    cruiser = new Ship("cruiser",3,[21,22,23]);
  });

  it("should tell whether it is sink or not",()=>{
    cruiser.damagedAt(21);
    cruiser.damagedAt(22);
    cruiser.damagedAt(23);
    assert.isOk(cruiser.isSunk);
  });

  it("should return false for isSunk when it isnot sunk yet.",()=>{
    cruiser.damagedAt(21);
    cruiser.damagedAt(22);
    assert.isNotOk(cruiser.isSunk);
  });

  it("should tell whether it is on given position",()=>{
    assert.isOk(cruiser.areYouAt(22));
    assert.isNotOk(cruiser.areYouAt(40));
  });

  it("it should store the hit positions",()=>{
    cruiser.damagedAt(22);
    cruiser.damagedAt(23);
    assert.include(cruiser.hitAt,22);
    assert.include(cruiser.hitAt,23);
  });
});
