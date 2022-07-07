let circle = document.querySelectorAll(".circle");
console.log(circle);
let temp = 2;



if (temp > 2) {
	temp = 0;
}

function btnch() {
	changeColor();
};


function changeColor() {
	circle[temp].className = 'circle';
	temp++;
	if (temp > 2) {
		temp = 0;
	}
	let crlght = circle[temp];
	crlght.classList.add(crlght.getAttribute("color"));

};
