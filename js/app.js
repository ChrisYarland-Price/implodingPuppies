$(function(){


	
	
	run();




	

















	function run() {
		var deck = [];
		var discard = [];
		var playerHand = [];
		var comHand = [];
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
		deckClick(playerHand,comHand, deck);
		playCards(playerHand);
		quit = prompt("would you like to quit")
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
	var randomNumber = Math.floor(Math.random() * deck.length);
	debugger;
	var card = origin.splice(randomNumber, 1)[0];
	addTo(destination, 1, card)

	return card;
	}
	function dealHands(deck, playerHand, comHand){
		for (var i = 0; i < 5; i++) {
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
		$('#deck').click(function() {
				dealCard(playerHand, deck)
				addCardToHand('#playHand', playerHand)
				playerComp(playerHand[playerHand.length -1], playerHand, deck)
				dealCard(comHand, deck)
				addCardToHand('#comHand', comHand)
				compComp(comHand[comHand.length -1], comHand, deck)

			
		})
	}
	function addCardToHand(dest, hand) {
		$(dest).append($('<div></div>').addClass('card '+ hand[hand.length - 1]).html(hand[hand.length -1]))
	}
	function playerComp(draw, playerHand, deck){
		if (draw === "Imploding Puppy") {
			if (playerHand.indexOf("Kickball") !== -1){
				if(confirm("You have a Kickball do you want to use it?") === true){
					$(".Imploding").remove();
					playerHand.splice(playerHand.indexOf('Imploding Puppy'), 1);
					moveToDiscard($("#playHand .Kickball").eq(0), playerHand)
					addTo(deck, 1, "Imploding Puppy");

				}	
			}else{
				alert("Player Loses");
			}
		}
	}
	function compComp(draw, comHand, deck) {
		if (draw === "Imploding Puppy") {
			debugger;
			console.log(comHand)
			if (comHand.indexOf("Kickball") !== -1){
					$(".Imploding").remove();
					comHand.splice(comHand.indexOf('Imploding Puppy'),1);
					moveToDiscard($("#comHand .Kickball").eq(0), comHand)
					addTo(deck, 1, "Imploding Puppy");
			}else{
			alert("You Win! ");
			}			
		}
	}	
	function playCards(playerHand){
		$('#playHand .card').click(function () {
			console.log(this)
			moveToDiscard(this, playerHand)
		})
	}




	function moveToDiscard(move, hand) {
		console.log(move);
		$(move).remove();
		hand.splice(hand.indexOf($(move).html()), 1);
		$('#discard').append(move);
	}
});