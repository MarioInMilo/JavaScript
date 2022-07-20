function send() {
	let checkMail = /^([a-zA-Z]+)(\@[a-zA-Z]{2,}\.[a-zA-Z]{2,})$/;
	let mail = document.querySelector("#form__mail").value;
	let comment = document.querySelector("#form__comment").value;
	if (checkMail.test(mail)) {
		if (checkComment(comment)) {
			createComment(mail + ": " + comment, false);
		} else {
			createComment(mail + ": " + comment, true);
		}
	}


};

function createComment(text, choice) {
	let ul = document.querySelector(".com__ul")
	let li = document.createElement("li");
	let size = ul.children.length + 1;
	li.setAttribute("id", "num" + size);
	li.appendChild(document.createTextNode(text));
	ul.appendChild(li);
	if (choice) {
		console.log("alert");
		li.style.backgroundColor = "red";
		li.style.color = 'white';
	}
};

function checkComment(text) {
	let checkSize = /^([а-яА-Яa-zA-Z0-9\.\,\!\?\%\+\#\-\ ]{1,30})$/;
	let illegalWords = [/silly/, /ugly/, /stfu/, /dumb/, /poor/, /disgusting/];
	if (checkSize.test(text)) {
		for (let i = 0; i < illegalWords.length; i++) {
			if (illegalWords[i].test(text)) {
				return false;
			}
		}
		return true;
	} else {
		return false;
	}
};