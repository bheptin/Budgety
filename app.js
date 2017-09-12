	//Budget Controller
var budgetController = (function() {

	//Some code

})();





	//UI Controller
var UIController = (function() {


	var DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn',
	};

	return {
		getInput: function() {

			return {
				 type: document.querySelector(DOMstrings.inputType).value, //Will be either inc or exp
				 description: document.querySelector(DOMstrings.inputDescription).value,
				 value: document.querySelector(DOMstrings.inputValue).value,
			};

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


	var ctrlAddItem = function() {
		//Get the field input data

		var input = UICtrl.getInput();
		console.log(input);

		//Add item to Controller

		//add item to UI

		//Calculate budget

		//Display the budget in the UI

	};

	return {
		init: function() {
			console.log('App has started');
			setupEventListeners();
		}
	}

})(budgetController, UIController);

controller.init();
