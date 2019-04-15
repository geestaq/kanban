'use strict';
document.addEventListener('DOMContentLoaded', function() {

	/***
	* Klasa Column
	*/
	function Column(name) {
		const self = this;

		this.id = randomString();
		this.name = name;
		this.element = generateTemplate('column-template', { id: this.id, name: this.name });

		//zdarzenie kolumny
		this.element.querySelector('.column').addEventListener('click', function (event) {
			//usuwanie kolumny
			if (event.target.classList.contains('btn-delete')) {
				self.removeColumn();
			}
			//dodawanie nowej karty
			if (event.target.classList.contains('add-card')) {
				self.addCard(new Card(prompt("Podaj nazwę karty")));
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
	    	this.element.parentNode.removeChild(this.element);
	    }
	};
	//Klasa Column

	/***
	* Klasa Card
	*/
	function Card(description) {
		const self = this;

		this.id = randomString();
		this.description = description;
		this.element = generateTemplate('card-template', { id: this.id, description: this.description }, 'li');

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
			this.element.parentNode.removeChild(this.element);
	    }
	}
	//Klasa Card

	//tablica
	let board = {
	    name: 'Kanban Board',
		//dodaje kolumne
	    addColumn: function(column) {
			this.element.appendChild(column.element);
			initSortable(column.id);
	    },
	    element: document.querySelector('#board .column-container')
	};

	//dodawanie nowej kolumny
	document.querySelector('#board .create-column').addEventListener('click', function() {
	    const name = prompt('Podaj nazwę kolumny');
	    const column = new Column(name);
	    board.addColumn(column);
	});

	// CREATING COLUMNS
	var todoColumn = new Column('To do');
	var doingColumn = new Column('Doing');
	var doneColumn = new Column('Done');
//console.log(todoColumn);
//console.log(doingColumn);

	// ADDING COLUMNS TO THE BOARD
	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);

	// CREATING CARDS
	var card1 = new Card('New task');
	var card2 = new Card('Create kanban boards');

	// ADDING CARDS TO COLUMNS
	todoColumn.addCard(card1);
	doingColumn.addCard(card2);

	//funkcja inicjalizujaca sortable.js na elemencie
	function initSortable(id) {
//console.log(id);
		var el = document.getElementById(id);
//console.log(el);
		var sortable = Sortable.create(el, {
			group: 'kanban',
			sort: true
		});
	}
	//funkcja generuje losowy 10 znakowy string
	function randomString() {
	    const chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
	    let str = '';
	    for (let i = 0; i < 10; i++) {
	        str += chars[Math.floor(Math.random() * chars.length)];
	    }
	    return str;
	}

	//funkcja zwraca element html wygenerowany na podstawie szablonu mustache
	function generateTemplate(name, data, basicElement) {
		const template = document.getElementById(name).innerHTML;
		const element = document.createElement(basicElement || 'div');

		Mustache.parse(template);
		element.innerHTML = Mustache.render(template, data);

		return element;
	}
});
