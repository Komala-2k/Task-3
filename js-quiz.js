const questions = [
    {
        question: "What is JavaScript?",
        options: [
            "A programming language",
            "A markup language",
            "A styling language",
            "A database language"
        ],
        correct: 0,
        explanation: "JavaScript is a programming language that enables interactive web pages. It's an essential part of web applications and can be used on both client and server side."
    },
    {
        question: "Which of these is not a JavaScript data type?",
        options: [
            "Number",
            "String",
            "Boolean",
            "Float"
        ],
        correct: 3,
        explanation: "Float is not a separate data type in JavaScript. Numbers in JavaScript can be both integers and floating-point numbers, all under the 'Number' type."
    },
    {
        question: "What will '2' + 2 equal in JavaScript?",
        options: [
            "4",
            "22",
            "NaN",
            "Error"
        ],
        correct: 1,
        explanation: "In JavaScript, when you use the + operator with a string, it performs concatenation. So '2' + 2 will concatenate the string '2' with the number 2, resulting in '22'."
    },
    {
        question: "Which method is used to add an element at the end of an array?",
        options: [
            "push()",
            "append()",
            "add()",
            "insert()"
        ],
        correct: 0,
        explanation: "The push() method adds one or more elements to the end of an array and returns the new length of the array."
    },
    {
        question: "What is the correct way to check if 'x' is equal to 2?",
        options: [
            "if(x=2)",
            "if(x==2)",
            "if(x===2)",
            "if(x!=2)"
        ],
        correct: 2,
        explanation: "=== is the strict equality operator in JavaScript. It checks both value and type equality, making it the safest way to compare values."
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
        finalMessage.innerHTML = '<p>Excellent! You have a great understanding of JavaScript!</p>';
    } else if (percentage >= 60) {
        finalMessage.innerHTML = '<p>Good job! Keep practicing to improve further.</p>';
    } else {
        finalMessage.innerHTML = '<p>Keep learning! Review the JavaScript basics and try again.</p>';
    }
}

// Event Listeners
document.getElementById('check-btn').addEventListener('click', checkAnswer);
document.getElementById('next-btn').addEventListener('click', nextQuestion);
