// Coding Quiz Questions and Answers
// Q&A source for Coding Questions with MC Answers: https://www.javatpoint.com/css-mcq

// Variable for the quiz questions
var questions = [
  {
    question: "CSS stands for:",
    options: ["Cascade style sheets", "color and style sheets", "Cascading style sheets", "None of the above"],
    answer: "Cascading style sheets"
  },
  {
    question: "The HTML attribute used to define the internal stylesheet is:",
    options: ["<style>", "style", "<link>", "<script>"],
    answer: "<style>"
  },
  {
    question: "Which is the correct syntax to make the background-color of all paragraph elements to blue?",
    options: ["p {background-color: blue;}","p {background-color: #blue;}", "all {background-color: blue;}","all p {background-color: #blue;}"],
    answer: "p {background-color: blue;}"
  },
  {
    question:
      "The correct syntax to give a line over text is:",
    options: ["text-decorations: line-through", "text-decoration: none", "text-decoration: overline", "text-decoration: underline"],
    answer: "text-decoration: overline"
  },
  {
    question:
      "The HTML attribute used to define the inline style is:",
      options: ["style", "styles", "class", "None of the above"],
    answer: "style"
  }
];

// Variables for the questions and timer, including the length of each question (20 sec. per)
var currentQuestionOption = 0;
var time = questions.length * 20;
var timerId;

// variables for the DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var optionsEl = document.getElementById("options");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var noteEl = document.getElementById("note");

//Function to start the quiz
function startQuiz() {

  // Hide the start screen
  var startScreenEl = document.getElementById("start-quiz");
  startScreenEl.setAttribute("class", "hide");

  // Show the questions
  questionsEl.removeAttribute("class");

  // This sets the timer with a given set time
  timerId = setInterval(clock, 1000);

  // This shows the user the timer/time with the set time 
  timerEl.textContent = time;

  getQuestion();
}

// Function for the questions
function getQuestion() {

  // This gets the questions and current question
  var currentQuestion = questions[currentQuestionOption];

  // This gets the next question
  var questionEl = document.getElementById("question-type");
  questionEl.textContent = currentQuestion.question;

  // This removes other quetsions
  optionsEl.innerHTML = "";

  // Loop through the questions
  currentQuestion.options.forEach(function(option, i) {
    // Buttons for each with attributes
    var optionSelect = document.createElement("button");
    optionSelect.setAttribute("class", "option");
    optionSelect.setAttribute("value", option);
// Placing the answer text on the buttons
    optionSelect.textContent = i + 1 + ". " + option;

    // Event Listener for the click event
    optionSelect.onclick = questionClick;

    // Displays/adding the buttons with choices on the page
    optionsEl.appendChild(optionSelect);
  });
}

function questionClick() {
  // This checks if the user has made an incorrect choice for an answer
  if (this.value !== questions[currentQuestionOption].answer) {
    // When incorrect, take 10 seconds off the timer as a penalty
    time -= 10;
    // Have the timer stop at 0
    if (time < 0) {
      time = 0;
    }
    // Adjust and show the new current time on the timer
    timerEl.textContent = time;
    // If the answer is wrong, set the value to incorrect
    noteEl.textContent = "Incorrect!";
    // Otherwise, if the answer is correct, set the value to Correct
  } else {
    noteEl.textContent = "Correct!";
  }

  // Show incorrect or correct note to the user on the page
  noteEl.setAttribute("class", "note");
  // Set a timer for how long to display the note
  setTimeout(function() {
    noteEl.setAttribute("class", "note hide");
  }, 2 * 1000);

  // Next question
  currentQuestionOption++;

  // This is checking that all of the questions are done/quiz end
  if (currentQuestionOption === questions.length) {
    quizDone();
    // If not done with the questions, get the next question to run
  } else {
    getQuestion();
  }
}

function quizDone() {
  // Stop the timer at the end of the quiz
  clearInterval(timerId);

  // This shows the last/end screen of the quiz
  var endScreenEl = document.getElementById("end");
  // Unhide and show
  endScreenEl.removeAttribute("class");

  // Final Score is shown
  var finalScoreEl = document.getElementById("final-score");
  // User score is based off time left
  finalScoreEl.textContent = time;

  // Hide the questions
  questionsEl.setAttribute("class", "hide");
}

function clock() {
  // Update the time as it runs, counting down and display new time
  time--;
  timerEl.textContent = time;

  // Check the time, if the user ran out of time, end the quiz
  if (time <= 0) {
    quizDone();
  }
}

//User Scores (also refer to scores.html)
function saveScore() {
  // Get the initials/value from the input from the user (keep to 3 initials, otherwise trim the rest off)
  var initials = initialsEl.value.trim();

  // Check that the input wasn't empty or left blank
  if (initials !== "") {
    // Saved scores from localstorage, if any are used, otherwise create high score
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // Score for the user
    var userScore = {
      score: time,
      initials: initials
    };
    // Save score , time, and initials to localstorage and add to highscores
    highscores.push(userScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    // Display the high scores page in the window
    window.location.href = "scores.html";
  }
}
// This is when the user clicks the submit button
submitBtn.onclick = saveScore;
// This is when the user clicks the start button
startBtn.onclick = startQuiz;
