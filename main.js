let currentQuestion = 0;

function quizRender() {
    if (currentQuestion == questions.length) {
        wonQuiz();
    } else {
        showQuestions();
        maxQuestions();
        showDifficulty();
    }
}

function resetQuiz() {
    let content = document.getElementById('quizContent');
    currentQuestion = 0;
    content.innerHTML = templateQuiz();
    quizRender();
}

function checkCorrectAnwser(value) {
    if (value == questions[currentQuestion]["right_anwser"]) {
        let button = document.getElementById(`anwser${value}`)
        button.classList.add("easy")
        toggleButton("off")
        timeoutCorrect(value);

    } else {
        let button = document.getElementById(`anwser${value}`)
        button.classList.add("hard")
        toggleButton("off")
        timeoutFalse();
    }
}

function timeoutCorrect(value) {
    let button = document.getElementById(`anwser${value}`)
    setTimeout(function() {
        currentQuestion++;
        button.classList.remove("easy")
        toggleButton("on")
        quizRender();
    }, 2000);
}

function timeoutFalse() {
    setTimeout(function() {
        toggleButton("on")
        endQuiz()
    }, 2000)
}

function showDifficulty() {
    let difficulty = document.getElementById('difficultyColor');
    if (currentQuestion > 0) { difficulty.classList.remove(`${questions[currentQuestion-1]["difficulty"]}`) }
    difficulty.classList.add(`${questions[currentQuestion]["difficulty"]}`)
}

function endQuiz() {
    let content = document.getElementById('quizContent');
    content.innerHTML = templateEndScreen();

}

function wonQuiz() {
    let content = document.getElementById('quizContent');
    content.innerHTML = tempalteWinScreen();
}

// render Text and show current question

function showQuestions() {
    for (let i = 1; i < 5; i++) {
        let question = document.getElementById(`anwser${i}`);
        question.innerHTML = questions[currentQuestion][`anwser_${i}`]
    }
}

function toggleButton(onoff) {
    if (onoff == "off") {
        for (let i = 1; i < 5; i++) {
            let anwser = document.getElementById(`anwser${i}`);
            anwser.setAttribute("disabled", "disabled")
        }
    } else {
        for (let i = 1; i < 5; i++) {
            let anwser = document.getElementById(`anwser${i}`);
            anwser.removeAttribute("disabled", "disabled")
        }
    }
}

function maxQuestions() {
    let question = document.getElementById('maxQuestions');
    let questionsTextCount = document.getElementById('questionsCount');
    let currentQuestionAmt = document.getElementById('currentQuestion');
    question.innerHTML = questions.length;
    questionsTextCount.innerHTML = `${currentQuestion + 1}`;
    currentQuestionAmt.innerHTML = `${currentQuestion + 1}`
}

function templateEndScreen() {
    return `
    <div class="endScreen">
    <span>Leider <b class="loose">falsch!</b></span>
    <span>Du hast ${currentQuestion} von ${questions.length} Fragen richtig beantwortet!</span>
    <span><b class="win">@DeveloperAkademie Leute schreibt mir gerne euer Feedback auf Slack "Joshua Herrmann"</b></span>
    <button type="button" class="btn btn-outline-danger endScreenButton" onclick="resetQuiz()">Erneut probieren</button>
</div>
    `
}

function tempalteWinScreen() {
    return `
    <div class="endScreen">
    <span><b class="win">Gewonnen! Alle Fragen richtig beantwortet! </b></span>
    <span><b class="win">@DeveloperAkademie Leute schreibt mir gerne euer Feedback auf Slack "Joshua Herrmann"</b></span>
    <button type="button" class="btn btn-outline-success endScreenButton" onclick="resetQuiz()">Erneut probieren</button>
</div>
    `
}

function templateQuiz() {
    return `
    <div class="card-body " id="quizContent">
                <div class="cardHeader">
                    <div>
                        <h5 class="card-title ">Frage <b id="questionsCount"></b>:
                        </h5>
                        <p id="questionText"></p>
                    </div>
                    <div class="difficultyColor easy" id="difficultyColor"></div>
                </div>
                <div class="anwserContainer" id="anwserContainer">
                    <div class="card questionCard ">
                        <button type="button" class="btn btn-outline-secondary" id="anwser1" onclick="checkCorrectAnwser(1)"></button>
                    </div>
                    <div class="card questionCard">
                        <button type="button" class="btn btn-outline-secondary" id="anwser2" onclick="checkCorrectAnwser(2)"></button>

                    </div>
                    <div class="card questionCard">
                        <button type="button" class="btn btn-outline-secondary" id="anwser3" onclick="checkCorrectAnwser(3)"></button>

                    </div>
                    <div class="card questionCard">
                        <button type="button" class="btn btn-outline-secondary" id="anwser4" onclick="checkCorrectAnwser(4)"></button>

                    </div>
                </div>
                <div class="questionFooter">
                    <span>
                        <b id="currentQuestion">1</b> von <b id="maxQuestions"></b> Fragen!
                    </span>
                    <span id="result">
                        
                    </span>
                </div>
            </div>
    `
}