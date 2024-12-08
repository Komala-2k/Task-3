const questions = [
    {
        question: "What does CSS stand for?",
        options: [
            "Cascading Style Sheets",
            "Creative Style System",
            "Computer Style Sheets",
            "Colorful Style Sheets"
        ],
        correct: 0,
        explanation: "CSS stands for Cascading Style Sheets. It's a style sheet language used for describing the presentation of a document written in HTML."
    },
    {
        question: "Which property is used to change the background color?",
        options: [
            "color",
            "bgcolor",
            "background-color",
            "background"
        ],
        correct: 2,
        explanation: "The background-color property is used to set the background color of an element. While 'background' can also work, background-color is more specific."
    },
    {
        question: "How do you select an element with id 'demo'?",
        options: [
            ".demo",
            "#demo",
            "demo",
            "*demo"
        ],
        correct: 1,
        explanation: "In CSS, the hash (#) symbol is used to select an element with a specific id. So #demo selects the element with id='demo'."
    },
    {
        question: "Which property is used to change the font of an element?",
        options: [
            "font-style",
            "text-style",
            "font-family",
            "text-family"
        ],
        correct: 2,
        explanation: "The font-family property is used to specify the font for text. Font-style is used for italic/normal text, not for changing the font type."
    },
    {
        question: "How do you make each word in a text start with a capital letter?",
        options: [
            "text-transform: capitalize",
            "text-style: capitalize",
            "transform: capitalize",
            "text-case: capitalize"
        ],
        correct: 0,
        explanation: "The text-transform: capitalize property is used to transform the first character of each word to uppercase."
    }
];

let currentQuestion = 0;
let score = 0;

// Initialize quiz when page loads
window.onload = function() {
    loadQuestion();
    updateProgress();
};

function loadQuestion() {
    const question = questions[currentQuestion];
    const quizForm = document.getElementById('quiz-form');
    const questionText = document.getElementById('question-text');
    const currentQuestionEl = document.getElementById('current-question');
    const scoreEl = document.getElementById('score');
    
    // Update question text and progress
    questionText.textContent = question.question;
    currentQuestionEl.textContent = `Question ${currentQuestion + 1}/${questions.length}`;
    scoreEl.textContent = `Score: ${score}`;
    
    // Clear previous options
    quizForm.innerHTML = '';
    
    // Create radio button options
    question.options.forEach((option, index) => {
        const optionContainer = document.createElement('div');
        optionContainer.className = 'option-item';
        
        const input = document.createElement('input');
        input.type = 'radio';
        input.id = `option${index}`;
        input.name = 'quiz-option';
        input.value = index;
        
        const label = document.createElement('label');
        label.htmlFor = `option${index}`;
        label.textContent = option;
        
        optionContainer.appendChild(input);
        optionContainer.appendChild(label);
        quizForm.appendChild(optionContainer);
    });

    // Reset buttons and feedback
    document.getElementById('check-btn').style.display = 'block';
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('feedback').style.display = 'none';
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz-option"]:checked');
    if (!selectedOption) {
        alert('Please select an answer');
        return;
    }

    const selectedAnswer = parseInt(selectedOption.value);
    const question = questions[currentQuestion];
    const feedback = document.getElementById('feedback');
    const feedbackText = document.getElementById('feedback-text');
    const explanationText = document.getElementById('explanation-text');
    
    // Show feedback
    feedback.style.display = 'block';
    if (selectedAnswer === question.correct) {
        feedbackText.innerHTML = '<span class="correct">✓ Correct!</span>';
        score++;
    } else {
        feedbackText.innerHTML = '<span class="wrong">✗ Incorrect</span>';
        feedbackText.innerHTML += `<br>The correct answer is: ${question.options[question.correct]}`;
    }
    explanationText.textContent = question.explanation;
    
    // Update buttons
    document.getElementById('check-btn').style.display = 'none';
    document.getElementById('next-btn').style.display = 'block';
    
    // Disable all radio buttons
    document.querySelectorAll('input[name="quiz-option"]').forEach(input => {
        input.disabled = true;
    });
    
    // Highlight correct and wrong answers
    document.querySelectorAll('.option-item').forEach((item, index) => {
        if (index === question.correct) {
            item.classList.add('correct-answer');
        } else if (index === selectedAnswer) {
            item.classList.add('wrong-answer');
        }
    });
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
        updateProgress();
    } else {
        showResults();
    }
}

function updateProgress() {
    const progress = document.getElementById('progress');
    const percentage = ((currentQuestion + 1) / questions.length) * 100;
    progress.style.width = `${percentage}%`;
}

function showResults() {
    document.getElementById('quiz').style.display = 'none';
    const results = document.getElementById('results');
    const finalScore = document.getElementById('final-score');
    const finalMessage = document.getElementById('final-message');
    
    results.style.display = 'block';
    const percentage = (score/questions.length) * 100;
    
    finalScore.innerHTML = `
        <h3>Your Score: ${score}/${questions.length}</h3>
        <p>Percentage: ${percentage}%</p>
    `;
    
    if (percentage >= 80) {
        finalMessage.innerHTML = '<p>Excellent! You have a great understanding of CSS!</p>';
    } else if (percentage >= 60) {
        finalMessage.innerHTML = '<p>Good job! Keep practicing to improve further.</p>';
    } else {
        finalMessage.innerHTML = '<p>Keep learning! Review the CSS basics and try again.</p>';
    }
}

// Event Listeners
document.getElementById('check-btn').addEventListener('click', checkAnswer);
document.getElementById('next-btn').addEventListener('click', nextQuestion);
