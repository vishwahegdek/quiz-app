const express = require('express');
const session = require('express-session');
const router = express.Router();

// Quiz data
const quiz = [
    {
      "question": "What does npm stand for?",
      "choices": ["Node Plugin Manager", "Node Package Manager", "Node Project Manager", "Node Package Module"],
      "answer": "Node Package Manager"
    },
    {
      "question": "Which of the following is a core module in Node.js?",
      "choices": ["angular", "http", "express", "react"],
      "answer": "http"
    },
    {
      "question": "What is the main purpose of the Node.js 'fs' module?",
      "choices": ["To handle HTTP requests", "To interact with the file system", "To handle database operations", "To create web servers"],
      "answer": "To interact with the file system"
    },
    {
      "question": "In Node.js, what is an event loop?",
      "choices": ["A loop that executes asynchronous tasks", "A loop that listens for HTTP requests", "A loop that handles database queries", "A loop that executes synchronous tasks"],
      "answer": "A loop that executes asynchronous tasks"
    },
    {
      "question": "Which method is used to include external modules in Node.js?",
      "choices": ["import", "use()", "require()", "include()"],
      "answer": "require()"
    },
    {
      "question": "What is the purpose of the 'exports' object in Node.js modules?",
      "choices": ["To import modules from other files", "To export functions and objects from a module", "To define global variables", "To create new instances of classes"],
      "answer": "To export functions and objects from a module"
    },
    {
      "question": "Which Node.js package manager is used to install and manage dependencies locally?",
      "choices": ["bower", "yarn", "pip", "npm"],
      "answer": "npm"
    },
    {
      "question": "What does the 'process' object provide in Node.js?",
      "choices": ["Access to the file system", "Methods to manage child processes", "Methods to handle HTTP requests", "Information about the current process"],
      "answer": "Information about the current process"
    },
    {
      "question": "What is the purpose of the 'util' module in Node.js?",
      "choices": ["To handle file I/O operations", "To create utility functions", "To create web servers", "To manage child processes"],
      "answer": "To create utility functions"
    },
    {
      "question": "Which HTTP method is used to retrieve data from a server in Node.js?",
      "choices": ["PUT", "DELETE", "GET", "POST"],
      "answer": "GET"
    }
];

// Middleware setup
router.use(express.json());
router.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 10 * 60 * 1000 // 10 minutes in milliseconds
    }
}));


router.post('/start-quiz', (req, res) => {
    // Initialize session data for quiz
    req.session.userName = req.body.userName;
    req.session.answers = []; // Initialize empty array to store answers
    req.session.startTime = Date.now(); // Store the start time of the quiz
    res.json({ success: true });
});


router.post('/submit-answer', (req, res) => {
    const { questionId, answer } = req.body;

    // Initialize answers array in session if it's not already present
    if (!req.session.answers) {
        req.session.answers = [];
    }

    req.session.answers.push({ questionId, answer });

    res.json({ success: true });
});


// Endpoint to serve the quiz questions
router.get('/quiz/:id', (req, res) => {
    const questionIndex = req.params.id - 1;
    if (questionIndex < 0 || questionIndex >= quiz.length) {
        // If the question ID is out of bounds, return an error response
        return res.status(404).json({ error: 'Question not found' });
    }

    // If the question ID is valid, retrieve the question data and send it as response
    const { question, choices } = quiz[questionIndex];
    const questionData = { question, choices };
    res.json(questionData);
});

// Endpoint to send quiz results
router.get('/quiz-results', (req, res) => {
    // Retrieve submitted answers and calculate score
    const submittedAnswers = req.session.answers || [];
    let score = 0;
    submittedAnswers.forEach(submittedAnswer => {
        const questionIndex = submittedAnswer.questionId - 1;
        if (questionIndex >= 0 && questionIndex < quiz.length) {
            const correctAnswer = quiz[questionIndex].answer;
            if (correctAnswer === submittedAnswer.answer) {
                score++;
            }
        }
    });

    // Destroy session after retrieving results
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
        } else {
            console.log('Session destroyed successfully.');
        }
    });

    
    res.json({
        quiz: quiz,
        submittedAnswers: submittedAnswers,
        score: score
    });
});

module.exports = router;
