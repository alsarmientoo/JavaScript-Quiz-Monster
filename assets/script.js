var startEl = document.querySelector("#start");
var timerEl = document.querySelector("#timer");
var scoreEl = document.querySelector("#score");
var helloEl = document.querySelector(".hello")
var questionsEl = document.querySelector(".questions");
var questionEl = document.querySelector("#question");
var answer1 = document.querySelector("#answer1");
var answer2 = document.querySelector("#answer2");
var answer3 = document.querySelector("#answer3");
var answer4 = document.querySelector("#answer4");
var answerButton = document.querySelectorAll("button.answ-btn");

var ifTrue = document.querySelector("#if-true");
var endGame = document.querySelector(".end-game");
var highScore = document.querySelector(".highscores");
var finalScore = document.querySelector("#score-list");
var goBackbtn = document.querySelector(".btn go-back")
var clearBtn = document.querySelector(".clear");
var submitScore = document.querySelector("#submit")
var initialsEl = document.querySelector("#initials")
var scoreList = document.querySelector("#score-list");
var choices = document.querySelector("#choices")


var timer = 75;
var questionCount = 0;
var score = [];
// var endQuestions = questionsList.length;

// list of questions
// correct answer is the index from the list of answers
const questions = [
    {
        // question 0
        question: "Commonly used data types do NOT include:",
        answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        correctAnswer: "3"
    },
    {
        // question 1
        question: "The condition in an if / else statement is enclosed within ____.",
        answers: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
        correctAnswer: "1"
    },
    {
        // question 2
        question: "Arrays in Javascript can be used to store ____.",
        answers: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correctAnswer: "3"
    },
    {
        // question 3
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answers: ["1. commmas", "2. curly brackets", "3. quotes", "4. parentheses"],
        correctAnswer: "2"
    },
    {
        // question 4
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["1. Javascript", "2. terminal/bash", "3. for loops", "4. console.log"],
        correctAnswer: "3"
    }
];

function verifyAnswer(event) {
    event.preventDefault();

    // show section for iftrue and append message
    ifTrue.style.display = "block";
    var p = document.createElement("p");
    ifTrue.appendChild(p);

    // time out after 0.5 second
    setTimeout(function () {
        p.style.display = 'none';
    }, 500);

    // checks answer from questions array, question.answer = question.correctanswer array
    if (questions[questionCount].correctAnswer === event.target.value) {
        p.textContent = "Correct!";
    } 
    else if (questions[questionCount].correctAnswer !== event.target.value) {
        timer = timer - 10;
        p.textContent = "Wrong!";
    }

    // increment so the questions index is increased
    if (questionCount < questions.length) {
        questionCount++;
    }
    // call setQuestion to show another question
    setQuestion(questionCount);
};

function startTime() {
    var timerInterval = setInterval (function() {
        timer--;
        timerEl.textContent =  "time left: " + timer;
        // endGame.style.display = "none";
        // highScore.style.display = "none";

        if (timer === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            scoreEl.textContent = timer;
            helloEl.style.display = "none";
            highScore.style.display = "none";
            questionEl.style.display = "none";
            // questions.answers.style.display = "none"
            endGame.style.display = "block"
            choices.style.display = "none";
        }
    }, 1000)
};

function startQuiz() {
    helloEl.style.display = "none";
    // highScore.style.display = "none";
    questionsEl.style.display = "block";
    startTime();
    setQuestion(questionCount);
};

function setQuestion(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        answer1.textContent = questions[id].answers[0];
        answer2.textContent = questions[id].answers[1];
        answer3.textContent = questions[id].answers[2];
        answer4.textContent = questions[id].answers[3];
    }
};

function totalScore(event) {
    event.preventDefault();

    // if (questionCount === 0) {
    //     endGame.style.display = "block";
    // }

    // var playersInitials = initialsEl.value.toUpperCase;

    // endGame.style.display = "block";
    highScore.style.display = "block";
    questionEl.style.display = "none";
    // choices.style.display = "none";


    scoreList.innerHTML = "";
    for (var i = 0; i < score.length; i ++) {
        var li = document.createElement("li");
        if (initialsEl = initialsEl.value.toUpperCase) {
            initialsEl = initialsEl;
            score = score;
            scoreList.append(li);
        }
    }

    saveScoresLocally();
    recallScores();
};

function saveScoresLocally(){
    localStorage.setItem("score", JSON.stringify("score"));
    // endGame.display.style = "none";
};

function recallScores() {
    var recalledScores = JSON.parse(localStorage.getItem("score"));

    if (recalledScores !== null) {
        score = recallScores;
    }
};

function deleteScores() {
    scoreList.innerHTML = "";
}

startEl.addEventListener("click", startQuiz);

answerButton.forEach(item => {
    item.addEventListener("click", verifyAnswer);
});

submitScore.addEventListener("click", totalScore);    

goBackbtn.addEventListener("click", function() {
    startQuiz();
    startTime();
});
