//cors proxy
const cors = "https://cors-anywhere.herokuapp.com/";
//adres api
const baseUrl = cors + 'https://kodilla.com/pl/bootcamp-api';
//naglowki requesta
const myHeaders = {
  'X-Client-Id': '3914',
  'X-Auth-Token': '28a6ffc7d76399e4071482670afb0f0f'
};

fetch(baseUrl + '/board', { headers: myHeaders })
	.then(function(resp) {
		return resp.json();
	})
	.then(function(resp) {
		setupColumns(resp.columns);
});

//funkcja generuje kolumny
function setupColumns(columns) {
	columns.forEach(function(column) {
		const col = new Column(column.id, column.name);
		board.addColumn(col);
		setupCards(col, column.cards);
	});
}

//funkcja generuje karty
function setupCards(col, cards) {
	cards.forEach(function (card) {
		const cardObj = new Card(card.id, card.name);
		col.addCard(cardObj);
	});
}

//funkcja zwraca element html wygenerowany na podstawie szablonu mustache
function generateTemplate(name, data, basicElement, elementClasses) {
	const template = document.getElementById(name).innerHTML;
	const element = document.createElement(basicElement || 'div');

	Mustache.parse(template);
	element.innerHTML = Mustache.render(template, data);

	//dodanie klas do elementu
	elementClasses = elementClasses || [];
	if(elementClasses.length > 0) {
		for(let i in elementClasses) {
			element.classList.add(elementClasses[i]);
		}
	}

	return element;
}
