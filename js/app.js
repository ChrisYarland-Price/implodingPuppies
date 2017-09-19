$(function(){


	scoreboard();



	

















	function gamePrep(deck, playerHand, comHand) {
		var discard = [];
		fillDeck(deck);
		dealHands(deck, playerHand, comHand);
		playerHand.push('Kickball');
		comHand.push('Kickball');
		addCardToHand('#playHand', playerHand)
		addCardToHand('#comHand', comHand)
		dispPlayHand("#playHand .card", playerHand);
		dispPlayHand('#comHand .card', comHand);
		addTo(deck, 1, "Kickball");
		addTo(deck, 1, "Kickball");
		addTo(deck, 1, "Imploding Puppy");
	}

	function addTo(destination, index, value) {
		var array = [];
		for (var i = 0; i < index; i++) {
			destination.push(value);
		}
	}	
	function fillDeck(deck) {
		addTo(deck, 5, '1');
		addTo(deck, 5, '2');
		addTo(deck, 5, '3');
		addTo(deck, 5, '4');
		addTo(deck, 5, '5');
	}
	function dealCard(destination, origin) {
		debugger	
		var randomNumber = Math.floor(Math.random() * origin.length);
		var card = origin.splice(randomNumber, 1)[0];
		addTo(destination, 1, card)

		return card;
	}
	function dealHands(deck, playerHand, comHand){
		for (var i = 0; i < 5; i++) {
			addCardToHand('#playHand', playerHand)
			addCardToHand('#comHand', comHand)
			dealCard(playerHand, deck);
			dealCard(comHand, deck);
			
		}
	}
	function dispPlayHand(dest, hand){
		$(dest).each( function(index){
			var num = hand[index];
			$(this).addClass(hand[index]).html(hand[index]);
		});	
	}
	
	function deckClick(playerHand,comHand, deck){
		var pwins = 0;
		var cwins = 0;
		var oldp = pwins;
		var oldc = cwins;
		setInterval(function(){
			$('#pscore').html(pwins);
			$('#cscore').html(cwins)
		}, 100);
		$('#deck').click(function() {
			pwins = dealer(playerHand, deck, pwins, '#playHand', '#playHand .Kickball', comHand)
			cwins = dealer(comHand, deck, cwins, '#comHand', '#comHand .Kickball', playerHand)
			if (pwins !== oldp || cwins !== oldc) {
				oldc = cwins;
				oldp = pwins;
				restart(deck, playerHand, comHand);
			}
		});

	}
	function dealer(hand, deck, win, disphand, place, other) {
		dealCard(hand, deck);
		addCardToHand(disphand, hand);
		win = playerComp(hand[hand.length - 1], hand, deck, win, place, other);

		return win;
		}
	function addCardToHand(dest, hand) {
		$(dest).append($('<div></div>').addClass('card '+ hand[hand.length - 1]).html(hand[hand.length -1]))
	}
	function playerComp(draw, hand, deck, wins, place, other){
		if (draw === "Imploding Puppy") {
			if ( place === '#playHand .Kickball' && hand.indexOf("Kickball") !== -1 && confirm("You have a Kickball do you want to use it?") === true) {
						$(".Imploding").remove();
						hand.splice(hand.indexOf('Imploding Puppy'), 1);
						moveToDiscard($(place).eq(0), hand)
						addTo(deck, 1, "Imploding Puppy");	
						return wins;
			}else if (place === '#comHand .Kickball' && hand.indexOf("Kickball") !== -1){
					$(".Imploding").remove();
						hand.splice(hand.indexOf('Imploding Puppy'), 1);
						moveToDiscard($(place).eq(0), hand)
						addTo(deck, 1, "Imploding Puppy");	
						return wins;
			}else{
				alert("End of Game");
				if (place === "#comHand .Kickball") {
					alert("Computer Wins")
				}else {
					alert("Player Wins")
				}
				return wins = wins + 1;
			}			
		}else{
			return wins;
		}
			
	}	
	function playCards(playerHand){
		$('#playHand .card').click(function () {
			moveToDiscard(this, playerHand)
		})
	}
	function restart(deck, playerHand, comHand){
		if (confirm("would you like to replay") === true){
			debugger;
			$('.card').remove();
			deck.splice(0);
			playerHand.splice(0);
			comHand.splice(0);
			gamePrep(deck, playerHand, comHand);
		}else{
			alert("You have quit the game")
		}
	}



	function moveToDiscard(move, hand) {
		$(move).remove();
		hand.splice(hand.indexOf($(move).html()), 1);
		$('#discard').append(move);
	}
	function scoreboard() {
		var deck = [];
		var playerHand = [];
		var comHand = [];
		deckClick(playerHand,comHand, deck);
		playCards(playerHand);
		gamePrep(deck, playerHand, comHand);


	}

});