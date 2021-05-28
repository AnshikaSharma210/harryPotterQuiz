const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}
function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: 'Who played role of Harry in the famous "Harry Potter" series?',
    answers: [
      { text: "Daniel Radcliffe", correct: true },
      { text: "Robert Pattinson", correct: false }
    ]
  },
  {
    question:
      "What was the name of the group formed by Harry for training of defence  against dark arts?",
    answers: [
      { text: "Order of Phoenix", correct: false },
      { text: "Dumbledores Army", correct: true },
      { text: "Ministry of Magic", correct: false }
    ]
  },
  {
    question: "Dobby was the house-elf of ...?",
    answers: [
      { text: "Weasleys", correct: false },
      { text: "Malfoys", correct: true },
      { text: "Potters", correct: false }
    ]
  },
  {
    question: "Who was the half-blood prince?",
    answers: [
      { text: "Severus Snape", correct: true },
      { text: "Harry Potter", correct: false },
      { text: "Dumbledore", correct: false }
    ]
  },
  {
    question: "During the Goblet of Fire event, who was killed by Voldemort?",
    answers: [
      { text: "Hermione", correct: false },
      { text: "Ron", correct: false },
      { text: "Cedric", correct: true }
    ]
  }
];
