var open = 0;
var score = 0;
var openlist = new Array();
var hiddenlist = new Array();
var pairs = 18;
var blocked = false;
var begindate;
var cardsturned = 0;

function prepare() {
	var board = document.getElementById("board");
	var i;
	for( i = 0; i < pairs * 2; i++) {
		var newcard = document.createElement("div");
		newcard.setAttribute("id", i);
		newcard.setAttribute("class", "memory");
		newcard.setAttribute("onclick", "turnaround(id);");
		board.appendChild(newcard);

		var div = document.getElementById(i);
		var newimg = document.createElement("img");
		newimg.setAttribute("src", "tile.png");

		div.appendChild(newimg);

		hiddenlist.push(i + ".png");
	}
	shufflehiddenlist();
	begindate = new Date();
}

function turnaround(id) {
	if(!blocked) {
		open++;
		cardsturned++;
		var element = document.getElementById(id);
		element.firstChild.src = hiddenlist[id];
		
	
	
		element.style.borderStyle = "outset";
		element.style.borderColor = "red";

		openlist.push(id);

		if(open == 2) {

			if(checkcards() == 0) {
				window.setTimeout("resetcards(false)", 2000);
				block();

			}
			/* found a match */
			else {
				score++;
				resetcards(true);
				if(score == pairs) {
					var enddate = new Date();
					var time = enddate - begindate;
					time = time / 1000;
					var answer = confirm("you won and needed " + parseInt(time) + " seconds and turned around " + cardsturned + " cards. Click okay to reload the game");
					if(answer) {
						window.location.reload();
					}
				}
			}
			open = 0;
		}

	}
}

function resetcards(found) {
	
	for(var i = 0; i < openlist.length; i++) {
		if(!found)
		{
			document.getElementById(openlist[i]).firstChild.src = "tile.png";
		}
		document.getElementById(openlist[i]).style.borderColor = "transparent";
	}
	openlist.pop();
	openlist.pop();
		
}

function checkcards() {
	var open1 = openlist[0];
	var open2 = openlist[1];

	var hidden1 = hiddenlist[open1];
	var hidden2 = hiddenlist[open2];
	hidden1 = hidden1.substring(0, hidden1.length - 4);
	hidden2 = hidden2.substring(0, hidden2.length - 4);
	hidden1 = parseInt(hidden1);
	hidden2 = parseInt(hidden2);

	console.log("compare" + hidden1 + " with" + hidden2);

	/* found pair */
	if((hidden1 % 2 == 0 && hidden2 == hidden1 + 1) || (hidden1 % 2 != 0 && hidden2 == hidden1 - 1)) {

		console.log("found pair");

		for( i = 0; i < 2; i++) {
			var found = document.getElementById(openlist[i]);
			found.removeAttribute("onclick");
		}
		return 1;
	}

	return 0;
}

function shufflehiddenlist() {
	var tmp, rand;
	for(var i = 0; i < hiddenlist.length; i++) {
		rand = Math.floor(Math.random() * hiddenlist.length);
		tmp = hiddenlist[i];
		hiddenlist[i] = hiddenlist[rand];
		hiddenlist[rand] = tmp;
	}
}

function block() {
	blocked = true;
	setTimeout("unblock()", 2000);

}

function unblock() {
	blocked = false;
}
