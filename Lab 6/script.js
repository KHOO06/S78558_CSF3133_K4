// Questions Array: stores questions, possible options, and the correct answer
const questions = [
    {
        question: "Which HTML tag is used to include an external JavaScript file?",
        options: ["<javascript>", "<script>", "<js>", "<link>"],
        answer: "<script>"
    },
    {
        question: "Which method is used to access an HTML element by its id?",
        options: [
            "document.getElementById()",
            "document.querySelectorAll()",
            "document.getElementsByClass()",
            "document.findId()"
        ],
        answer: "document.getElementById()"
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Computer Style Sheets",
            "Creative Style System",
            "Cascading Style Sheets",
            "Colorful Style Syntax"
        ],
        answer: "Cascading Style Sheets"
    },
    {
        question: "Which JavaScript method prevents the default browser action of an event?",
        options: [
            "event.stopAction()",
            "event.cancelDefault()",
            "event.preventDefault()",
            "event.disable()"
        ],
        answer: "event.preventDefault()"
    },
    {
        question: "Which operator is used to assign a value to a variable in JavaScript?",
        options: ["==", "===", "=", "=>"],
        answer: "="
    }
];

// Global state variables
let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timerInterval = null;
let answerSubmitted = false;

// Randomly shuffles the questions array using Fisher-Yates algorithm
function shuffleQuestions() {
    shuffledQuestions = [...questions];
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
    }
}

// Sets and starts a 15-second countdown timer for each question
function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 15;
    document.getElementById("timer").innerText = timeLeft;

    timerInterval = setInterval(function () {
        timeLeft--;
        document.getElementById("timer").innerText = timeLeft;

        // Handle timeout automatically
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            if (!answerSubmitted) {
                answerSubmitted = true;
                const correctAns = shuffledQuestions[currentQuestionIndex].answer;
                const feedbackEl = document.getElementById("feedback");
                feedbackEl.innerText = "Time's up! The correct answer is: " + correctAns;
                feedbackEl.style.color = "red";

                disableOptions();
                document.getElementById("submitBtn").classList.add("hidden");
                document.getElementById("nextBtn").classList.remove("hidden");
            }
        }
    }, 1000);
}

// Displays the current question and its radio button answer options
function displayQuestion() {
    answerSubmitted = false;
    const currentQ = shuffledQuestions[currentQuestionIndex];

    // Update progress counter and question text
    document.getElementById("questionCounter").innerText =
        "Question " + (currentQuestionIndex + 1) + " of " + shuffledQuestions.length;
    document.getElementById("questionText").innerText = currentQ.question;

    // Reset feedback and navigation buttons
    const feedbackEl = document.getElementById("feedback");
    feedbackEl.innerText = "";
    document.getElementById("submitBtn").classList.remove("hidden");
    document.getElementById("nextBtn").classList.add("hidden");

    // Render answer options safely
    const optionsContainer = document.getElementById("optionsContainer");
    optionsContainer.innerHTML = "";

    currentQ.options.forEach(function (optionText) {
        const label = document.createElement("label");
        label.className = "option-label";

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "quizOption";
        radio.value = optionText;

        const textNode = document.createTextNode(optionText);

        label.appendChild(radio);
        label.appendChild(textNode);
        optionsContainer.appendChild(label);
    });
}

// Helper function to lock radio buttons after answering
function disableOptions() {
    const radios = document.querySelectorAll('input[name="quizOption"]');
    radios.forEach(function (radio) {
        radio.disabled = true;
    });
}

// Checks whether the selected answer is correct and updates the score
function checkAnswer() {
    if (answerSubmitted) return;

    const selectedOption = document.querySelector('input[name="quizOption"]:checked');
    if (!selectedOption) {
        alert("Please select an answer before submitting!");
        return;
    }

    answerSubmitted = true;
    clearInterval(timerInterval);
    disableOptions();

    const userAnswer = selectedOption.value;
    const correctAnswer = shuffledQuestions[currentQuestionIndex].answer;
    const feedbackEl = document.getElementById("feedback");

    if (userAnswer === correctAnswer) {
        score++;
        feedbackEl.innerText = "Correct! Well done.";
        feedbackEl.style.color = "green";
    } else {
        feedbackEl.innerText = "Incorrect! The correct answer is: " + correctAnswer;
        feedbackEl.style.color = "red";
    }

    // Switch Submit button to Next Question (or Finish) button
    document.getElementById("submitBtn").classList.add("hidden");
    const nextBtn = document.getElementById("nextBtn");
    nextBtn.innerText =
        currentQuestionIndex === shuffledQuestions.length - 1 ? "Finish Quiz" : "Next Question";
    nextBtn.classList.remove("hidden");
}

// Moves to the next question, resets the timer, or displays final score at the end
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < shuffledQuestions.length) {
        displayQuestion();
        startTimer();
    } else {
        // Quiz finished: hide quiz section and show score in footer
        clearInterval(timerInterval);
        document.getElementById("quizSection").classList.add("hidden");

        const footer = document.getElementById("scoreFooter");
        const percentage = Math.round((score / shuffledQuestions.length) * 100);
        document.getElementById("finalScoreText").innerText =
            "Your Final Score: " + score + " / " + shuffledQuestions.length + " (" + percentage + "%)";
        footer.classList.remove("hidden");
    }
}

// Starts or restarts the quiz by shuffling questions, showing the first question, and starting the timer
function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;

    shuffleQuestions();

    document.getElementById("startSection").classList.add("hidden");
    document.getElementById("scoreFooter").classList.add("hidden");
    document.getElementById("quizSection").classList.remove("hidden");

    displayQuestion();
    startTimer();
}