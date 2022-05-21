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
        setTimeout(function() {
            currentQuestion++;
            button.classList.remove("easy")
            toggleButton("on")
            quizRender();
        }, 2000);

    } else {
        let button = document.getElementById(`anwser${value}`)
        button.classList.add("hard")
        toggleButton("off")
        setTimeout(function() {
            toggleButton("on")
            endQuiz()
        }, 2000)
    }
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
    let questionText = document.getElementById('questionText');
    let anwser1 = document.getElementById('anwser1');
    let anwser2 = document.getElementById('anwser2');
    let anwser3 = document.getElementById('anwser3');
    let anwser4 = document.getElementById('anwser4');
    anwser1.innerHTML = questions[currentQuestion]["anwser_1"];
    anwser2.innerHTML = questions[currentQuestion]["anwser_2"];
    anwser3.innerHTML = questions[currentQuestion]["anwser_3"];
    anwser4.innerHTML = questions[currentQuestion]["anwser_4"];
    questionText.innerHTML = questions[currentQuestion]["question"];
}

function toggleButton(onoff) {
    let anwser1 = document.getElementById('anwser1');
    let anwser2 = document.getElementById('anwser2');
    let anwser3 = document.getElementById('anwser3');
    let anwser4 = document.getElementById('anwser4');
    if (onoff == "off") {
        anwser1.setAttribute("disabled", "disabled");
        anwser2.setAttribute("disabled", "disabled");
        anwser3.setAttribute("disabled", "disabled");
        anwser4.setAttribute("disabled", "disabled");
    } else {
        anwser1.removeAttribute("disabled", "disabled");
        anwser2.removeAttribute("disabled", "disabled");
        anwser3.removeAttribute("disabled", "disabled");
        anwser4.removeAttribute("disabled", "disabled");
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
    <div class="endScreenButton" onclick="resetQuiz()">Erneut probieren</div>
</div>
    `
}

function tempalteWinScreen() {
    return `
    <div class="endScreen">
    <span><b class="win">Gewonnen! Alle Fragen richtig beantwortet! </b></span>
    <span><b class="win">@DeveloperAkademie Leute schreibt mir gerne euer Feedback auf Slack "Joshua Herrmann"</b></span>
    <div class="endScreenButton" onclick="resetQuiz()">Erneut probieren</div>
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
                    <div class="card questionCard">
                        <button class="card-body " id="anwser1" onclick="checkCorrectAnwser(1)"></button>
                    </div>
                    <div class="card questionCard">
                        <button class="card-body " id="anwser2" onclick="checkCorrectAnwser(2)"></button>

                    </div>
                    <div class="card questionCard">
                        <button class="card-body " id="anwser3" onclick="checkCorrectAnwser(3)"></button>

                    </div>
                    <div class="card questionCard">
                        <button class="card-body " id="anwser4" onclick="checkCorrectAnwser(4)"></button>

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