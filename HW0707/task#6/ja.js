let pm;
document.onmouseover = function (e) {
	let target = e.target;
	let msg = target.dataset.temp;
	if (!msg) return;
	pm = document.createElement('div');
	pm.className = 'temp';
	pm.innerHTML = msg;
	document.body.append(pm);


	let cords = target.getBoundingClientRect();
	let left = cords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
	if (left < 0) left = 0;
	let top = cords.top - tooltipElem.offsetHeight - 5;
	if (top < 0) {
		top = cords.top + target.offsetHeight + 5;
	}
	pm.style.left = left + 'px';
	pm.style.top = top + 'px';
};

document.onmouseout = function (e) {

	if (pm) {
		pm.remove();
		pm = null;
	}

};