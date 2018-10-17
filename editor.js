  function setUpPage(){
      insertNumbersIntoSelect();
      insertFoodItems();
      add_listeners();
  }
  
  function insertNumbersIntoSelect(){
      var numChildrenSelect = document.getElementById('childrenSelect');
      var numAdultSelect = document.getElementById('adultSelect');
  
      for (var i = 0; i<=50; i++){
          var childNumberOption = document.createElement('option');
          var adultNumberOption = document.createElement('option');
          childNumberOption.value = i;
          adultNumberOption.value = i;
  
          childNumberOption.innerHTML = i;
          adultNumberOption.innerHTML = i;
          
          numChildrenSelect.appendChild(childNumberOption);
          numAdultSelect.appendChild(adultNumberOption);
      }
  };

  function insertFoodItems(){
      var foodSelection = document.getElementById("food-items");
      foodSelection.innerHTML = "";
      if (unusedFoodItems.length != 0){
        for(var i = 0; i < unusedFoodItems.length; i++){
            let foodOption = document.createElement('option');
            foodOption.value = i;
            foodOption.innerHTML = unusedFoodItems[i].name;
            foodSelection.appendChild(foodOption);
        }
    }

  }

  function add_listeners(){
    var add_button = document.getElementById("add-food-button");
    add_button.addEventListener("touchend", add_item);
    
  }

  var percentages = 
  `<option value=0>0%</option>
  <option value=.1>10%</option>
  <option value=.2>20%</option>
  <option value=.3>30%</option>
  <option value=.4>40%</option>
  <option value=.5>50%</option>
  <option value=.6>60%</option>
  <option value=.7>70%</option>
  <option value=.8>80%</option>
  <option value=.9>90%</option>
  <option value=1>100%</option>`;

  function add_item(){
      if (unusedFoodItems.length != 0) {
        var table = document.getElementById("food-table");
        // get the index of the foodItem option that is selected
        var foodSelect = document.getElementById("food-items");
        var optionIndex = foodSelect.options[foodSelect.selectedIndex].value;
        // get the foodItem using the index
        var foodChoice = unusedFoodItems[optionIndex];
        // add new row with the item
        var row = document.createElement('TR');
        row.innerHTML = `
        <td>${foodChoice.name}</td>
        <td><select id="${foodChoice.name}-per" class="percentage" onchange="updateTable()">${percentages}</select></td>
        <td id="estimated-amount-${foodChoice.name}"></td>
        <td id="estimated-cost-${foodChoice.name}"></td>
        <td><img src="remove-item.png" id="remove-food-button-${foodChoice.name}"></td>`;
        table.appendChild(row);

        // add item to array of items on table remove from unused items
        tableItems.push(foodChoice);
        unusedFoodItems.splice(optionIndex, 1);
        insertFoodItems();
      }

  }

  function remove_item(){
      
  }

  function updateTable(){
    // get storage length
    var storageSelect = document.getElementById("storageSelect");
    var storageLength = storageSelect.options[storageSelect.selectedIndex].value;
    // get number of children
    var childrenSelect = document.getElementById("childrenSelect");
    var numChildren = childrenSelect.options[childrenSelect.selectedIndex].value;
    //get number of adults
    var adultSelect = document.getElementById("adultSelect");
    var numAdults = adultSelect.options[adultSelect.selectedIndex].value;

    var estimatedAmount = 0;
    var estimatedCost = 0;
    var totalCost = 0;

    tableItems.forEach(item => {
        let percentOptions = document.getElementById(item.name + "-per");
        let percent = percentOptions.options[percentOptions.selectedIndex].value;

        estimatedAmount = item.determineNeededAmount(storageLength, [numChildren, numAdults], percent).toFixed(1);
        document.getElementById("estimated-amount-" + item.name).innerHTML = estimatedAmount + " cups";

        estimatedCost = item.getEstimatedItemCost();
        document.getElementById("estimated-cost-" + item.name).innerHTML = "$" + estimatedCost.toFixed(2);

        totalCost += estimatedCost;
    });

    document.getElementById("total-cost").innerHTML = "Total Estimated Cost: $" + totalCost.toFixed(2);
    console.log("Table updated!");
  }