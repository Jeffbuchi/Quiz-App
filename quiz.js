let start = document.getElementById("start");
let quiz = document.getElementById("quiz");
let question = document.getElementById("question");
let choiceA = document.getElementById("A");
let choiceB = document.getElementById("B");
let choiceC = document.getElementById("C");
let counter = document.getElementById("counter");
let timeGuage = document.getElementById("timeGuage");
let progress = document.getElementById("progress");
let scoreDiv = document.getElementById("scoreContainer");


let questions = [

    {
        question: "Who is the Nigeria's First female Pilot",
        choiceA: "Wrong",
        choiceB: "Wrong",
        choiceC: "Correct",
        correct: "C",
    },{
        question: "Who is the first woman to drive a car in Nigeria",
        choiceA: "Correct",
        choiceB: "Wrong",
        choiceC: "Wrong",
        correct: "A",
    }
    
];

let lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
let questionTime = 10;
let guageWidth = 150;
let guageUnit = guageWidth / questionTime;
let TIMER;
let score = 0;

function renderQuestion() {
    let q = questions[runningQuestion];

    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;

} 

start.addEventListener("click", startQuiz);

function startQuiz() {
start.style.display = "none";
renderQuestion();
quiz.style.display = "block";
renderProgress();
renderCounter();
TIMER = setInterval(renderCounter, 1000);
}

function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class ='prog' id ="+ qIndex +"></div>";
    }
}



function renderCounter() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGuage.style.width = count * guageUnit + "px";
        count++;
    } else {
        count = 0;
        answerIsWrong();
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion;
        } else {
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct){
        score++;
        answerIsCorrect();
    } else {
        answerIsWrong();
    }
    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion;
    } else {
        clearInterval(TIMER);
        scoreRender();
    }
}

function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "green";
}

function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "red";
}

function scoreRender() {
    scoreDiv.style.display = "block";
    let scorePerCent = Math.round(100 * score/questions.length);

    let remarks = (scorePerCent >= 80) ? "Excellent" : (scorePerCent >= 60) ? "Very Good":
                  (scorePerCent >= 40) ? "Try Harder" : (scorePerCent >= 20) ? "Not Good enough":
                  "Too Bad";
    scoreDiv.innerHTML = "<h3>"+ remarks +"</h3>";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}