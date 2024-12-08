const questions = [
    {
        question: "What is an algorithm?",
        options: [
            "A step-by-step procedure to solve a problem",
            "A programming language",
            "A type of computer",
            "A mathematical equation"
        ],
        correct: 0,
        explanation: "An algorithm is a step-by-step procedure or set of rules designed to solve a specific problem or perform a particular task."
    },
    {
        question: "What is the difference between compiled and interpreted languages?",
        options: [
            "Compiled languages are newer than interpreted languages",
            "Compiled languages are converted directly to machine code, interpreted languages are executed line by line",
            "Interpreted languages are faster than compiled languages",
            "There is no difference"
        ],
        correct: 1,
        explanation: "Compiled languages are translated directly into machine code before running, while interpreted languages are executed line by line by an interpreter during runtime."
    },
    {
        question: "What is debugging?",
        options: [
            "Creating new software",
            "Finding and fixing errors in code",
            "Writing documentation",
            "Installing software"
        ],
        correct: 1,
        explanation: "Debugging is the process of finding, analyzing, and fixing errors (bugs) in computer programs to make them work correctly."
    },
    {
        question: "What is the purpose of a loop in programming?",
        options: [
            "To store data",
            "To repeat a set of instructions",
            "To connect to the internet",
            "To create a user interface"
        ],
        correct: 1,
        explanation: "Loops are used to repeat a block of code multiple times, making it easier to perform repetitive tasks without writing the same code over and over."
    },
    {
        question: "What is Object-Oriented Programming (OOP)?",
        options: [
            "A programming language",
            "A way to organize code using objects and classes",
            "A type of computer memory",
            "A web browser"
        ],
        correct: 1,
        explanation: "Object-Oriented Programming is a programming paradigm that organizes code into objects, which contain data and code. It provides a clear structure for programs and promotes code reuse."
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
        finalMessage.innerHTML = '<p>Excellent! You have a great understanding of Programming Concepts!</p>';
    } else if (percentage >= 60) {
        finalMessage.innerHTML = '<p>Good job! Keep practicing to improve further.</p>';
    } else {
        finalMessage.innerHTML = '<p>Keep learning! Review the basic programming concepts and try again.</p>';
    }
}

// Event Listeners
document.getElementById('check-btn').addEventListener('click', checkAnswer);
document.getElementById('next-btn').addEventListener('click', nextQuestion);
