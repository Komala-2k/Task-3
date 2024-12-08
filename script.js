// Quiz questions with fun programming jokes as feedback
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
        joke: "Why did the CSS file feel so confident? Because it had great style!",
        gif: "https://media.giphy.com/media/13FrpeVH09Zrb2/giphy.gif" // CSS styling gif
    },
    {
        question: "Which JavaScript method is used to add an element at the end of an array?",
        options: [
            "push()",
            "append()",
            "addToEnd()",
            "insert()"
        ],
        correct: 0,
        joke: "Why did the array feel lonely? Because it needed a push()!",
        gif: "https://media.giphy.com/media/KEYEpIngcmXlHetDqz/giphy.gif" // Coding gif
    },
    {
        question: "What is the correct HTML element for the largest heading?",
        options: [
            "<heading>",
            "<h6>",
            "<head>",
            "<h1>"
        ],
        correct: 3,
        joke: "Why don't HTML elements go to the gym? Because they're already heading tags!",
        gif: "https://media.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif" // HTML coding gif
    },
    {
        question: "Which property is used to change the background color in CSS?",
        options: [
            "color",
            "bgcolor",
            "background-color",
            "background"
        ],
        correct: 2,
        joke: "What did the CSS property say to the background? You're looking a bit colorless today!",
        gif: "https://media.giphy.com/media/fsEaZldNC8A1PJ3mwp/giphy.gif" // CSS animation
    },
    {
        question: "What is the correct way to write a JavaScript array?",
        options: [
            "var colors = (1:'red', 2:'green', 3:'blue')",
            "var colors = ['red', 'green', 'blue']",
            "var colors = 'red', 'green', 'blue'",
            "var colors = {red, green, blue}"
        ],
        correct: 1,
        joke: "Why did the JavaScript array go to therapy? It had too many nested issues!",
        gif: "https://media.giphy.com/media/ln7z2eWriiQAllfVcn/giphy.gif" // JavaScript logo animation
    }
];

// Custom jokes array for variety
const customJokes = [
    "Why do programmers prefer dark mode? Because light attracts bugs!",
    "Why did the programmer quit his job? Because he didn't get arrays!",
    "What's a programmer's favorite place? The Cookie Store!",
    "Why do programmers always mix up Halloween and Christmas? Because Oct 31 equals Dec 25!",
    "Why did the programmer go broke? Because he used up all his cache!",
    "What's a programmer's favorite hangout spot? Foo Bar!",
    "Why was the JavaScript developer sad? Because he didn't Node how to Express himself!",
    "Why did the developer go broke? Because he used up all his jQuery!",
    "What's a programmer's favorite snack? Cookies!",
    "Why do programmers always mix up Christmas and Halloween? Because Dec 25 is Oct 31!"
];

// Fun GIFs for different scenarios
const funGifs = {
    correct: [
        "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif", // Celebration
        "https://media.giphy.com/media/xT8qBepJQzUjXpeWU8/giphy.gif", // Happy dance
        "https://media.giphy.com/media/l2JhGYxcjMcKqiaHu/giphy.gif"  // Success
    ],
    wrong: [
        "https://media.giphy.com/media/xT9DPJVjlYHwWsZRxm/giphy.gif", // Funny fail
        "https://media.giphy.com/media/3oEjHGr1Fhz0kyv8Ig/giphy.gif", // Confused
        "https://media.giphy.com/media/l1J9EdzfOSgfyueLm/giphy.gif"  // Oops
    ],
    celebration: [
        "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif", // Big celebration
        "https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.gif", // Party time
        "https://media.giphy.com/media/l0MYxcx4D0YZc6ezm/giphy.gif"  // Victory
    ],
    jokes: [
        "https://media.giphy.com/media/JrXas5ecb4FkwbFpIE/giphy.gif", // Programming joke
        "https://media.giphy.com/media/3oriO7A7bt1wsEP4cw/giphy.gif", // Funny code
        "https://media.giphy.com/media/l0HlHFRbmaZtBRhXG/giphy.gif"  // Computer humor
    ]
};

// Quiz state
let currentQuestion = 0;
let score = 0;
let quizStarted = false;

// DOM Elements
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const newJokeBtn = document.getElementById('new-joke-btn');
const questionContainer = document.getElementById('question-container');
const optionsContainer = document.getElementById('options-container');
const questionElement = document.getElementById('question');
const resultSection = document.getElementById('result-section');
const scoreDisplay = document.getElementById('score-display');
const jokeText = document.getElementById('joke-text');
const feedbackGif = document.getElementById('feedback-gif');
const jokeGif = document.getElementById('joke-gif');
const celebrationGif = document.getElementById('celebration-gif');

// Event Listeners
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);
newJokeBtn.addEventListener('click', fetchJoke);

// Initialize the quiz
function startQuiz() {
    quizStarted = true;
    currentQuestion = 0;
    score = 0;
    startBtn.style.display = 'none';
    nextBtn.style.display = 'block';
    resultSection.style.display = 'none';
    showQuestion();
}

// Display current question
function showQuestion() {
    resetState();
    const question = questions[currentQuestion];
    questionElement.textContent = question.question;

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(button);
    });
}

// Handle option selection with enhanced feedback
function selectOption(index) {
    const buttons = optionsContainer.getElementsByTagName('button');
    Array.from(buttons).forEach(button => {
        button.disabled = true;
    });

    if (index === questions[currentQuestion].correct) {
        buttons[index].classList.add('correct');
        score++;
        // Show success joke and GIF
        jokeText.textContent = questions[currentQuestion].joke;
        jokeText.style.color = '#27ae60';
        
        // Display question-specific GIF
        feedbackGif.innerHTML = `<img src="${questions[currentQuestion].gif}" alt="Success GIF">`;
        
        // Display random success GIF
        const randomSuccessGif = funGifs.correct[Math.floor(Math.random() * funGifs.correct.length)];
        jokeGif.innerHTML = `<img src="${randomSuccessGif}" alt="Success Reaction">`;
    } else {
        buttons[index].classList.add('wrong');
        buttons[questions[currentQuestion].correct].classList.add('correct');
        
        // Show consolation joke and GIF
        jokeText.textContent = customJokes[Math.floor(Math.random() * customJokes.length)];
        jokeText.style.color = '#e74c3c';
        
        // Display random wrong answer GIF
        const randomWrongGif = funGifs.wrong[Math.floor(Math.random() * funGifs.wrong.length)];
        feedbackGif.innerHTML = `<img src="${randomWrongGif}" alt="Wrong Answer GIF">`;
    }

    // Add bounce animation to containers
    const containers = [document.getElementById('joke-container'), feedbackGif];
    containers.forEach(container => {
        container.style.animation = 'bounce 0.5s ease';
        setTimeout(() => {
            container.style.animation = '';
        }, 500);
    });

    nextBtn.disabled = false;
}

// Move to next question
function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

// Show final results with celebration
function showResults() {
    questionContainer.style.display = 'none';
    nextBtn.style.display = 'none';
    resultSection.style.display = 'block';
    
    const percentage = (score / questions.length) * 100;
    scoreDisplay.textContent = `Your score: ${score} out of ${questions.length} (${percentage}%)`;
    
    // Display celebration GIF based on score
    if (percentage === 100) {
        celebrationGif.innerHTML = `<img src="${funGifs.celebration[0]}" alt="Perfect Score Celebration">`;
    } else if (percentage >= 70) {
        celebrationGif.innerHTML = `<img src="${funGifs.celebration[1]}" alt="Good Score Celebration">`;
    } else {
        celebrationGif.innerHTML = `<img src="${funGifs.celebration[2]}" alt="Try Again Celebration">`;
    }
}

// Restart the quiz
function restartQuiz() {
    questionContainer.style.display = 'block';
    startQuiz();
}

// Reset question state
function resetState() {
    nextBtn.disabled = true;
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

// Enhanced joke fetching with GIFs
async function fetchJoke() {
    try {
        jokeText.textContent = 'Loading...';
        const response = await fetch('https://v2.jokeapi.dev/joke/Programming?safe-mode&type=single');
        const data = await response.json();
        
        if (data.error) {
            throw new Error('API Error');
        }
        
        jokeText.textContent = data.joke;
        
        // Display random joke GIF
        const randomJokeGif = funGifs.jokes[Math.floor(Math.random() * funGifs.jokes.length)];
        jokeGif.innerHTML = `<img src="${randomJokeGif}" alt="Joke GIF">`;
        
        // Add bounce animation
        const jokeContainer = document.getElementById('joke-container');
        jokeContainer.style.animation = 'bounce 0.5s ease';
        setTimeout(() => {
            jokeContainer.style.animation = '';
        }, 500);
    } catch (error) {
        // Fallback to custom jokes if API fails
        jokeText.textContent = customJokes[Math.floor(Math.random() * customJokes.length)];
        const randomJokeGif = funGifs.jokes[Math.floor(Math.random() * funGifs.jokes.length)];
        jokeGif.innerHTML = `<img src="${randomJokeGif}" alt="Joke GIF">`;
    }
}

// Fetch initial joke on page load
fetchJoke();
