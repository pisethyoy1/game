
var started = false;
var level = 0;
var gamePattern =[];
var userClickPattern =[];
var buttonColors = ["red","blue","green","yellow"];

// press key to start game
$(document).keypress( (e) =>{
    if(!started){
       
        nextSequence();
        started = true;
    }
    
})


// userClickPattern
$(".btn").click(function(){
    var userChosenColor = this.id;
    userClickPattern.push(userChosenColor);
    var audio = new Audio('sounds/'+userChosenColor+'.mp3');
    audio.play();
    
    $(this).addClass("pressed");
    setTimeout(() => {
        $(this).removeClass("pressed")
    }, 100);
    
    checkAnswer(userClickPattern.length-1)
});


function checkAnswer(gameLevel){
    if (userClickPattern[gameLevel] === gamePattern[gameLevel]){
        console.log("success");
        if(userClickPattern.length == gamePattern.length){
            setTimeout(() => {
                nextSequence();    
            }, 1000);
        }

    }else{
        var audio = new Audio('sounds/wrong.mp3');
        audio.play();
        console.log("false")
        $('body').addClass("game-over")
        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 200);
        $('h1').text("Game Over, Press Any Key to Restar")

        startOver();
    }

};

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;

}

// game pattern generate
function nextSequence(){

    userClickPattern = [];

    level++;
    $("#level-title").text("Level "+level);

    var randomNumber = Math.floor(Math.random()*4);

    var randomChosenColour = buttonColors[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    var audio = new Audio('sounds/'+randomChosenColour+'.mp3');
    audio.play();
    
}

