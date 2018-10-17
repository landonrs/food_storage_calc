const assert = require('chai').assert;
const app = require('../app');
const sayHello = require('../app').sayHello;
const foodCalculator = require('../food');

describe("app", function() {
    it("should return hello", function() {
        let result = app.sayHello();
        assert.equal(result, 'hello');
    });

    it("should return a string type", function(){
        let result = app.sayHello();
        assert.typeOf(result, 'string');
    })
});


// Project unit tests
describe("Food Calculator", function() {
    it("should get name of food item from object", function(){
      var rice = foodCalculator.rice;
      assert.equal("Rice", rice.name);
    });
    it("should calculate the estimated needed amount", function(){
      var rice = foodCalculator.rice;
      assert.equal(270, rice.determineNeededAmount(30, [2, 2], 1));
    });
    it("should calculate the estimated cost of the food item amount", function(){
      var rice = foodCalculator.rice;
      rice.determineNeededAmount(30, [2, 2], 1);
      assert.equal(38.25, Math.round(rice.getEstimatedItemCost() * 100) / 100);
    });
  })