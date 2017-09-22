// This file is part of Imploding Puppies.
// Imploding Puppies is free software: you can redistribute it and/or modifyit under the terms of the GNU General Public License as published bythe Free Software Foundation, either version 3 of the License, or(at your option) any later version.
// Imploding Puppies is distributed in the hope that it will be useful,but WITHOUT ANY WARRANTY; without even the implied warranty ofMERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See theGNU General Public License for more details.
// You should have received a copy of the GNU General Public Licensealong with Imploding Puppies.  If not, see <http://www.gnu.org/licenses/>.
// Copyright 2017 Chris Yarland-Price
$(function(){

	run();


	// This is the function that starts the game. 
	function run() {
		var deck = [];
		var playerHand = [];
		var comHand = [];
		hideInstruct();
		gamePrep(deck, playerHand, comHand);
		deckClick(playerHand,comHand, deck);
	}
	// This is the function to hide the instructions based on clicking the button in the box. 
	function hideInstruct() {
		$('#hideInstructions').click(function() {
			$('#Instructions').hide();
		});
	}
	// This is the function that prepares the game for play. This includes loading the deck and creating each players hand.
	function gamePrep(deck, playerHand, comHand) {
		var discard = [];
		var cards = ['1','2','3','4','5']
		for (var i = 0; i < cards.length; i++) {
			addTo(deck, 5, cards[i]);
		}
		dealHands(deck, playerHand, comHand);
		addTo(deck, 2, "Kickball");
		addTo(deck, 2, "Skip");
		addTo(deck, 1, "Imploding Puppy");
	}
	// This is the function that creates the players hands at first
	function dealHands(deck, playerHand, comHand){
		for (var i = 0; i < 5; i++) {
			dealCard(playerHand, deck);
			dealCard(comHand, deck);
			addCardToHand('#playHand', playerHand)
			addCardToHand('#comHand', comHand)
			
		}
		playerHand.push('Kickball');
		comHand.push('Kickball');
		addCardToHand('#playHand', playerHand)
		addCardToHand('#comHand', comHand)
	}
	// This is the function that deals the cards it does this by calculating a random number and then using that number as the index to pull a variable out of the array. 
	function dealCard(destination, origin) {
		var randomNumber = Math.floor(Math.random() * origin.length);
		var card = origin.splice(randomNumber, 1)[0];
		addTo(destination, 1, card)

		return card;
	}
	// This is the function that adds the cards to a specified place this can be adding the cards to the deck, or to the players hands
	function addTo(destination, index, value) {
		var array = [];
		for (var i = 0; i < index; i++) {
			destination.push(value);
		}
	}
	// This is the function that creates and displays the cards
	function addCardToHand(dest, hand) {
		$(dest).delay(10000).append($('<div></div>').addClass('card '+ hand[hand.length - 1]).html(hand[hand.length -1]))
	}
	// This is the function creates the listner for the deck click as well as calling the function that allows the player to click on the cards. 
	function deckClick(playerHand,comHand, deck){
		var pwins = 0;
		var cwins = 0;
		var score =[pwins, cwins];
		var oldp = pwins;
		var oldc = cwins;
		playCards(comHand, deck, score[0], cwins, playerHand, score);
		setInterval(function(){
			$('#pscore').html(score[0]);
			$('#cscore').html(score[1])
		}, 100);
		$('#deck').click(function() {
			cwins = dealer(playerHand, deck, score[1], '#playHand', '#playHand .Kickball', comHand)
			score = comdeal(comHand, deck, score[0], cwins, playerHand, score);

			playCards(comHand, deck, score[0], cwins, playerHand, score);

		});
	}
	// This is the function that sets up the listener for the players hand cards allowing them to be played. 
	function playCards(comHand, deck, pwins, cwins, playerHand, score){
		$('#playHand .card').off('click');
		$('#playHand .card').click(function () {
			moveToDiscard(this, playerHand);
			if ($(this).html() === "Skip") {
				score = comdeal(comHand, deck, score[0], cwins, playerHand, score)
			}
		});
		return score
	}
	// This is the function that moves an item to the discard pile.
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
	// This is the function that deals the card to the computer it also checks to see if the score has changed and if it has it will set off the restart function.
	function comdeal(comHand, deck, playwins, cwins, playerHand, score) {
		setTimeout(function() {
			playwins = dealer(comHand, deck, playwins, '#comHand', '#comHand .Kickball', playerHand)
			if (playwins !== score[0] || cwins !== score[1]) {
				score[0] = playwins;
				score[1] = cwins;
				restart(deck, playerHand, comHand);
			}
		}, 400);	
		return score;
	}
	// This is the function that deals the cards and adds it to a players hand 
	function dealer(hand, deck, win, disphand, place, other) {
		dealCard(hand, deck);
		addCardToHand(disphand, hand);
		win = winComp(hand[hand.length - 1], hand, deck, win, place, other);

		return win;
	}
	// This is the function that compares the drawn card to the imploding puppy it figures out if you have a kickball 
	// and it asks if you want to use it for the comp it will always use it. If they do not it will play a message 
	// it returns the score +1 if the player has lost and is called with the opposing players score. or it just returns the score.
	function winComp(draw, hand, deck, wins, place, other){
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
	// This is the function that removes the kickball from the players hand and moves it to the discard
	function kickball(hand, deck, place){
		setTimeout(function() {$(".Imploding").delay(1000).remove();}, 2000);
		hand.splice(hand.indexOf('Imploding Puppy'), 1);
		moveToDiscard($(place).eq(0), hand)
		addTo(deck, 1, "Imploding Puppy");
		if (place === '#comHand .Kickball') {
			message('The Computer Used a Kickball')	
		}
	}
	// This is the function that displays messages
	function message(content){

		$('#messages').html(content);

	}
	// This is the function that restarts the game
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
});