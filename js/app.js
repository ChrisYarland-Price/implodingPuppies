$(function(){

	scoreboard();


	

















	function gamePrep(deck, playerHand, comHand) {
		var discard = [];
		var cards = ['1','2','3','4','5']
		for (var i = 0; i < cards.length; i++) {
			addTo(deck, 5, cards[i]);
		}
		console.log(deck)
		dealHands(deck, playerHand, comHand);
		playerHand.push('Kickball');
		comHand.push('Kickball');
		addCardToHand('#playHand', playerHand)
		addCardToHand('#comHand', comHand)
		dispPlayHand("#playHand .card", playerHand);
		dispPlayHand('#comHand .card', comHand);
		addTo(deck, 2, "Kickball");
		addTo(deck, 2, "Skip");
		addTo(deck, 1, "Imploding Puppy");
	}

	function addTo(destination, index, value) {
		var array = [];
		for (var i = 0; i < index; i++) {
			destination.push(value);
		}
	}	
	function dealCard(destination, origin) {
		var randomNumber = Math.floor(Math.random() * origin.length);
		var card = origin.splice(randomNumber, 1)[0];
		addTo(destination, 1, card)

		return card;
	}
	function dealHands(deck, playerHand, comHand){
		for (var i = 0; i < 5; i++) {
			dealCard(playerHand, deck);
			dealCard(comHand, deck);
			addCardToHand('#playHand', playerHand)
			addCardToHand('#comHand', comHand)
			
		}
	}
	function dispPlayHand(dest, hand){
		$(dest).each( function(index){
			var num = hand[index];
			$(this).addClass(hand[index]).html(hand[index]);
		});	
	}
	function interval(div, score) {
		setInterval(function(){
			$(div).html(score);
			// $('#cscore').html(cwins)
		}, 100);
	}
	function deckClick(playerHand,comHand, deck){
		var pwins = 0;
		var cwins = 0;
		var score =[pwins, cwins];
		var oldp = pwins;
		var oldc = cwins;
		playCards(comHand, deck, score[0], cwins, playerHand, score);
		// interval('#cscore', score[1])
		setInterval(function(){
			$('#pscore').html(score[0]);
			$('#cscore').html(score[1])
		}, 100);
		$('#deck').click(function() {
			cwins = dealer(playerHand, deck, score[1], '#playHand', '#playHand .Kickball', comHand)
			debugger
			score = comdeal(comHand, deck, score[0], cwins, playerHand, score);

			playCards(comHand, deck, score[0], cwins, playerHand, score);

		});

	}
	function comdeal(comHand, deck, playwins, cwins, playerHand, score) {
		// interval('#pscore', score[0])
		debugger
		setTimeout(function() {
			playwins = dealer(comHand, deck, playwins, '#comHand', '#comHand .Kickball', playerHand)
			if (playwins !== score[0] || cwins !== score[1]) {
				debugger
				score[0] = playwins;
				score[1] = cwins;
				restart(deck, playerHand, comHand);
			}
		}, 400);	
		return score;
	}
	function dealer(hand, deck, win, disphand, place, other) {
		dealCard(hand, deck);
		addCardToHand(disphand, hand);
		win = playerComp(hand[hand.length - 1], hand, deck, win, place, other);

		return win;
	}
	function addCardToHand(dest, hand) {
		$(dest).delay(10000).append($('<div></div>').addClass('card '+ hand[hand.length - 1]).html(hand[hand.length -1]))
	}
	function playerComp(draw, hand, deck, wins, place, other){
		var win = wins; 
		if (draw === "Imploding Puppy") {

			if ( place === '#playHand .Kickball' && hand.indexOf("Kickball") !== -1 && confirm("You have a Kickball do you want to use it?") === true) {
				kickball(hand,deck,place);	
				return win;
			}else if (place === '#comHand .Kickball' && hand.indexOf("Kickball") !== -1){
				kickball(hand, deck, place);
				
				return win;
			}else{
				if (place === "#comHand .Kickball") {
					message("Player Wins")
				}else {
					message("Computer Wins")
				}
				return win = wins + 1;
			}			
		}else{
			return win;
		}
			
	}	
	function kickball(hand, deck, place){
		setTimeout(function() {$(".Imploding").delay(1000).remove();}, 2000);
		hand.splice(hand.indexOf('Imploding Puppy'), 1);
		moveToDiscard($(place).eq(0), hand)
		addTo(deck, 1, "Imploding Puppy");
		if (place === '#comHand .Kickball') {
			message('The Computer Used a Kickball')	
		}
	}
	function playCards(comHand, deck, pwins, cwins, playerHand, score){
		$('#playHand .card').click(function () {
			moveToDiscard(this, playerHand);
			if ($(this).html() === "Skip") {
				comdeal(comHand, deck, score[0], cwins, playerHand, score)
			}
		})
	}
	function restart(deck, playerHand, comHand){
		setTimeout(function function_name(argument) {
			if (confirm("would you like to replay") === true){
				$('.card').remove();
				deck.splice(0);
				playerHand.splice(0);
				comHand.splice(0);
				gamePrep(deck, playerHand, comHand);
			}else{
				message("You have quit the game")

			}
		}, 800) 
	}
	function moveToDiscard(move, hand) {
		setTimeout(function(){
			$(move).slideUp("slow", function() {
				$(move).delay(500).remove()
			})
			setTimeout(function(){
				$('#discard').append(move)
				$(move).delay(500).slideDown("slow");
			},700);
		},100);
		hand.splice(hand.indexOf($(move).html()), 1);
	}
	function scoreboard() {
		var deck = [];
		var playerHand = [];
		var comHand = [];
		hideInstruct();
		gamePrep(deck, playerHand, comHand);
		deckClick(playerHand,comHand, deck);
	}
	function message(content){

		$('#messages').html(content);

	}
	function hideInstruct() {
		$('#hideInstructions').click(function() {
			$('#Instructions').hide();
		});
	}
});