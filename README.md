# Half Life: Alyx - Memory Game
#### Video Demo:  https://www.youtube.com/watch?v=22QgJWGIVVo
#### Description:
This is a Memory Card Game, where your objective is avoid selecting the same card twice.
Select all 18 cards to win.

The game's theme revolves around Half Life: Alyx, a PC VR game developed by Valve.
More specifically, the theme incorporates the UI from the "Combine Fabricators" that are seen throughout the game.
The Combine Fabricators in-game model and animations have been adapted to my own game with care.
I have made some adjustments to the sequences of animations, sounds, and UI elements to make them more appropriate for my own project.
The card images are taken from combineoverwiki.net
I have manually made the images transparent using GIMP.
The blue filter on the images are made with a css filter.
The font used is Exo 2, which has the most resemblance to the font used by Valve.

This project uses React and JavaScript.

Basic pseudocode of the game itself:
1. Load a png version of the looping background video, so that when changing the video, the disappearance is not noticed.
2. Load looping video and the start button.
3. When user clicks the start button, Load the intro video and sound effects.
4. Switch to looping video, Load the game elements, The fake UI around the game, score and high-score, and cards.
5. When clicking a card, check if that card's name is in the "clickedCards" array continue with step 6. If it is not in the array, skip to step 10.
6. If it is update the high-score if it is higher than the previous high-score. 
7. Load the Lose video and sound effects.
8. After the animation, Load "retry" button.
9. When the user clicks the retry button, go back to step 4.
10. Add the card's name to the clickedCards array. Update the score.
11. If the score is more than 17, continue. If not, go back to step 5.
12. Load the Win video and sound effects.
13. Load the winning prompt, and the "retry" button.
14. When the user clicks the retry button, go back to step 4.

The live demo of the game can be found here: https://stalwart-daffodil-698731.netlify.app/

The assets owned by Valve Corporation are utilized in this project under fair use conditions.