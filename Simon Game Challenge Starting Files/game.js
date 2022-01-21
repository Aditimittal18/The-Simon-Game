var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

$(".btn").click(function handler(){
    var userChosenColor = this.id;
    playSound(userChosenColor);
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkAnswer(level);
});

$(document).keypress(function(){
    if(!started){
        started = true;
        $("#level-title").text("Level "+level);
        nextSequence();
    }
});

function checkAnswer(level){
    for(var i=0;i<userClickedPattern.length;i++){
        if(userClickedPattern[i]===gamePattern[i]){
            console.log("Success");
            if(i===(level-1)){
                setTimeout(nextSequence,1000);
                clearTimeout(nextSequence)
                userClickedPattern = [];
            }
        }
        else{
            console.log("Wrong");
            playSound("wrong");
            $("body").addClass("game-over");
            setInterval(() => {
                $("body").removeClass("game-over");
            },100);
            gameOver();
        }
    }
}

function gameOver(){
    userClickedPattern = [];
    gamePattern = [];
    level = 0;
    started = false;
    $("#level-title").text("Press A Key to Start");
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setInterval(() => {
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColor);

    gamePattern.push(randomChosenColor);

    level++;
    $("#level-title").text("Level "+level);
}