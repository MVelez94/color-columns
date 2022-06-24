## Introduction

As part of this challenge you will be creating a game.

This is the game:

<img width="618" alt="Screen Shot 2022-06-23 at 4 05 04 PM" src="https://user-images.githubusercontent.com/36420989/175377934-184a318c-0a34-4520-b98c-2b33603e3bba.png">

The goal of the game is to sort the squares by color in columns, each column (1 to 5) must only have squares of the same color to win, like this:

<img width="615" alt="Screen Shot 2022-06-23 at 4 12 34 PM" src="https://user-images.githubusercontent.com/36420989/175379106-6ffc65df-8d81-4d22-88c6-84d0a214797d.png">

### Game rules

- You can move one square at a time
- You can only move an square if it is at the top of its column
- Squares can be moved to empty cells (white ones)
- Columns 6 and 7 are free to help you with the movements
- Columns 6 and 7 can hold squares of any color but once you add a square of a given color to any  of those two columns, all other squares in that column must be the same color
- Squares at the bottom row at fixed (you can't move them) and indicate the target color for each column
- Gray squares are fixed and mean nothing, they are there just to limit the free cells that you have available

### Minimum functionality

To complete the challenge you need to at least deliver the following:

- The grid from the first image (the numbers are not needed) with the game logic implemented
- An indicator that lets the user know he/she won
- A set of unit tests that should include:
  - One test to check when the user wins
  - One test to check that we can move only squares at the top of the column
  - One test to check that in columns 6 and 7 we can hold any color but always the same one

### Technical requirements

Use ReactJS. All the rest is up to you, that is why we do not provide anything besides this README file.

### Extras

If you want to impress us you can add any extra that you want to the games (as far as they do not change the game rules). Example of possible extras that you can add are:

- Clock to show the time spent to resolve the game
- Restrict the amount of movements done to resolve the game
- Restrict the time spent to resolve the game
- Add levels
- Setting page to setup the game
- Scores (saved locally or you can go crazy and save it in the backend)
- Restart button
- Dark mode
- Random position for the squares so it is always a new puzzle to solve

### GOOD LUCK !!
