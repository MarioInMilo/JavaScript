let products = [
	{
		'id': 1,
		'name': 'туфли',
		'firm': 'adidas',
		'color': 'red',
		'cost': 200
	},


	{
		'id': 2,
		'name': 'кроссовки',
		'firm': 'nike',
		'color': 'blue',
		'cost': 100
	},

	{
		'id': 3,
		'name': 'ботинки',
		'firm': 'timberland',
		'color': 'black',
		'cost': 300
	}
];

let colors = ['red', 'black', 'blue'];
let names = ['ботинки', 'кроссовки', 'туфли'];
// ////////////////////////////////////////////////
init();
getMaxID();

function init() {
	let colorsL = document.querySelector("#prod__color");
	for (let i = 0; i < colors.length; i++) {
		let option = document.createElement('option');
		option.text = colors[i];
		option.value = colors[i];
		colorsL.add(option);
	}

	let namesL = document.querySelector('#prod__name');
	for (let k = 0; k < names.length; k++) {
		let option2 = document.createElement('option');
		option2.text = names[k];
		option2.value = names[k];
		namesL.add(option2);
	}

	for (let j = 0; j < products.length; j++) {
		let productAdd = products[j];
		addRow(productAdd);
	}

};



function addRow(add) {
	let tempUser = `
	<tr class="tr-${add.id}">
		<td id="name__id">${add.name}</td>
		<td id="firm__id">${add.firm}</td>
		<td id="color__id">${add.color}</td>
		<td id="cost__id">${add.cost}</td>
		<td>
			<button class="button__update" id="button__update__${add.id}" data-userid="${add.id}" onclick="upBut('${add.id}')">Update</button>	
			<button class="button__delete" id="button__delete__${add.id}" data-userid="${add.id}" onclick="delBut('${add.id}')">Delete</button>

		</td>
	</tr>`;

	let tableProd = document.querySelector('.table__prod');
	tableProd.innerHTML = tableProd.innerHTML + tempUser;
};


function addNewProd() {
	let temp = createrProd();
	addRow(temp);
	products.push(temp);

};



function createrProd() {
	let name = document.getElementById('prod__name');
	let firm = document.getElementById('prod__firm');
	let color = document.getElementById('prod__color');
	let cost = document.getElementById('prod__cost');

	let user = new Object();
	user.id = (getMaxID() * 1) + 1;
	user.name = name.value;
	user.firm = firm.value;
	user.color = color.value;
	user.cost = cost.value;

	return user;
}

function getMaxID() {
	let maxId = 0;
	for (let i = 0; i < products.length; i++) {
		let id = products[i].id;
		if (id > maxId) {
			maxId = id;
		}
	}
	return maxId;
};

function upBut(id) {
	let prod = takeProd(id);
	let button = document.getElementById(`button__update__${prod.id}`);
	if (button.innerText == "Update") {
		document.getElementById("prod__name").value = prod.name;
		document.getElementById("prod__firm").value = prod.firm;
		document.getElementById("prod__color").value = prod.color;
		document.getElementById("prod__cost").value = prod.cost;
		resUploadBut(id);
		button.innerText = "Save";
	} else if (button.innerText == "Save") {
		saveNewInfo(id);
		paramChange(id);
		clearInpur();

	}
};



function saveNewInfo(prod) {
	let name = document.getElementById("prod__name");
	let firm = document.getElementById("prod__firm");
	let color = document.getElementById("prod__color");
	let cost = document.getElementById("prod__cost");

	// console.log(name.value + " " + firm.value + " " + color.value + " " + cost.value);

	for (let i = 0; i < products.length; i++) {
		if (prod == products[i].id) {
			// console.log("saveInfo");
			products[i].name = name.value;
			products[i].firm = firm.value;
			products[i].color = color.value;
			products[i].cost = cost.value;
		}
	}

};


function takeProd(id) {
	for (let i = 0; i < products.length; i++) {
		let prod = products[i];
		if (prod.id == id) {
			return prod;
		}
	}
	return console.log('function takeProd ERROR');
};


function delBut(id) {
	let delButAr = document.querySelectorAll('.button__delete');

	for (let i = 0; i < delButAr.length; i++) {
		delButAr[i].onclick = function (e) {
			let userId = e.target.dataset.userid;
			let rowForDelete = document.querySelector(`.tr-${userId}`);
			rowForDelete.remove();
		}
	}

	let tempProd = takeProd(id);

	for (let k = 0; k < products.length; k++) {
		if (tempProd.id == products[k].id) {
			let index = products.indexOf(products[k]);
			products.splice(index, 1);
		}
	}

};


function paramChange(id) {
	let name = document.getElementById('prod__name').value;
	let firm = document.getElementById('prod__firm').value;
	let color = document.getElementById('prod__color').value;
	let cost = document.getElementById('prod__cost').value;

	let prodChange = document.querySelector(`.tr-${id}`);
	prodChange.innerHTML = `
	<tr class="tr-${id}">
		<td id="name__id">${name}</td>
		<td id="firm__id">${firm}</td>
		<td id="color__id">${color}</td>
		<td id="cost__id">${cost}</td>
		<td>
			<button class="button__update" id="button__update__${id}" data-userid="${id}" onclick="upBut('${id}')">Update</button>	
			<button class="button__delete" id="button__delete__${id}" data-userid="${id}" onclick="delBut('${id}')">Delete</button>

		</td>
	</tr>`;
	console.log(prodChange);
};


function clearInpur() {
	document.getElementById('prod__name').value = '';
	document.getElementById('prod__firm').value = '';
	document.getElementById('prod__color').value = '';
	document.getElementById('prod__cost').value = '';
};



function resUploadBut(id) {
	console.log(id);
	for (let k = 0; k < products.length; k++) {
		var but = document.getElementById(`button__update__${products[k].id}`)
		if (products[k].id != id) {
			but.innerText = "Update";
		}
	}
};