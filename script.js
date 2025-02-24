let questions = [];
let currentQuestionIndex = 0;
let score = 0;

fetch("questions.json")
  .then((response) => response.json())
  .then((data) => {
    questions = data.sort(() => Math.random() - 0.5).slice(0, 10);
    loadQuestion();
  });

function loadQuestion() {
  document.getElementById("next").style.display = "none";
  const questionObj = questions[currentQuestionIndex];
  document.getElementById("question").innerText = questionObj.question;
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";
  questionObj.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.onclick = () => checkAnswer(index, questionObj.correct);
    answersDiv.appendChild(button);
  });
}

function checkAnswer(index, correctIndex) {
  const buttons = document.querySelectorAll(".answers button");
  buttons.forEach((button, i) => {
    button.classList.add("disabled");
    if (i === correctIndex) button.classList.add("correct");
    if (i === index && i !== correctIndex) button.classList.add("wrong");
  });
  if (index === correctIndex) {
    score++;
    document.getElementById("score").innerText = score;
  }
  document.getElementById("next").style.display = "block";
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    document.getElementById(
      "quiz-container"
    ).innerHTML = `<h2>Spiel beendet!</h2><p>Du hast ${score} von ${questions.length} richtig!</p><button onclick="location.reload()">Neustart</button>`;
  }
}
