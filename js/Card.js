/***
* Klasa Card
*/
function Card(id, name) {
	const self = this;

	this.id = id;
	this.name = name || 'Bez nazwy';
	this.element = generateTemplate('card-template', { id: this.id, description: this.name }, 'li');

	//zdarzenia karty
	this.element.querySelector('.card').addEventListener('click', function (event) {
		event.stopPropagation();

		if (event.target.classList.contains('btn-delete')) {
			self.removeCard();
		}
	});
}
//metody
Card.prototype = {
	//usuwanie karty
	removeCard: function() {
		var self = this;

		fetch(baseUrl + '/card/' + self.id, { method: 'DELETE', headers: myHeaders })
		.then(function(resp) {
			return resp.json();
		})
		.then(function(resp) {
			self.element.parentNode.removeChild(self.element);
		})
	}
}
