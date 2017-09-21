# implodingPuppies
Imploding puppies is an attempt to create a game like exploding kittens online

## Task
The task given was to use the knowledge that we gained in our training with Sparta Global, to create an online game. 

The choice of game was personal, Imploding puppies was born thanks to the creator having played and enjoyed the card game Exploding Kittens. 


### Functionality 
This game was created using HTML5, CSS, Javascript and Jquery. 
It can be run on any machine capable of displaying a webpage. 



## Setup & Creation
### Setup
To set this masterful creation up on a machine of your choice you can create a git clone or download a zip file of the repository. Once you have the files you can navigate to the page in your browser using the Index.html file that is in the imploding puppies folder.

### Creation
This first task that was done was deciding on the layout of the page. This was done in HTML and CSS, creating the Header and Gameboard were quickly done the gamebord has bothe the player and computer hands inside it. The cards are created dynamically as they are drawn in javascript.

The message and score boards are to the left of the screen on the basis that in western culture we tend to read from the left to the right. The deck and discard pile are to the right as the gameboard is in the middle but they need to be able to be used from whereever. 

The first iteration of the Game Filled the deck with the numbers 1 to 5, it did this by calling the addto function once for each card, and then dealt out five cards to each player. The 2 extra kickballs were added using by calling the addto function once for each card. Once that was done the imploding puppy card is added to the deck and the game can then be started. During this period the instructions were to the left hand side with the scoreboard underneath.