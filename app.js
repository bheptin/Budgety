	//Budget Controller
var budgetController = (function() {

	//Some code

})();





	//UI Controller
var UIController = (function() {

	//Some code

})();



	//Global App Controller
var controller = (function(budgetCtrl, UICtrl) {

	var ctrlAddItem = function() {
		//Get the field input data

		//Add item to Controller

		//add item to UI

		//Calculate budget

		//Display the budget in the UI

		console.log('it works');
	}

	document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

	document.addEventListener('keypress', function(event) {
		if (event.key === 13 || event.which === 13) {
			ctrlAddItem();
		}
	});

})(budgetController, UIController);
