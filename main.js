// Navigation
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = link.getAttribute('data-section');
        
        // Update active states
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === `${targetSection}-section`) {
                section.classList.add('active');
            }
        });
    });
});

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
    "Why do programmers hate nature? It has too many bugs!",
    "What did the Java Code say to the C code? You've got no class!",
    "What did the HTML say to the CSS? You make me look good!",
    "Why did the database administrator leave his wife? She had too many relationships!",
    "Why do programmers always mix up Christmas and Halloween? Because Dec 25 is Oct 31!"
];

// Fun GIFs for jokes
const jokeGifs = [
    "https://media.giphy.com/media/JrXas5ecb4FkwbFpIE/giphy.gif", // Programming joke
    "https://media.giphy.com/media/3oriO7A7bt1wsEP4cw/giphy.gif", // Funny code
    "https://media.giphy.com/media/l0HlHFRbmaZtBRhXG/giphy.gif",  // Computer humor
    "https://media.giphy.com/media/13FrpeVH09Zrb2/giphy.gif",     // Programming fun
    "https://media.giphy.com/media/KEYEpIngcmXlHetDqz/giphy.gif"  // Coding fun
];

// DOM Elements
const jokeText = document.getElementById('joke-text');
const jokeGifContainer = document.getElementById('joke-gif');
const newJokeBtn = document.getElementById('new-joke-btn');

// Event Listeners
newJokeBtn.addEventListener('click', fetchJoke);

// Enhanced joke fetching with GIFs
async function fetchJoke() {
    try {
        jokeText.textContent = 'Loading...';
        const response = await fetch('https://v2.jokeapi.dev/joke/Programming?safe-mode&type=single');
        const data = await response.json();
        
        if (data.error) {
            throw new Error('API Error');
        }
        
        // Display the joke
        jokeText.textContent = data.joke;
        
        // Display random joke GIF
        const randomGif = jokeGifs[Math.floor(Math.random() * jokeGifs.length)];
        jokeGifContainer.innerHTML = `<img src="${randomGif}" alt="Joke GIF">`;
        
        // Add bounce animation
        const jokeContainer = document.getElementById('joke-container');
        jokeContainer.style.animation = 'bounce 0.5s ease';
        setTimeout(() => {
            jokeContainer.style.animation = '';
        }, 500);
    } catch (error) {
        // Fallback to custom jokes if API fails
        const randomJoke = customJokes[Math.floor(Math.random() * customJokes.length)];
        jokeText.textContent = randomJoke;
        
        // Display random joke GIF
        const randomGif = jokeGifs[Math.floor(Math.random() * jokeGifs.length)];
        jokeGifContainer.innerHTML = `<img src="${randomGif}" alt="Joke GIF">`;
    }
}

// Fetch initial joke on page load
fetchJoke();
