## Tic Tac Toe

### Config
* The project is powered by a configuration that contains the size of the grid and they player count.
As a rule of thumb there is a validation that player size cannot be more then grid size.
* configuration resides at src/config.json

* If grid size is 4, the game does not allow more than 4 players. Ofcourse, this is a validation that can be changed as per requirement.

### Game
* Each player is represented by a color code that will be mentioned in a legend.
* The Grid stars out with white and gets filled with colors as the game progresses
* The game completes, if any player is able to get N (size of grid) boxes to be filled by the color he is represented with in either horizontal, vertical or diagonal through the center of the grid.

### How  to play
* A marker indicates the player who should make the move which rotates b/w all players in a loop
* The active player can select a position that has not been marked yet
* The game ends when the end state is satisfied by any of the player
* There is a reset button to start over