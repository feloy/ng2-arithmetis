# The Game

The principle of the game is that 5 tiles are available in a rack. 3 numbers, an operator and and equal sign, ie 0 + 0 = 0

There is a 5x5 grid, and you can get tiles from the rack to put in the grid, to make correct operations.

The objects to implement:

 - a *tile class*
 - a *rack component* with 5 squares available
 - a *distributor service* which will distribute tiles in the rack 
 - a *grid component* which will contain 5x5 squares
 - a *square component*, element of rack and grid.

# The tile class

 - a type: number, operator, equal sign
 - a face: the number 0, 1, ...), the operator (+ or -), =

# The Distributor service 

 - a method getTitle(type) returns a new tile 
 
# The square component 

 Will display either nothing or a tile

 - a place (grid or rack)
 - a position in its place

# The Game service

A game service handles game events:

 - the level
 - restart game
 - a square is selected from the rack
 - the selected square is put in the grid
 
# The calculator service

 This service, given a grid, the tiles already on it and a new tile, knows:
  
 - if the new tile can be put in a given postion
 - if some lines are completed with the new tile at given position

# This is your [AngularAttack](https://www.angularattack.com) 2016 Repo

This repo is the start of your AngularAttack 2016 entry. It contains the simple [Angular2 starter](https://angular.io/docs/ts/latest/quickstart.html) files.

**DO NOT MAKE ANY CODE CHECKINS TO THIS REPOSITORY BEFORE THE COMPETITION OFFICIALLY BEGINS.**

**DOING SO COULD DISQUALIFY YOU.**


However, before the competition starts, there are some things we encourage you to do to get prepared for the competition.


### Step 1) Get Your Local Environment setup

Clone this repo locally, and make sure all your team members have access to it.

* Install the latest [Node / NPM](https://nodejs.org).

* `git clone git@github.com:rumblex/angularattack2016-arithmetis.git`

* `cd angularattack2016-arithmetis`

* `npm install`

* `npm start` will start the server locally to test that everything is running correctly


### Step 2) Deploy Your App

While you can't make any checkins before the comp, what you **can** do right now is deploy this sample app to [Surge](https://surge.sh) (our competition hosting provider).

* `npm install -g surge`

* `surge .`

Note: please do not remove the `CNAME` file, as that tells it where to deploy to.

If receive the error message `"You do not have permission to publish to arithmetis.2016.angularattack.io"`, it might mean another team member has already deployed your project to Surge. Ask them to run the next step to give you access.

### Step 3) Add Your Team Members to Surge

* `surge . --add contact@elol.fr`


### Step 4) Wait til competition starts

It begins at exactly [May 14 at 00:00 UTC](https://www.wolframalpha.com/input/?i=May+14,+2016+0:00+UTC). Once the competition starts,   you can write over this project.

