$(function(){


	var deck = [];
	var discard = [];
	playerHand = [];
	comHand = [];
	turn = 'player'
	




	fillDeck(deck);

	dealHands(deck, playerHand, comHand);
	// addCardToHand('')
	playerHand.push('Kickball');
	comHand.push('Kickball');
	addCardToHand('#playHand', playerHand)
	addCardToHand('#comHand', comHand)
	dispPlayHand("#playHand .card", playerHand);
	dispPlayHand('#comHand .card', comHand);
	addTo(deck, 1, "Kickball");
	addTo(deck, 1, "Kickball");


	addTo(deck, 1, "Imploding Puppy");

	deckClick(turn);



















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
	
	function deckClick(turn){
		$('#deck').click(function(argument) {
				dealCard(playerHand, deck)
				addCardToHand('#playHand', playerHand)
				playerComp(playerHand[playerHand.length -1])
				dealCard(comHand, deck)
				addCardToHand('#comHand', comHand)
				compComp(comHand[comHand.length -1])

			
		})
	}
	function addCardToHand(dest, hand) {
		$(dest).append($('<div></div>').addClass('card '+ hand[hand.length - 1]).html(hand[hand.length -1]))
	}
	function playerComp(draw){
		if (draw === "Imploding Puppy") {
			if (playerHand.indexOf("Kickball") !== -1){
				if(confirm("You have a Kickball do you want to use it?") === true){
					$(".Imploding").remove();
					playerHand.splice(playerHand.indexOf('Imploding Puppy'), 1);
					$("#playHand .Kickball").eq(0).remove();
					playerHand.splice(playerHand.indexOf('Kickball'), 1)
					addTo(deck, 1, "Imploding Puppy");

				}	
			}else{
				alert("Player Loses");
			}
		}
	}
	function compComp(draw) {
		if (draw === "Imploding Puppy") {
			debugger;
			console.log(comHand)
			if (comHand.indexOf("Kickball") !== -1){
					$(".Imploding").remove();
					comHand.splice(comHand.indexOf('Imploding Puppy'),1);
					$("#comHand .Kickball").eq(0).remove();
					comHand.splice(comHand.indexOf('Kickball'), 1);
					addTo(deck, 1, "Imploding Puppy");
			}else{
			alert("Computer Loses");
			}			
		}
	}	
	




	function moveToDiscard(move, hand) {
		$('discard').append(move)
		$(move).remove()
		if (hand.indexOf(move.html()) !== -1) {}
	}
});