const table = document.querySelector('table');


const sortTable = function (index, type) {
	const tbody = table.querySelector('tbody');

	const compare = function (rowA, rowB) {
		const rowDataA = rowA.cells[index].innerHTML;
		const rowDataB = rowB.cells[index].innerHTML;

		switch (type) {
			case 'integer':
				return rowDataA - rowDataB;
				break;
			case 'text':
				if (rowDataA < rowDataB) {
					return -1;
				} else if (rowDataA > rowDataB) {
					return 1;
				} else {
					return 0;
				}
				break;
		}
	}

	let rows = [].slice.call(tbody.rows);

	rows.sort(compare);

	table.removeChild(tbody);

	for (let i = 0; i < rows.length; i++) {
		tbody.appendChild(rows[i]);

	}

	table.appendChild(tbody);
};

table.addEventListener('click', (e) => {
	const el = e.target;
	if (el.nodeName != 'TH') return;
	const index = el.cellIndex;
	const type = el.getAttribute('data-type');
	sortTable(index, type);
});
