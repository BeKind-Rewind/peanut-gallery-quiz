// start container 
const startContainer = document.getElementById("startContainer");
const startBtn = document.getElementById("startBtn");
// questions container
const questionsToHide = document.getElementById("questionsToHide");
const choiceArr = document.getElementById("choices");
const question = document.getElementById("question");
var scoreDisplay = document.getElementById("scoreDisplay");
var check = document.getElementById("check");
var timerEl = document.getElementById("timerDisplay");
var finalTally = document.getElementById("finalTally");
var initialsText = document.getElementById("initials");
var highScoresList = document.getElementById("highScoresList");

// Create questions with Answer arrays
let questionsList = [
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
        choices: ["Object-Based", "Procedural", "Object-Oriented", "None of the above"],
        answer: "Object-Oriented",
    },
    {
        question: "Which of the following methods is used to access HTML elements using Javascript?",
        choices: ["getElementById()", "getElementsByClass()", "Both A & B", "None of the above"],
        answer: "Both A & B",
    },
    {
        question: "Which of the following keywords is used to define a variable in Javascript?",
        choices: ["var", "let", "Both A & B", "None of the above"],
        answer: "Both A & B",
    },
    {
        question: "Upon encountering empty statements, what does the Javascript Interpreter do?",
        choices: ["Throws and error", "Ignores the statements", "Gives a warning", "None of the above"],
        answer: "Ignores the statements",
    },
    {
        question: "When the switch statement matches the expression with the given labels, how is the comparison done?",
        choices: ["Both the datatype and the result of the expression are compared", "Only the datatype of the expression is compared", "Only the value of the expression is compared", "None of the Above"],
        answer: "Both the datatype and the result of the expression are compared",
    },
    {
        question: "What is the use of the <noscript> tag in Javascript?",
        choices: ["The contents are displayed in non-JS-based browsers", "Clears all the cookies and the cache", "Both A & B", "None of the above"],
        answer: "The contents are displayed in non-JS-based browsers",
    },
    {
        question: "What will be the output of: ' print(typeof(NaN)); ' ?",
        choices: ["Object", "Number", "String", "None of the Above"],
        answer: "Number",
    },
    {
        question: "What keyword is used to check whether a given property is valid or not?",
        choices: ["in", "is in", "exists", "lies"],
        answer: "in",
    },
    {
        question: "Which of the following are closures in Javascript?",
        choices: ["Variables", "Functions", "Objects", "All of the above"],
        answer: "All of the above",
    },
    {
        question: "Which function is used to serialize an object into a JSON string in Javascript?",
        choices: ["stringify", "parse", "convert", "None of the above"],
        answer: "stringify",
    },

];


// Set total quiz time based on number of questions:
var totalTime = questionsList.length * 5;
// declare variable
var timerStatus;
// start with first question 
var initQuestion = 0;
// declare variable for the end of questions, used to end quiz
var questionsListEnd = questionsList.slice(-1);



// When I click, THEN a timer starts 
function start() {
    showQuestion();
    timerStatus = setInterval(function () {
        // every time this function runs, 1 is subtracted from totalTime
        totalTime--;
        // display current totalTime in the HTML element variable timerEl
        timerEl.textContent = totalTime;

        if (totalTime <= 0) {
            // if time runs out or goes negative, the timer stops
            clearInterval(timerStatus);
            // if time is 0 or less, set totalTime value to 0
            totalTime = 0;
            // if time is 0 or less, set display to 0 
            timerEl.textContent = totalTime;
            // run endQuiz function
            endQuiz();
            console.log("GAMEOVER");
        }
    }, 1000);

    updateScore(0);


};

var endQuiz = function () {
    var showEndScreen = document.getElementById("end-screen");
    showEndScreen.removeAttribute("class");
    questionsToHide.setAttribute("class", "hide");

    var newHighScore = score + "/" + questionsList.length

    finalTally.innerHTML = ("Final score:" + "<br />" + score + " / " + questionsList.length +
        "." + "<br />" + Math.floor(score / questionsList.length * 100) + "%" + "<br />" +
        "Enter name: ");

    var newScoreRecord = newHighScore + " - " +
        JSON.stringify(score / questionsList.length * 100) + "%";

    initialsText.addEventListener("submit", (event) => {
        event.preventDefault();
        let initials = initialsText.value;
        //Store Initials and Score in Local Storage
        var resultsDataObj = {
            initials: initials,
            newScoreRecord: score
        }
        localStorage.setItem((localStorage.length + 1), JSON.stringify(resultsDataObj));
        initialsText.value = ""
        location.reload();
        createHighscore(resultsDataObj)
    })
}

// google "javascript redirect" direct user to high scores page
// then get from local storage to display on the page
// remember to get questions to display again
// get the initials to save with the score --> event.target to get to the value of the form




function createHighscore(resultsDataObj) {

    console.log(resultsDataObj);
    var highScores = JSON.parse(localStorage.getItem("highScores"));

    if (highScores === null) {
        var updatedRanking = [];
        updatedRanking.push(resultsDataObj);
        localStorage.setItem("highScores", JSON.stringify(updatedRanking));
    } else {
        highScores.push(resultsDataObj);
        localStorage.setItem("highScores", JSON.stringify(highScores));
    }

}


// set the beginning score to 0
var score = 0;

// function to display and update score
function updateScore() {
    scoreDisplay.textContent = score;
}


var showQuestion = function () {
    choiceArr.innerHTML = '';
    var currentQuestion = questionsList[initQuestion];
    question.innerHTML = currentQuestion.question;

    currentQuestion.choices.forEach(function (option) {
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
    if (event.target.value === questionsList[initQuestion].answer) {
        score++;
        check.textContent = "Correct!";
        updateScore();
    } else {
        // subtract 10 from timer count
        totalTime = totalTime - 10;
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
    // start quiz
    start();
});

// eventlistener for initials form submit
// push score and initials to local storage
// get list of high scores
// display list 
// compare to top 10
// Get previous top 10 scores displayed on the highscore html 









