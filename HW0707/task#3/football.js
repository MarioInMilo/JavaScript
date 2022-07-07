map.onclick = function (e) {
	let mapCoords = this.getBoundingClientRect();
	let ballCords = {
		top: e.clientY - mapCoords.top - map.clientTop - ball.clientHeight / 2,
		left: e.clientX - mapCoords.left - map.clientLeft - ball.clientWidth / 2
	};

	if (ballCords.top < 0) {
		ballCords.top = 0;
	}

	if (ballCords.left < 0) {
		ballCords.left = 0;
	}

	if (ballCords.left + ball.clientWidth > map.clientWidth) {
		ball.left = ballCords = map.clientWidth - ball.clientWidth;
	}

	if (ballCords.top + ball.clientHeight > map.clientHeight) {
		ball.top = ballCords = map.clientHeight - ball.clientHeight;
	}

	ball.style.left = ballCords.left + 'px';
	ball.style.top = ballCords.top + 'px';
}