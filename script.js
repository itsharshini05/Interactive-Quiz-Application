const questions = [
    {
      question: "Which country is known as the Land of the Rising Sun?",
      answers: [
        { text: "China", correct: false },
        { text: "Japan", correct: true },
        { text: "Thailand", correct: false },
        { text: "India", correct: false }
      ]
    },
    {
      question: "What is the smallest prime number?",
      answers: [
        { text: "1", correct: false },
        { text: "2", correct: true },
        { text: "3", correct: false },
        { text: "5", correct: false }
      ]
    },
    {
      question: "Which animal is known as the Ship of the Desert?",
      answers: [
        { text: "Horse", correct: false },
        { text: "Camel", correct: true },
        { text: "Elephant", correct: false },
        { text: "Llama", correct: false }
      ]
    },
    {
      question: "Who was the first President of India?",
      answers: [
        { text: "Jawaharlal Nehru", correct: false },
        { text: "Mahatma Gandhi", correct: false },
        { text: "Dr. Rajendra Prasad", correct: true },
        { text: "Sardar Patel", correct: false }
      ]
    },
    {
      question: "Which is the longest river in the world?",
      answers: [
        { text: "Amazon", correct: false },
        { text: "Yangtze", correct: false },
        { text: "Nile", correct: true },
        { text: "Ganges", correct: false }
      ]
    },
    {
      question: "Which planet has a ring system?",
      answers: [
        { text: "Mars", correct: false },
        { text: "Saturn", correct: true },
        { text: "Earth", correct: false },
        { text: "Mercury", correct: false }
      ]
    },
    {
      question: "Which festival is known as the festival of lights?",
      answers: [
        { text: "Holi", correct: false },
        { text: "Diwali", correct: true },
        { text: "Eid", correct: false },
        { text: "Christmas", correct: false }
      ]
    },
    {
      question: "How many players are there in a cricket team?",
      answers: [
        { text: "9", correct: false },
        { text: "10", correct: false },
        { text: "11", correct: true },
        { text: "12", correct: false }
      ]
    },
    {
      question: "Which is the largest organ in the human body?",
      answers: [
        { text: "Heart", correct: false },
        { text: "Liver", correct: false },
        { text: "Skin", correct: true },
        { text: "Lungs", correct: false }
      ]
    },
    {
      question: "Who invented the light bulb?",
      answers: [
        { text: "Albert Einstein", correct: false },
        { text: "Isaac Newton", correct: false },
        { text: "Thomas Edison", correct: true },
        { text: "Nikola Tesla", correct: false }
      ]
    }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  const questionContainer = document.getElementById('question-container');
  const answerButtons = document.getElementById('answer-buttons');
  const nextButton = document.getElementById('next-btn');
  const feedback = document.getElementById('feedback');
  const scoreContainer = document.getElementById('score-container');
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreContainer.innerText = '';
    nextButton.innerText = 'Next';
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionContainer.innerText = currentQuestion.question;
  
    currentQuestion.answers.forEach(answer => {
      const button = document.createElement('button');
      button.innerText = answer.text;
      button.classList.add('btn');
      if (answer.correct) button.dataset.correct = true;
      button.addEventListener('click', selectAnswer);
      answerButtons.appendChild(button);
    });
  }
  
  function resetState() {
    feedback.innerText = '';
    nextButton.style.display = 'none';
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }
  
  function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === 'true';
  
    if (isCorrect) {
      selectedButton.classList.add('correct');
      feedback.innerText = 'Correct!';
      score++;
    } else {
      selectedButton.classList.add('wrong');
      feedback.innerText = 'Wrong!';
    }
  
    Array.from(answerButtons.children).forEach(button => {
      if (button.dataset.correct === 'true') {
        button.classList.add('correct');
      }
      button.disabled = true;
    });
  
    nextButton.style.display = 'inline-block';
  }
  
  function showScore() {
    resetState();
    questionContainer.innerText = 'Quiz Completed!';
    scoreContainer.innerText = `Your score: ${score} out of ${questions.length}`;
    nextButton.innerText = 'Restart Quiz';
    nextButton.style.display = 'inline-block';
  }
  
  function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }
  
  nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
      handleNextButton();
    } else {
      startQuiz();
    }
  });
  
  startQuiz();