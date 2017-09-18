$(function(){


	var deck = [];
	var discard = [];
	playerHand = [];
	comHand = [];	
	run();



	

















	function run() {
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
		deckClick();
		playCards();
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
	
	function deckClick(){
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
					moveToDiscard($("#playHand .Kickball").eq(0), playerHand)
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
					// .remove();
					moveToDiscard($("#comHand .Kickball").eq(0), comHand)
					addTo(deck, 1, "Imploding Puppy");
			}else{
			alert("Computer Loses");
			}			
		}
	}	
	function playCards(){
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