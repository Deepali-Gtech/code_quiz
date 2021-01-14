//declare global variable
var startQuizDiv = document.getElementById("startQuizDiv");
var questionDiv = document.getElementById("questionDiv");
var timerDiv = document.getElementById("timer");
var ques = document.getElementById("ques");
var o1 = document.getElementById("o1");
var o2 = document.getElementById("o2");
var o3 = document.getElementById("o3");
var o4 = document.getElementById("o4");
var answer = document.getElementById("answer");
var resultDiv = document.getElementById("resultDiv");
var result = document.getElementById("result");
var initials = document.getElementById("initials");
var scoreDiv = document.getElementById("scoreDiv");
var input = document.getElementById("input");
var index = 0;
var correctAnswers = 0;
var wrongAnswers = 0;
var timerCount = 60;
timerDiv.innerHTML = "Time:" + timerCount;
var counter;
var highscores = {};

//Added event listener on id declared in html and called function by using click argument
startQuizButton.addEventListener("click", buildQuiz);

// created function to display the question screen with running timer
function buildQuiz() {
  startQuizDiv.style.display = "none";
  questionDiv.style.display = 'block';
  timerDiv.innerHTML = "Time:" + timerCount;
  counter = setInterval(timer, 1000);
  displayQuestion();
}

function timer() {
  if (timerCount <= 0) {
    clearTimer();
  } else {
    timerCount--;
    timerDiv.innerHTML = "Time:" + timerCount;
  }
}

//Created function to display question
function displayQuestion() {
  ques.innerHTML = myQuestions[index].question;
  o1.innerHTML = myQuestions[index].answers.o1;
  o2.innerHTML = myQuestions[index].answers.o2;
  o3.innerHTML = myQuestions[index].answers.o3;
  o4.innerHTML = myQuestions[index].answers.o4;
}

questionDiv.addEventListener("click", function (event) {
  var element = event.target;
  var elementId = element.id;
  if (element.nodeName == "BUTTON") {
    if (elementId == myQuestions[index].correctAnswer) {
      correctAnswers++;
      answer.innerHTML = "Correct!";
    } else {
      wrongAnswers++;
      answer.innerHTML = "Wrong!";
      // Subtract 10 seconds for every wrong answer.
      timerCount = timerCount - 10;
    }
    setTimeout(function () { answer.innerHTML = ""; }, 500);
    index++;
    if (index < myQuestions.length) {
      displayQuestion();
    } else {
      clearTimer();
    }
  }
});

submitScore.addEventListener("click", submitScoreWithInitials);

function clearTimer() {
  clearInterval(counter);
  timerDiv.innerHTML = "";
  finalScore = timerCount;
  questionDiv.style.display = 'none';
  resultDiv.style.display = 'block';
  result.innerHTML = "<b>All done!</b> <br>" + " Your final score is " + finalScore;
}

function submitScoreWithInitials() {
  resultDiv.style.display = "none";
  scoreDiv.style.display = 'block';
  highscores[initials.value] = finalScore;
  initials.value = "";
  input.innerHTML = "";
  var count = 1;
  for (var key in highscores) {
    input.innerHTML = input.innerHTML  + count + ". " + key + " - " + highscores[key] + "<br>";
    count++;
  }  
}

//go back button will take you to main screen again 
goBack.addEventListener("click", goBackToStart);

function goBackToStart() {
  scoreDiv.style.display = 'none';
  startQuizDiv.style.display = "block";
  // reset variables for quiz restart
  index = 0;
  correctAnswers = 0;
  wrongAnswers = 0;
  timerCount = 60;
  timerDiv.innerHTML = "Time:" + timerCount;
}
// to clear on last screen by clicking button 
clearScore.addEventListener("click", clearScoreEvent);

function clearScoreEvent() {
  input.innerHTML = "";
  highscores = {};
}
// question list along with answers set by passing key value in array
var myQuestions = [
  {
    question: "Who invented JavaScript?",
    answers: {
      o1: "Douglas Crockford",
      o2: "Sheryl Sandberg",
      o3: "Brendan Eich",
      o4: "Brendan Eich"
    },
    correctAnswer: "o3"

  },
  {
    question: "Which one of these is a JavaScript package manager?",
    answers: {
      o1: "Node.js",
      o2: "TypeScript",
      o3: "npm",
      o4: "npm"
    },
    correctAnswer: "o2"
  },
  {
    question: "Which tool can you use to ensure code quality?",
    answers: {
      o1: "Angular",
      o2: "jQuery",
      o3: "RequireJS",
      o4: "ESLint"
    },
    correctAnswer: "o4"
  }
];