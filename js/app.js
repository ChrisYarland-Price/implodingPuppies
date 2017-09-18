$(function(){


	var deck = [];
	fillDeck(deck, 10, 'test')

		console.log(deck)























	function fillDeck(deck, index, value) {
		var array = [];
		for (var i = 0; i < index; i++) {
			deck.push(value)
		}
	}	
});