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
var index = 0;
var correctAnswers = 0;
var wrongAnswers = 0;
var timerCount = 60;
var counter;

startQuizButton.addEventListener("click", buildQuiz);

function buildQuiz(){
    startQuizDiv.style.visibility = "hidden" ;
    questionDiv.style.visibility = 'visible' ;
    timerDiv.innerHTML = timerCount;
    console.log("timer at this point-> " + timerCount);
    counter = setInterval(timer, 1000);
    displayQuestion();
}

 //1000 will  run it every 1 second
        
function timer() {
    if (timerCount <= 0) {
        clearInterval(counter);
    } else {
        timerCount--;
        timerDiv.innerHTML = timerCount;
    }
}


function displayQuestion(){
    ques.innerHTML = myQuestions[index].question;
    o1.innerHTML = myQuestions[index].answers.o1;
    o2.innerHTML = myQuestions[index].answers.o2;
    o3.innerHTML = myQuestions[index].answers.o3;
    o4.innerHTML = myQuestions[index].answers.o4;
}

questionDiv.addEventListener("click", function(event) {
    var element = event.target;
    var elementId = element.id;
    if (element.nodeName == "BUTTON"){
        if (elementId == myQuestions[index].correctAnswer){
            correctAnswers++;
            answer.innerHTML = "Correct!";
        } else {
            wrongAnswers++;
            answer.innerHTML = "Wrong!";
            // Subtract 10 seconds for every wrong answer.
            timerCount = timerCount - 10;
        }
        setTimeout(function(){ answer.innerHTML = ""; }, 1000);
        index++;
        if (index < myQuestions.length){
            displayQuestion();
        } else {
            finalScore = timerCount;
            questionDiv.style.visibility = 'hidden' ;
            resultDiv.style.visibility = 'visible' ;
            result.innerHTML = "<b>All done!</b> <br>" + " Your final score is " + finalScore;
            
        }
    } 
    
  });


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