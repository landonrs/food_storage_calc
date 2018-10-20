class FoodItem {
    constructor(name, costPerCan, cupsPerCan, mealRationAmount) {
    this.name = name;
    this.costPerCan = costPerCan;
    this.cupsPerCan = cupsPerCan;
    this.mealRationAmount = mealRationAmount;
    this.estimatedNeededAmount = 0;
    this.determineNeededAmount = function(storageLength, numPeople, percentOfDiet) {
        this.estimatedNeededAmount = 0;
        for(var i in numPeople){
            this.estimatedNeededAmount +=  (mealRationAmount[i] * numPeople[i]) * (percentOfDiet * 3) * storageLength;
        }
        return this.estimatedNeededAmount;
    };
    this.getEstimatedItemCost = function(){
        return Math.ceil(this.estimatedNeededAmount / this.cupsPerCan) * this.costPerCan;
    };
  
  };
  }
  
  var rice = new FoodItem("Rice", 4.25, 32, [.5, 1]);
  var refriedBeans = new FoodItem("Refried Beans", 4.25, 32, [.5, 1]);
  var potato = new FoodItem("Potato Flakes", 4.25, 32, [.5, 1]);
  var macaroni = new FoodItem("Macaroni", 4.25, 32, [.5, 1]);
  var flour = new FoodItem("Flour", 4.25, 32, [.5, 1]);
  var oats = new FoodItem("Oats", 4.25, 32, [.5, 1]);
  
  //This array holds the Items that have not been added to the table yet
  var unusedFoodItems = [rice, refriedBeans, potato];
  //This array holds the food items that have been added to the table
  var tableItems = [];

  function getUnusedFoodItems() {
      return unusedFoodItems;
  }
  
  
  

  
  module.exports = {rice: rice, potato: potato,FoodItem: FoodItem, unusedFoodItems: unusedFoodItems, tableItems: tableItems,
                    getUnusedFoodItems: getUnusedFoodItems};
