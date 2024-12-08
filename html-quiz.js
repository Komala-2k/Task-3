const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyperlinks and Text Markup Language",
            "Home Tool Markup Language"
        ],
        correct: 0,
        explanation: "HTML stands for Hyper Text Markup Language. It is the standard markup language for creating web pages."
    },
    {
        question: "Which HTML tag is used to define an unordered list?",
        options: [
            "<ol>",
            "<list>",
            "<ul>",
            "<dl>"
        ],
        correct: 2,
        explanation: "The <ul> tag is used to define an unordered list. Unordered lists typically display with bullet points."
    },
    {
        question: "What is the correct HTML element for inserting a line break?",
        options: [
            "<break>",
            "<lb>",
            "<newline>",
            "<br>"
        ],
        correct: 3,
        explanation: "The <br> tag is used to insert a single line break. It is an empty element and doesn't need a closing tag."
    },
    {
        question: "Which HTML attribute is used to define inline styles?",
        options: [
            "class",
            "styles",
            "style",
            "font"
        ],
        correct: 2,
        explanation: "The style attribute is used to specify inline CSS styles for an element."
    },
    {
        question: "What is the correct HTML for creating a hyperlink?",
        options: [
            "<a href='url'>link text</a>",
            "<link>url</link>",
            "<hyperlink>url</hyperlink>",
            "<url>link text</url>"
        ],
        correct: 0,
        explanation: "The <a> tag with href attribute is used to create hyperlinks. The href attribute specifies the URL of the page the link goes to."
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
        finalMessage.innerHTML = '<p>Excellent! You have a great understanding of HTML!</p>';
    } else if (percentage >= 60) {
        finalMessage.innerHTML = '<p>Good job! Keep practicing to improve further.</p>';
    } else {
        finalMessage.innerHTML = '<p>Keep learning! Review the basics and try again.</p>';
    }
}

// Event Listeners
document.getElementById('check-btn').addEventListener('click', checkAnswer);
document.getElementById('next-btn').addEventListener('click', nextQuestion);
