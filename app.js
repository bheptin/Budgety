	//Budget Controller - all budget related functions set in IIFE including Data structure
var budgetController = (function() {

	var Expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	}

	var Income = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	}

	var calculateTotal = function(type) {
		var sum = 0;
		data.allItems[type].forEach(function(cur) {
			sum += cur.value;
		});
		data.totals[type] = sum;
	}

	//data structure
	var data = {
			allItems: {
				exp: [],
				inc: [],
			},
			totals: {
				exp: 0,
				inc: 0
			},
			budget: 0,
			percentage: -1
	};

	return {
		addItem: function(type, des, val) {
			var newItem, ID;

			//create new ID
			if (data.allItems[type].length > 0) {
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			} else {
				ID = 0;
			}


			//Create new item based on the 'inc' or 'exp' type
			if (type === 'exp') {
				newItem = new Expense(ID, des, val);
			} else if (type === 'inc') {
				newItem = new Income(ID, des, val);
			}

			//Push it into data structure
			data.allItems[type].push(newItem);

			//Return new Element
			return newItem;
		},

		calculateBudget: function() {

			//calculate total income and total expense
				calculateTotal('exp');
				calculateTotal('inc');

			//calculate total budeget: income - expenses
				data.budget = data.totals.inc - data.totals.exp;

			//calculate the percentage of income we spent
			if (data.totals.inc > 0) {
				data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
			} else {
				data.percentage = -1;
			}


		},
		getBudget: function() {
				return {
					budget: data.budget,
					totalInc: data.totals.inc,
					totalExp: data.totals.exp,
					percentage: data.percentage
				}
		},

		testing: function() {
			console.log(data);
		}
	};

})();



	//UI Controller
var UIController = (function() {


	var DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn',
		incomeContainer: '.income__list',
		expensesContainer: '.expenses__list',
	};

	return {
		getInput: function() {

			return {
				 type: document.querySelector(DOMstrings.inputType).value, //Will be either inc or exp
				 description: document.querySelector(DOMstrings.inputDescription).value,
				 value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
			};

		},

		addListItem: function(obj, type) {
			var html, newHtml, element;
			//Create HTML string with placeholder tags
		if (type === 'inc') {
			element = DOMstrings.incomeContainer;
			html = `<div class="item clearfix" id="income-%id%"><div class="item__description">%Description%</div>
			        <div class="right clearfix"><div class="item__value">%Value%</div>
			        <div class="item__delete"><button class="item__delete--btn"><i class="fa fa-trash" aria-hidden="true"></i></button>
			</div></div></div>`
		} else if (type === 'exp') {
			element = DOMstrings.expensesContainer;
			html = `<div class="item clearfix" id="expense-%id%"><div class="item__description">%Description%</div>
					    <div class="right clearfix"><div class="item__value">%Value%</div><div class="item__percentage">21%</div>
					    <div class="item__delete"><button class="item__delete--btn"><i class="fa fa-trash" aria-hidden="true"></i></button>
					    </div></div></div>`
		}


			//Replace placeholder text with actual data
			newHtml = html.replace('%id%', obj.id );
			newHtml = newHtml.replace('%Description%', obj.description);
			newHtml = newHtml.replace('%Value%', obj.value);

			//Insert HTML into the DOM
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
		},

		//Clearing the input fields with prototype, slice, and array.
		clearFields: function() {
			var fields, fieldsArr;

			fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);


			fieldsArr = Array.prototype.slice.call(fields);

			fieldsArr.forEach(function(current, index, array) {
				current.value = "";
			});

			fieldsArr[0].focus();
		},
			getDOMstrings: function() {
				return DOMstrings;
			}
	};

})();



	//Global App Controller
var controller = (function(budgetCtrl, UICtrl) {

	var setupEventListeners = function() {
		var DOM = UICtrl.getDOMstrings();

		document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

		document.addEventListener('keypress', function(event) {
			if (event.key === 13 || event.which === 13) {
				ctrlAddItem();
			}

		});
	};

	var updateBudget = function() {

		//Calculate budget
		budgetCtrl.calculateBudget();

		//Return the budget
		var budget = budgetCtrl.getBudget();
		console.log(budget);

		//Display the budget in the UI

	}

	var ctrlAddItem = function() {
		var input, newItem;

		//Get the field input data
		input = UICtrl.getInput();
		console.log(input);

		if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
			//Add item to Controller
			newItem = budgetCtrl.addItem(input.type, input.description, input.value);
			//add item to UI
			UICtrl.addListItem(newItem, input.type);

			//Clear the fields
			UICtrl.clearFields();

			// Calculate and Update budget
			updateBudget();
		}



	};

	return {
		init: function() {
			console.log('App has started');
			setupEventListeners();
		}
	}

})(budgetController, UIController);

controller.init();
