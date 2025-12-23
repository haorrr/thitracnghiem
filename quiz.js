// Quiz Application
let quizData = [];
let currentQuestionIndex = 0;
let score = 0;
let answeredQuestions = new Set();

// DOM Elements
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const questionCounter = document.getElementById('question-counter');
const scoreElement = document.getElementById('score');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const finalScore = document.getElementById('final-score');
const restartBtn = document.getElementById('restart-btn');

// Load quiz data from JSON file
async function loadQuizData() {
    try {
        const response = await fetch('quiz_data.json');
        const data = await response.json();
        // Filter out questions with no correct answer (correctAnswer === -1)
        quizData = data.filter(q => q.correctAnswer !== -1);

        if (quizData.length === 0) {
            questionText.textContent = 'No valid questions found!';
            return;
        }

        initializeQuiz();
    } catch (error) {
        console.error('Error loading quiz data:', error);
        questionText.textContent = 'Error loading quiz data. Please make sure quiz_data.json is in the same directory.';
    }
}

// Initialize quiz
function initializeQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    answeredQuestions.clear();
    displayQuestion();
    updateUI();
}

// Display current question
function displayQuestion() {
    if (currentQuestionIndex >= quizData.length) {
        showResults();
        return;
    }

    const question = quizData[currentQuestionIndex];
    questionText.textContent = question.question;

    // Clear previous answers
    answersContainer.innerHTML = '';

    // Create answer buttons
    question.answers.forEach((answer, index) => {
        const answerBtn = document.createElement('button');
        answerBtn.className = 'answer-btn';
        answerBtn.textContent = answer;
        answerBtn.setAttribute('data-index', index);

        // If question was already answered, show the result
        if (answeredQuestions.has(currentQuestionIndex)) {
            answerBtn.classList.add('disabled');
            if (index === question.correctAnswer) {
                answerBtn.classList.add('correct');
            }
            // Find which answer was selected (we'll store this info)
            const selectedAnswer = question.selectedAnswer;
            if (selectedAnswer !== undefined && index === selectedAnswer && selectedAnswer !== question.correctAnswer) {
                answerBtn.classList.add('incorrect');
            }
        } else {
            answerBtn.addEventListener('click', () => handleAnswerClick(index));
        }

        answersContainer.appendChild(answerBtn);
    });

    updateUI();
}

// Handle answer click
function handleAnswerClick(selectedIndex) {
    if (answeredQuestions.has(currentQuestionIndex)) {
        return; // Already answered
    }

    const question = quizData[currentQuestionIndex];
    const correctIndex = question.correctAnswer;
    const answerButtons = answersContainer.querySelectorAll('.answer-btn');

    // Store the selected answer
    question.selectedAnswer = selectedIndex;

    // Mark question as answered
    answeredQuestions.add(currentQuestionIndex);

    // Disable all answer buttons
    answerButtons.forEach(btn => {
        btn.classList.add('disabled');
        const index = parseInt(btn.getAttribute('data-index'));

        // Highlight correct answer in green
        if (index === correctIndex) {
            btn.classList.add('correct');
        }

        // If wrong answer was selected, highlight it in red
        if (index === selectedIndex && selectedIndex !== correctIndex) {
            btn.classList.add('incorrect');
        }
    });

    // Update score if correct
    if (selectedIndex === correctIndex) {
        score++;
        scoreElement.textContent = `Điểm: ${score}`;
    }
}

// Update UI elements
function updateUI() {
    questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
    scoreElement.textContent = `Điểm: ${score}`;

    // Enable/disable navigation buttons
    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.textContent = currentQuestionIndex === quizData.length - 1 ? 'Finish' : 'Next';
}

// Show results
function showResults() {
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');

    const percentage = ((score / quizData.length) * 100).toFixed(1);
    finalScore.innerHTML = `
        You scored <strong>${score}</strong> out of <strong>${quizData.length}</strong> questions!<br>
        <span style="color: #667eea; font-size: 2rem; font-weight: bold;">${percentage}%</span>
    `;
}

// Navigation event listeners
prevBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        showResults();
    }
});

restartBtn.addEventListener('click', () => {
    resultContainer.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    initializeQuiz();
});

// Load quiz data when page loads
loadQuizData();
