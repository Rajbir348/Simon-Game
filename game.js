var buttonColors=["red","blue", "green", "yellow"];
var gamePattern=[];
var userChosenPattern=[];
var level=0;
var start=false;

$(document).keypress(function(){
  if(!start){
    $("h1").text("Level "+0);
    nextSequence();
    start=true;
  }  
});


    $(".btn").click(function(){
        if(start===true){
        var userChosenColor=$(this).attr("id");
        userChosenPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
    
        checkAnswer(userChosenPattern.length-1);}
    });
    

function checkAnswer(currlevel){
    if(userChosenPattern[currlevel]===gamePattern[currlevel]){
        console.log("success");
        if(userChosenPattern.length===gamePattern.length){
           setTimeout(function(){
            nextSequence();
           },1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    start=false;
}

function nextSequence() {
    userChosenPattern=[];
    level++;
    $("h1").text("Level "+level);
    var n=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[n];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}
function playSound(name) {
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currColor) {
    $("#"+currColor).addClass("pressed");
    
    setTimeout(function () {
        $("#" + currColor).removeClass("pressed");
      }, 100);
}