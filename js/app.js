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
			debugger;
			cwins = dealer(playerHand, deck, cwins, '#playHand', '#playHand .Kickball', comHand)
			setTimeout(function() {
				pwins = dealer(comHand, deck, pwins, '#comHand', '#comHand .Kickball', playerHand)
				playCards(playerHand)
				if (pwins !== oldp || cwins !== oldc) {
					oldc = cwins;
					oldp = pwins;
					restart(deck, playerHand, comHand);
				}
			}, 400);
		});

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

			debugger;
			if ( place === '#playHand .Kickball' && hand.indexOf("Kickball") !== -1 && confirm("You have a Kickball do you want to use it?") === true) {
				setTimeout(function() {$(".Imploding").delay(1000).remove();}, 2000);
				hand.splice(hand.indexOf('Imploding Puppy'), 1);
				moveToDiscard($(place).eq(0), hand)
				addTo(deck, 1, "Imploding Puppy");	
				return win;
			}else if (place === '#comHand .Kickball' && hand.indexOf("Kickball") !== -1){
				setTimeout(function() {$(".Imploding").delay(1000).remove();}, 2000);
				hand.splice(hand.indexOf('Imploding Puppy'), 1);
				moveToDiscard($(place).eq(0), hand)
				addTo(deck, 1, "Imploding Puppy");
				message('The Computer Used a Kickball')	
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
	function playCards(playerHand){
		$('#playHand .card').click(function () {
			moveToDiscard(this, playerHand)
		})
	}
	function restart(deck, playerHand, comHand){
		debugger;
		if (confirm("would you like to replay") === true){
			debugger;
			$('.card').remove();
			deck.splice(0);
			playerHand.splice(0);
			comHand.splice(0);
			gamePrep(deck, playerHand, comHand);
		}else{
			message("You have quit the game")

		}
	}
	function moveToDiscard(move, hand) {
		setTimeout(function(){
			$(move).slideUp("slow", function() {
				$(move).delay(500).remove()
			})
			setTimeout(function(){
				$('#discard').append(move)
				$(move).delay(500).slideDown("slow");
			},1000);
		},1000);
		hand.splice(hand.indexOf($(move).html()), 1);
		debugger
	}
	function scoreboard() {
		var deck = [];
		var playerHand = [];
		var comHand = [];
		deckClick(playerHand,comHand, deck);
		gamePrep(deck, playerHand, comHand);
		playCards(playerHand);
	}
	function message(content){

		$('#messages').fadeIn(200).html(content).delay(800).fadeOut(200);

	}

});