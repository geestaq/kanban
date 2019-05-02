/***
* Klasa Column
*/
function Column(id, name) {
	const self = this;

	this.id = id;
	this.name = name || 'Bez nazwy';
	this.element = generateTemplate('column-template', { id: this.id, name: this.name }, 'div', ['col-lg-4','col-md-6','col-sm-12']);

	//zdarzenie kolumny
	this.element.querySelector('.column').addEventListener('click', function (event) {
		//usuwanie kolumny
		if (event.target.classList.contains('btn-delete')) {
			self.removeColumn();
		}
		//dodawanie nowej karty
		if (event.target.classList.contains('add-card')) {
			var cardName = prompt("Podaj nazwę karty");
			event.preventDefault();

			let data = new FormData();
			data.append('name', cardName);
			data.append('bootcamp_kanban_column_id', self.id);

			fetch(baseUrl + '/card', {
				method: 'POST',
				headers: myHeaders,
				body: data
			})
			.then(function(res) {
				return res.json();
			})
			.then(function(resp) {
				const card = new Card(resp.id, cardName);
    			self.addCard(card);
			});
		}
	});
}
//metody
Column.prototype = {
	//dodanie karty
	addCard: function(card) {
		this.element.querySelector('ul').appendChild(card.element);
	},
	//usuniecie kolumny
	removeColumn: function() {
		var self = this;
		fetch(baseUrl + '/column/' + self.id, { method: 'DELETE', headers: myHeaders })
		.then(function(resp) {
			return resp.json();
		})
		.then(function(resp) {
			self.element.parentNode.removeChild(self.element);
		});
	}
};
