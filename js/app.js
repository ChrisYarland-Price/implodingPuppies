$(function(){
		pwins = 0;
		cwins = 0;
		var deck = [];
		// var discard = [];
		var playerHand = [];
		var comHand = [];

	
	
		run(deck, discard, playerHand, comHand);
		deckClick(playerHand,comHand, deck);
		playCards(playerHand);



	

















	function run(deck, discard, playerHand, comHand) {
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
		debugger
		addTo(deck, 5, '1');
		addTo(deck, 5, '2');
		addTo(deck, 5, '3');
		addTo(deck, 5, '4');
		addTo(deck, 5, '5');
	}
	function dealCard(destination, origin) {		
		var randomNumber = Math.floor(Math.random() * deck.length);
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
			if (playerHand.indexOf("Kickball") !== -1 && confirm("You have a Kickball do you want to use it?") === true){
					$(".Imploding").remove();
					playerHand.splice(playerHand.indexOf('Imploding Puppy'), 1);
					moveToDiscard($("#playHand .Kickball").eq(0), playerHand)
					addTo(deck, 1, "Imploding Puppy");	
			}else{
				alert("Player Loses");
				cwins++;
				restart();
			}
		}
	}
	function compComp(draw, comHand, deck) {
		if (draw === "Imploding Puppy") {
			if (comHand.indexOf("Kickball") !== -1){
					$(".Imploding").remove();
					comHand.splice(comHand.indexOf('Imploding Puppy'),1);
					moveToDiscard($("#comHand .Kickball").eq(0), comHand)
					addTo(deck, 1, "Imploding Puppy");
			}else{
			alert("You Win! ");
			pwins++;
			restart();
			}			
		}
	}	
	function playCards(playerHand){
		$('#playHand .card').click(function () {
			console.log(this)
			moveToDiscard(this, playerHand)
		})
	}
	function restart(){
		if (confirm("would you like to replay") === true){
			$('.card').remove();
			deck.splice(0);
			playerHand.splice(0);
			comHand.splice(0);
			run(deck, discard, playerHand, comHand);
		}else{
			alert("You have quit the game")
		}
	}



	function moveToDiscard(move, hand) {
		console.log(move);
		console.log(hand)
		$(move).remove();
		hand.splice(hand.indexOf($(move).html()), 1);
		$('#discard').append(move);
	}
});