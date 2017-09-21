# implodingPuppies
Imploding puppies is an attempt to create a game like exploding kittens online

----
## Task
The task given was to use the knowledge that we gained in our training with Sparta Global, to create an online game. 

The choice of game was personal, Imploding puppies was born thanks to the creator having played and enjoyed the card game Exploding Kittens. 


### Functionality 
This game was created using HTML5, CSS, Javascript and Jquery. 
It can be run on any machine capable of displaying a webpage. 

___

## Setup 
### Setup
To set this masterful creation up on a machine of your choice you can create a git clone or download a zip file of the repository. Once you have the files you can navigate to the page in your browser using the Index.html file that is in the imploding puppies folder.

___


### Planning
The very first step in this process was to take my idea of a game and create a wireframe of what i expected to need to do as well as creating some milestones to give me an impression of the things that needed to be done. 

___

## Creation
### Layout 
This first task that was done was deciding on the layout of the page. This was done in HTML and CSS, creating the Header and Gameboard were quickly done the gamebord has bothe the player and computer hands inside it. The cards are created dynamically as they are drawn in javascript.

The message and score boards are to the left of the screen on the basis that in western culture we tend to read from the left to the right. The deck and discard pile are to the right as the gameboard is in the middle but they need to be able to be used from whereever. 

The very first thing I did was to create the base of the game this included, the header, and the linking and testing of the javascript and CSS files. 

The second part was starting to create the layout of the game which included:

* The gameboard, 
* Each of the players hands 
* The areas for the discard and deck to sit. 

The next thing that happend was creating the CSS to complete the layout. The instructions were also created and the cards and classes were created to start testing the layout.

The deck was created, in javascript, as an array, and a function was created in order to fill that array with the values. This was tested by logging the array to the console.

The next and final step in the preperations was to create the players hands and show them on screen. 
This was done using the following code. 

```javascript 
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
```

The second function is used to deal 5 cards to the player this is done by calling the dealCard function. 
The dealCard creates a randon number that is used to pull a variable  from the deck.

The dispPlayHand simply takes each of the arrays for each of teh players and sends those values to each of the cards in the HTML. 

This was the base of the game from hereon, the talk shall mostly be on the implementation of the gameplay.
 
---  
### Creation of the Gameplay
From this point on the gameplay was implemented, at the end of the players turn they have to draw a card so the following code was created so that when they clicked on the deck there would be a process that took place. 

```javascript
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
} ```

This checked to see whose turn it was and then distributed a card to that player using the functions demonstrated above.

```javascript
function addCardToHand(dest, hand) {
   $(dest).append($('<div></div>').addClass('card '+ hand[hand.length - 1]).html(hand[hand.length -1]))
}
```

addCardToHand was a simple creation function that created a new card onscreen using the values it is given.


___

This iteration was quickly improved by the addition of a way for cards to be moved to the discard pile. A number of CSS improvements were made as well. After prodigious testing it was determined that the next phase could be implemented.

This phase was the first time that the game could actually be played through. The playerComp and compComp functions compare the drawn cards to the 'Imploding puppy' value. If that card is drawn it checks to see whether the player has a kickball if they do they get the chance to use it if not then that player loses.


```
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
```

The next iteration moved all of the preperation to a run function. It also removed the changing of the turn based on the deck being clicked, this means that the user does not have to force the draw of the computer. It should work automatically. 

The moveToDiscard function was also improved to be able to display the discarded card in the discard pile. this was integrated into the function when the kickball is used. 

## Improvements
Thus commenced the improvements section. This was all done to try and improve both the implementation of the game and the gameplay itself. 

### Implementation

I realised that the main variables that were being used, were infact global variables due to an oversight on my part. This was corrected and those variables were moved to be inside of the run function. 

This caused a cascading failure of the rest of the game as variables that were once easily accessable had to now be passed through to the functions that are needed. 

I started to add delays to certain functions that were needed to create the illusion that the computer you are playing against acts human rather than just blazing through the code as it normally does. 

This meant I also added the graphics and animations so that the cards look like they are moved rather than them just dissapearing and reapparing in the discard pile. 

The final implementation improvement was to justify the CSS and create a mobile site. 


### Improvements

The next improvement implemented was the creation of a reset function, this was partly done to try and create a scoreboard that would be self updating and see how the player is doing. 

This involved creating a scoreboard function and a restart function. These are detailed below.

```
function restart(deck, playerHand, comHand){
    if (confirm("would you like to replay") === true){
    	$('.card').remove();
    	deck.splice(0);
    	playerHand.splice(0);
    	comHand.splice(0);
        gamePrep(deck, playerHand, comHand);
    }else{
        alert("You have quit the game")
    }
}

function scoreboard() {
    var deck = [];
    var playerHand = [];
    var comHand = [];
    deckClick(playerHand,comHand, deck);
    playCards(playerHand);
    gamePrep(deck, playerHand, comHand);
}
```

The restart function removes all of the cards currently on screen, it removes all of the variables from the players hands arrays and then calls the gamePrep function which is the renamed run function from before. 
This also meant that i had to return certain values from the functions specifically if the game was over and who had won. In the end i used an array to simplify this as trying to return two variables was otherwise incredibly difficult.  

___

I then added a message div and a message function that displays messages, this was to aleviate the use of the alert function in javascript. 

This was done by simply using jQuery to append the message to the messages div. 


___



