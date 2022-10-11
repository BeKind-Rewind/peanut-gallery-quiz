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
var saveBtn = document.getElementById("save-score");
var input = document.getElementById("input");
var highScoresList = document.getElementById("highScoresList");

highScores = [];

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
        choices: ["Both datatype and result are compared", "Only the datatype is compared", "Only the value is compared", "None of the Above"],
        answer: "Both datatype and result are compared",
    },
    {
        question: "What is the use of the 'noscript' tag in Javascript?",
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
    }

];


// Set total quiz time based on number of questions:
var totalTime = questionsList.length * 5;
// declare variable
var timerStatus;
// start with first question 
var initQuestion = 0;




// When I click, THEN a timer starts 
function start() {
    showQuestion();
    timerStatus = setInterval(function () {
        // every time this function runs, 1 is subtracted from totalTime
        totalTime--;
        // display current totalTime in the HTML element variable timerEl
        timerEl.textContent = totalTime;

        if (totalTime <= 0 || questionsList[16]) {
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
    finalTally.innerHTML = ("Final score:" + score + "<br />" + "Enter initials:");
}

initialsText.addEventListener("submit", (event) => {
    event.preventDefault();
    let initials = input.value;
    //Store Initials and Score in Local Storage
    var resultsDataObj = {
        initials: initials,
        score: score
    }
    localStorage.setItem((localStorage.length + 1), JSON.stringify(resultsDataObj));
    createHighscore(resultsDataObj);
})


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

    location.reload();

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


// When I click start THEN I am presented with a question
// Display is hidden on page load; toggles when button clicked
startBtn.addEventListener('click', () => {
    // hide button
    startContainer.style.display = 'none';
    // start quiz
    start();
});


// create new function to get all scores from local storage on load
// parse and loop, inside loop create another li and append to highscore
function viewHighScore() {
    var highScores = JSON.parse(localStorage.getItem("highScores"));
    if (highScores === null) {
        var noHighScores = document.createElement("p");
        noHighScores.innerHTML = "No highscores yet!";
        highScoresList.appendChild(noHighScores)
        return;
    } else {
        //creating HTML element
        console.log(highScores.length);
        var listUnOrdered = document.createElement("ul");
        // iterating through the array of values in localStore
        for (var i = 0; i < highScores.length; i++) {
            var li = document.createElement("li");
            li.innerHTML = "<div style = 'text-align: left;'>" + (i + 1) + ". " +
                JSON.stringify(highScores[i].initials) + " - " + JSON.stringify(highScores[i].score) +
                "</div>";
            listUnOrdered.appendChild(li);
        }
        highScoresList.appendChild(listUnOrdered);
    }
}