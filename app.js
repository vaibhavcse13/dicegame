/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores , roundScore , activePlayer , gamePalying = true ,
    prevDice  , gameValue  ;
    

function init() {
    scores = [0 , 0] ; // 0 : first player , 1 : second player 
    roundScore = 0 ;
    activePlayer = 0 ;
    document.getElementById('score-0').textContent = '0' ;
    document.getElementById('score-1').textContent = '0' ;
    document.getElementById('current-0').textContent = '0' ;
    document.getElementById('current-1').textContent = '0' ;
    document.getElementById('name-0').textContent ='Player 1';
    document.getElementById('name-1').textContent = 'Player 2 '; 
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    //hiding the dice on initial selection 
   document.querySelector('.dice').style.display = 'none';
   gamePalying = true ; 

}

init();

//  textContent only put simple text 
//document.querySelector('#current-' + activePlayer).textContent = dice;

//  init score in load of screen 


// rolling dice 
document.querySelector('.btn-roll').addEventListener('click' , function(){
    /**
     * 1. Get random number 
     * 2. display result 
     * 3. update score if score not equalt to 1.
     */
    
    if(gamePalying){
        gameValue =  document.getElementById('end-point').value ; 
        if(gameValue){
            prev = dice || 0 ; 
            var  dice = Math.floor(Math.random() * 6 ) + 1 ;
    
            var diceDOM =  document.querySelector('.dice');
            
            diceDOM.style.display = 'block';
            diceDOM.src = "dice-" + dice + ".png";
            if(prevDice === 6 && dice === 6 ){
                roundScore = 0 ; 
                scores[activePlayer] = 0 ;
                nextPlayer();
            }else{
                if(dice !== 1 ){
                    roundScore += dice ; 
                    document.querySelector('#current-' + activePlayer).textContent = roundScore;
                }else{
                    nextPlayer();
                }
            }
        }else{
            console.error('Game value is not set ')
        }

       
    }
    
  
    
});

document.querySelector('.btn-hold').addEventListener('click' , function(){
   
    /***
     * 1. Adding the current score to the player golbal score . 
     * 2. Update the UI , with the current
     * 3. check if player won the game 
     * 
     * 
     */
    if(gamePalying){
        scores[activePlayer]  +=  roundScore;
        document.getElementById('score-' + activePlayer).textContent =  scores[activePlayer];
        if(scores[activePlayer] >= 100){
            gamePalying = false ; 
            document.getElementById('name-' + activePlayer).textContent = "Winner";
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-'+ activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    
        }else {
            // Next Player 
            nextPlayer();
        }
    }
 
  


});

function nextPlayer() {
    var diceDOM = document.querySelector('.dice');
    document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('active');
    activePlayer = (activePlayer === 0 ) ? 1 : 0 ;
    roundScore = 0 ; 
    document.querySelector('.player-'+ activePlayer + '-panel').classList.add('active');
    document.querySelector('#current-0').textContent = 0 ;
    document.querySelector('#current-1').textContent =  0 ; 
    diceDOM.style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click' , init);