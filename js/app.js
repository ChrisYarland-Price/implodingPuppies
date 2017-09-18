$(function(){


	var deck = [];
	var discard = [];
	playerHand = [];
	comHand = [];
	turn = 'player'
	




	fillDeck(deck);
	dealHands(deck, playerHand, comHand);

	dispPlayHand("#playHand .card", playerHand);
	dispPlayHand('#comHand .card', comHand);

	addTo(deck, 1, "Imploding Puppy");
	addTo(deck, 4, "Kickball");

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
	function moveToDiscard(argument) {
		// body...
	}
	function deckClick(turn){
		$('#deck').click(function(argument) {
			if (turn == 'player'){
				dealCard(playerHand, deck)
				addCardToHand('#playHand', playerHand)
				turn = 'com'
			}else{
				dealCard(comHand, deck)
				addCardToHand('#comHand', comHand)
				turn = 'player'
			}
		})
	}
	function addCardToHand(dest, hand) {
		$(dest).append($('<div></div>').addClass('card '+ hand[hand.length - 1]).html(hand[hand.length -1]))
	}
});