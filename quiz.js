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

// Grid Navigation Elements
const gridContainer = document.getElementById('question-grid');
const gridToggle = document.getElementById('grid-toggle');
const answeredCountEl = document.getElementById('answered-count');
const totalCountEl = document.getElementById('total-count');

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
    generateQuestionGrid();
    displayQuestion();
    updateUI();
    updateProgress();
}

// Generate question grid buttons
function generateQuestionGrid() {
    if (!gridContainer) return;

    gridContainer.innerHTML = '';

    quizData.forEach((_, index) => {
        const btn = document.createElement('button');
        btn.className = 'grid-btn';
        btn.textContent = index + 1;
        btn.setAttribute('role', 'gridcell');
        btn.setAttribute('tabindex', index === 0 ? '0' : '-1');
        btn.setAttribute('data-index', index);
        btn.setAttribute('aria-label', `Câu ${index + 1}: Chưa trả lời`);

        gridContainer.appendChild(btn);
    });

    // Update total count
    if (totalCountEl) {
        totalCountEl.textContent = quizData.length;
    }

    updateCurrentHighlight();
}

// Navigate to specific question
function navigateToQuestion(index) {
    if (index >= 0 && index < quizData.length) {
        currentQuestionIndex = index;
        displayQuestion();
    }
}

// Update grid button states
function updateGridState() {
    if (!gridContainer) return;

    const buttons = gridContainer.querySelectorAll('.grid-btn');
    buttons.forEach((btn, index) => {
        const isAnswered = answeredQuestions.has(index);

        if (isAnswered) {
            const question = quizData[index];
            const isCorrect = question.selectedAnswer === question.correctAnswer;

            btn.classList.add('answered');
            if (isCorrect) {
                btn.classList.add('correct');
                btn.classList.remove('incorrect');
                btn.setAttribute('aria-label', `Câu ${index + 1}: Đã trả lời đúng`);
            } else {
                btn.classList.add('incorrect');
                btn.classList.remove('correct');
                btn.setAttribute('aria-label', `Câu ${index + 1}: Đã trả lời sai`);
            }
        } else {
            btn.classList.remove('answered', 'correct', 'incorrect');
            btn.setAttribute('aria-label', `Câu ${index + 1}: Chưa trả lời`);
        }
    });

    updateProgress();
}

// Update current question highlight
function updateCurrentHighlight() {
    if (!gridContainer) return;

    const buttons = gridContainer.querySelectorAll('.grid-btn');
    buttons.forEach((btn, index) => {
        if (index === currentQuestionIndex) {
            btn.classList.add('current');
            btn.setAttribute('tabindex', '0');
        } else {
            btn.classList.remove('current');
            btn.setAttribute('tabindex', '-1');
        }
    });
}

// Update progress counter
function updateProgress() {
    if (answeredCountEl) {
        answeredCountEl.textContent = answeredQuestions.size;
    }
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
    updateCurrentHighlight();
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

    // Update grid state
    updateGridState();
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
        Bạn làm đúng <strong>${score}</strong> trên <strong>${quizData.length}</strong> câu hỏi!<br>
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

// Grid toggle event listener
if (gridToggle) {
    gridToggle.addEventListener('click', () => {
        const isExpanded = gridToggle.getAttribute('aria-expanded') === 'true';
        gridToggle.setAttribute('aria-expanded', !isExpanded);
        gridContainer.classList.toggle('hidden');
    });
}

// Grid click event listener (event delegation)
if (gridContainer) {
    gridContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.grid-btn');
        if (btn) {
            const index = parseInt(btn.getAttribute('data-index'));
            navigateToQuestion(index);
        }
    });

    // Keyboard navigation for grid
    gridContainer.addEventListener('keydown', (e) => {
        const currentBtn = document.activeElement;
        if (!currentBtn.classList.contains('grid-btn')) return;

        const buttons = Array.from(gridContainer.querySelectorAll('.grid-btn'));
        const currentIndex = buttons.indexOf(currentBtn);
        let targetIndex = currentIndex;

        const cols = window.innerWidth <= 480 ? 4 : window.innerWidth <= 768 ? 6 : 10;

        switch(e.key) {
            case 'ArrowRight':
                targetIndex = Math.min(currentIndex + 1, buttons.length - 1);
                e.preventDefault();
                break;
            case 'ArrowLeft':
                targetIndex = Math.max(currentIndex - 1, 0);
                e.preventDefault();
                break;
            case 'ArrowDown':
                targetIndex = Math.min(currentIndex + cols, buttons.length - 1);
                e.preventDefault();
                break;
            case 'ArrowUp':
                targetIndex = Math.max(currentIndex - cols, 0);
                e.preventDefault();
                break;
            case 'Home':
                targetIndex = 0;
                e.preventDefault();
                break;
            case 'End':
                targetIndex = buttons.length - 1;
                e.preventDefault();
                break;
            case 'Enter':
            case ' ':
                const index = parseInt(currentBtn.getAttribute('data-index'));
                navigateToQuestion(index);
                e.preventDefault();
                break;
        }

        if (targetIndex !== currentIndex) {
            buttons[targetIndex].focus();
        }
    });
}

// Load quiz data when page loads
loadQuizData();
