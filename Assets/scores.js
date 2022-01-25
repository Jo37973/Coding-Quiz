//High Scores JS page (refer to scores.html as well)
function runHighscores() {
    // High Scores from localstorage, or if nothing there - blank
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    // List and sort the highscores from high to low on the page
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
    // Loop for each, and make a list for each score
    highscores.forEach(function(score) {
      // li tag for the high scores
      var list = document.createElement("li");
      list.textContent = score.initials + " scored " + score.score;
      // Show the scores on the page in the list
      var olEl = document.getElementById("highscores");
      olEl.appendChild(list);
    });
  }
  
  // Clear the high scores when clicked and reload the page
  function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
  }
  
  document.getElementById("clear").onclick = clearHighscores;
  // This will run the function for the high scores
  runHighscores();
  