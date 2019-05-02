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
	const name = prompt('Enter a column name');
	let data = new FormData();

	data.append('name', name);

	fetch(baseUrl + '/column', {
		method: 'POST',
		headers: myHeaders,
		body: data,
	})
	.then(function(resp) {
		return resp.json();
	})
	.then(function(resp) {
		const column = new Column(resp.id, name);
		board.addColumn(column);
	});
});

//funkcja inicjalizujaca sortable.js na elemencie
function initSortable(id) {
	const el = document.getElementById(id);
	const sortable = Sortable.create(el, {
		group: 'kanban',
		sort: true
	});
}
