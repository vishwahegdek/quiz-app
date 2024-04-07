# Node.js Quiz Application

This is a simple quiz application built using Node.js, Express.js, and vanilla JavaScript. It allows users to take a quiz on Node.js-related topics and provides instant feedback on their answers.

## Features

- Multiple-choice questions on Node.js
- Instant feedback on correct and incorrect answers
- Automatic submission of answers after each question
- Score calculation at the end of the quiz
- Session-based user tracking

## Prerequisites

Make sure you have the following installed on your local machine:

- Node.js
- npm (Node Package Manager)

## Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/nodejs-quiz-app.git
```

2. Navigate to the project directory:

```bash
cd nodejs-quiz-app
```

3. Install dependencies:

```bash

npm install
```
## Usage

1. Start the server:

```bash
npm start
```

1. Open your web browser and go to http://localhost:3000 to access the application.

2. Enter your name and click "Start Quiz" to begin the quiz.

3. Answer each question by selecting the appropriate option.

4. After answering all questions, your score will be displayed along with feedback on each question.

## Customize Quiz Questions

You can customize the quiz questions by modifying the quiz array in the routes/quiz.js file. Each question object in the array should have the following structure:

```json
{
    "question": "Your question here",
    "choices": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "answer": "Correct option here"
}
```

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.