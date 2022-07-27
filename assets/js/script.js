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
   
]



var startContainer = document.getElementById("startContainer");
var questionContainer = document.getElementById("questionContainer");
var startBtn = document.getElementById("startBtn");

var totalTime = quizQuestions.length * 10;
var quiz = 8;
var timerStatus;


// When I click THEN a timer starts 
function start () {
    //   document.getElementById(startBtn).addEventListener("click", startTimer);
    var startQuiz = document.getElementById(startBtn);
    startQuiz.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    timerStatus = setInterval(function() {
        time--
    },
    );

  function startTimer() {
    document.getElementById(timerDisplay).innerHTML = "Time left: " + totalTime;
    if(totalTime < 0) {
        setTimeout('document.quiz.submit()', 1);
    } else {
        totalTime = totalTime -1;
        setTimeout(startTimer(), 1000);
    }
  };
};

setTimeout(startTimer(), 1000);



// Also, When I click THEN I am presented with a question
// Display is hidden on page load; toggles when button clicked
startBtn.addEventListener('click', () => {
    // hide button
    startContainer.style.display = 'none';
    //show div
    const questionContainer = document.getElementById('questionContainer');
    questionContainer.style.display = 'block';
});



var stringQuestions = JSON. stringify(questionsList);
localStorage.setItem("questionsList", stringQuestions);

// Displays the questions and their info
var displayQuestion = function () {
    var text = "";
    // Retrieves the questionsList info from local storgae
    var questions = localStorage.getItem("questionsList");
    // Parse the string into an object
    var questionsArr = JSON.parse(questions);
    for (var i = 0; i < questionsArr.length; i++) {
        text += questionsList[i] + "<br>";
    };

    document.getElementById("list").innerHTML = text;

};

displayQuestion();





// WHEN I answer a question THEN I am presented with another question



// WHEN I answer a question incorrectly THEN time is subtracted from the clock



// END GAME_GAME OVER: WHEN all questions are answered or the timer reaches 0



// WHEN the game is over THEN (prompt or show form) I can save my initials and score
// PUSH to array in local storage











