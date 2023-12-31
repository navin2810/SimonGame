let buttonColors = [ "green","red", "yellow","blue"];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

$(".start").click(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    $(".start").hide();
  }
});
$(document).keypress(function (event) {
  if (event.key === "Enter") {
    !started;
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    $(".start").hide();
  }
});


  
$(document).ready(function () {
  $(document).on("keypress", function (event) {
    if (event.key == 1 ||event.key == 2||event.key == 3||event.key == 4 ) {
      $("#"+buttonColors[event.key-1]).trigger("click");
    }
  });
  $(".btn").click(function () {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  });

});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // console.log("success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Start to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  let audio = new Audio("./" + name + ".mp3");
  audio.play();
}
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  $(".start").show();
}
