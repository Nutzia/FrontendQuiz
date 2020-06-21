// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// Ophalen data met fetch (AJAX)
function fetchQuestions() {
    return fetch("/quiz/questions_json")
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            window.alert("Something went wrong while fetching questions: " + err.message);
        });
};

// Ophalen van score op basis van antwoorden (AJAX)
function fetchScore(answers) {
    return fetch("/quiz/answers_json?answers=" + answers.join())
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            window.alert("Something went wrong while submitting your answers: " + err.message);
        });;
}

// Willekeurig sorteren van een array (mutatie)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Renderen van 1 vraag met bijhorende antwoorden
function renderQuestionWithChoices(question) {
    const mainNode = document.getElementById("question-container");

    mainNode.innerHTML = null;

    const questionNode = document.createElement("h3");
    const questionTextNode = document.createTextNode(question.description);

    questionNode.classList.add("question-title");
    questionNode.appendChild(questionTextNode);

    mainNode.appendChild(questionNode);

    // Elke vraag renderen
    question.choices.forEach(choice => {
        const choiceNode = document.createElement("button");
        const choiceTextNode = document.createTextNode(choice.description);

        choiceNode.classList.add("choice-button");
        choiceNode.appendChild(choiceTextNode);

        mainNode.appendChild(choiceNode);

        // Voor elke keuze een click listener maken om deze op selected te zetten
        choiceNode.addEventListener("click", function (ev) {
            const alreadySelectedButtons = document.getElementsByClassName("choice-button selected");

            for (i = 0; i < alreadySelectedButtons.length; i++) {
                alreadySelectedButtons[i].classList.remove("selected")
            }

            this.classList.add("selected");

            // Selecteren van de keuze in js
            selectChoiceForQuestion(choice);
        });
    });
}

// Weergeven van het resultaat op basis van de score
function renderResult(score) {
    const mainNode = document.getElementById("result-container");

    const resultNode = document.createElement("h3");
    const resultTextNode = document.createTextNode(`Your score is: ${Math.round(score)}. ${getScoreText(score)}`);

    resultNode.classList.add("result-title");
    resultNode.appendChild(resultTextNode);

    mainNode.appendChild(resultNode);

    mainNode.classList.remove("hide");
}

// Score systeem
function getScoreText(score) {
    let scoreText = "";

    if (score === 100) {
        scoreText = "Great job! You had everything correct!"
    } else if (score === 0) {
        scoreText === "You had nothing correct, better get studying.";
    } else if (score > 80) {
        scoreText = "Close, almost everything correct!"
    } else if (score > 60) {
        scoreText = "Looks like you only just passed (you need 60% to pass) this quiz! Study more next time."
    } else if (score > 0) {
        scoreText = "You failed! Better luck next time. Get 60% of your answers right to pass this quiz."
    }

    return scoreText;
}

function selectChoiceForQuestion(choice) {
    // Kijken of dezelfde vraag al eens beantwoord is (user heeft zich bedacht en wil een ander antwoord kiezen dus)
    const previousAnswer = answers.find(answer => answer.questionId === choice.questionId);

    // Verander het vorige antwoord met het nieuwe antwoord in de answers array
    if (previousAnswer) {
        answers.forEach((answer, index) => {
            if (answer.questionId === choice.questionId) {
                answers[index] = choice;
            }
        })
    } else {
        // Nog niets geselecteerd voordien; gewoon toevoegen aan de answers array
        answers.push(choice);
    }
}

function startQuiz() {
    // Verwijder start button
    startButton.classList.add('hide');

    fetchQuestions()
        .then(allQuestions => {
            // Shufflen van ALLE vragen
            shuffleArray(allQuestions);

            // Eerste 20 vragen van de geshuffelde array nemen
            const questions = allQuestions.slice(0, 20);

            renderQuestionWithChoices(questions[currentQuestionIndex]);
            
            nextButton.classList.remove('hide');
            nextButton.addEventListener("click", function () {
                const alreadySelectedButtons = document.getElementsByClassName("choice-button selected");

                // Verplicht om een antwoord te kiezen
                if (alreadySelectedButtons.length === 0) {
                    window.alert("Please choose your answer first.");

                    return;
                }

                currentQuestionIndex = currentQuestionIndex + 1;

                // Als alle vragen op zijn
                if (!questions[currentQuestionIndex]) {
                    complete();

                    return;
                }

                renderQuestionWithChoices(questions[currentQuestionIndex]);
            });
        });
};

function complete() {
    const mainNode = document.getElementById("question-container");

    mainNode.innerHTML = null;

    nextButton.classList.add('hide');

    const answersByChoiceId = [];

    answers.forEach(answer => answersByChoiceId.push(answer.choiceId));

    fetchScore(answersByChoiceId).then(score => {
        renderResult(score);
    });
}

const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex;
let answers = [];

// Luisteren naar click event op start button
startButton.addEventListener("click", function () {
    currentQuestionIndex = 0;

    startQuiz();
});
