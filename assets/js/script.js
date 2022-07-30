// Create questions with Answer arrays
var questionsList = [
    {
        question: "Which of the following is the correct syntax to print a page using JavaScript?",
        choices: ["window.print();", "browser.print();", "navigator.print();", "document.print();"],
        answer: "window.print();",
    },
    {
        question: "Which of the following type of variable is visible only within a function where it is defined?",
        choices: ["Global variable", "Local variable", "Both of the above.", "None of the above."],
        answer: "Local variable",
    },
    {
        question: "Which built-in method returns the calling string value converted to lower case?",
        choices: ["toLowerCase()", "toLower()", "changeCase(case)", "None of the above."],
        answer: "toLowerCase()",
    },
    {
        question: "Which of the following function of String object creates an HTML hypertext link that requests another URL?",
        choices: ["sub()", "sup()", "small()", "link()"],
        answer: "link()",
    },
    {
        question: "Which of the following function of Array object removes the last element from an array and returns that element?",
        choices: ["push()", "join()", "pop()", "map()"],
        answer: "pop()",
    },
    {
        question: "Which of the following function of Array object returns a string representing the array and its elements?",
        choices: ["toSource()", "sort()", "splice()", "toString()"],
        answer: "toString()",
    },
    {
        question: "Javascript is a(n) _______ language?",
        choices: ["Object-Based", "Procedural", "", "Object-Oriented"],
        answer: "Object-Oriented",
    },
    {
        question: "Which of the following methods is used to access HTML elements using Javascript?",
        choices: ["getElementById()", "getElementsByClass()", "Both A & B", "None of the above"],
        answer: "Both A & B",
    },
    // {
    //     question: "",
    //     choices: ["", "", "", ""],
    //     answer: "",
    // },
   
];



var startContainer = document.getElementById("startContainer");
var questionContainer = document.getElementById("questionContainer");
var startBtn = document.getElementById("startBtn");
var initQuestion = 0;
var choiceArr = document.getElementById("choices");
var scoreDisplay = document.getElementById("scoreDisplay");
var check = document.getElementById("check");
var timerEl = document.getElementById("timerDisplay");


var totalTime = questionsList.length * 10;
var quiz = 8;
var timerStatus;


// When I click THEN a timer starts 
function start () {
    timerStatus = setInterval(function() {
        
        totalTime--;
        // time--;

        timerEl.textContent = totalTime;
        // timerEl.textContent = time;
        if(totalTime === 0){
            quizEnd();
            console.log("quiz is done!");
        }

    }, 1000);

    updateScore(0);
    showQuestion();
};

// set the beginning score to 0
var score = 0;

// function to display and update score
function updateScore (){
    scoreDisplay.textContent = score;
}


var showQuestion = function() {
    choiceArr.innerHTML = '';
    var currentQuestion = questionsList[initQuestion];
    var name = document.getElementById("question");
    name.textContent = currentQuestion.question;

    currentQuestion.choices.forEach(function(option) {
        var choiceBtn = document.createElement("button");
        var listItem = document.createElement("li");
        choiceBtn.setAttribute("value", option);
        choiceBtn.setAttribute("class", "choice");
        choiceBtn.textContent = option;
        choiceBtn.onclick = questionCheck;
        listItem.appendChild(choiceBtn);
        choiceArr.appendChild(listItem);

    });
};

function questionCheck(event) {
    console.log(event);
    if (event.target.value === questionsList[initQuestion].answer){
        score++;
        check.textContent = "Correct!";
        updateScore();
    } else {
        // subtract 10 from timer count
        check.textContent = "Wrong!";
    }
    initQuestion = initQuestion + 1;
    showQuestion();

};


// Also, When I click THEN I am presented with a question
// Display is hidden on page load; toggles when button clicked
startBtn.addEventListener('click', () => {
    // hide button
    startContainer.style.display = 'none';
    //show div
    const questionContainer = document.getElementById('questionContainer');
    questionContainer.style.display = 'block';
    // start quiz
    start();
});


// WHEN I answer a question incorrectly THEN time is subtracted from the clock



// END GAME_GAME OVER: WHEN all questions are answered or the timer reaches 0
function quizEnd() {
    startContainer.style.display = 'none';
    // Container for endGame: "Time's Up!", display score, and form for initials input

    // PUSH (initials and high score) to array in local storage JSON.parse and JSON.stringify
}


// Create High Score HTML

// Get previous top 10 scores displayed on the highscore html 












