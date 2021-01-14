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
var index;
var correctAnswers;
var wrongAnswers;
var timerCount;
var counter;
var highscores = {};

startQuizButton.addEventListener("click", buildQuiz);

function buildQuiz() {
  index = 0;
  correctAnswers = 0;
  wrongAnswers = 0;
  timerCount = 60;
  startQuizDiv.style.visibility = "hidden";
  questionDiv.style.display = 'block';
  timerDiv.innerHTML = "Time:" + timerCount;
  console.log("timer at this point-> ", + timerCount);
  counter = setInterval(timer, 1000);
  displayQuestion();
}

//1000 will  run it every 1 second

function timer() {
  if (timerCount <= 0) {
    clearInterval(counter);
  } else {
    timerCount--;
    timerDiv.innerHTML = "Time:" + timerCount;
  }
}

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
      finalScore = timerCount;
      questionDiv.style.display = 'none';
      resultDiv.style.display = 'block';
      result.innerHTML = "<b>All done!</b> <br>" + " Your final score is " + finalScore;
    }
  }
});

submitScore.addEventListener("click", submitScoreWithInitials);

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

goBack.addEventListener("click", goBackToStart);

function goBackToStart() {
  scoreDiv.style.display = 'none';
  startQuizDiv.style.visibility = "visible";
}

clearScore.addEventListener("click", clearScoreEvent);

function clearScoreEvent() {
  input.innerHTML = "";
  highscores = {};
}

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