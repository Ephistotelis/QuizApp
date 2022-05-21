let currentQuestion = 0;

function quizRender() {
    if (currentQuestion == questions.length) {
        alert("GEWONNEN!!!")
        wonQuiz();
    } else {
        showQuestions();
        maxQuestions();
        showDifficulty();
    }
}

function resetQuiz() {
    let content = document.getElementById('quizContent');
    let difficulty = document.getElementById('difficultyColor');
    currentQuestion = 0;
    content.innerHTML = templateQuiz();
    quizRender();
}

function checkCorrectAnwser(value) {
    if (value == questions[currentQuestion]["right_anwser"]) {
        alert("correct");
        setTimeout(function() {
            currentQuestion++;
            quizRender();
        }, 2000);

    } else {
        alert("false");
        setTimeout(function() {
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
    <div class="endScreenButton" onclick="resetQuiz()">Erneut probieren</div>
</div>
    `
}

function tempalteWinScreen() {
    return `
    <div class="endScreen">
    <span><b class="win">Gewonnen! Alle Fragen richtig beantwortet!</b></span>
    <div class="endScreenButton" onclick="resetQuiz()">Erneut probieren</div>
</div>
    `
}

function templateQuiz() {
    return `
    <div class="card-body " id="quizContent">
    <div class="cardHeader">
                    <h5 class="card-title ">Frage <b id="questionsCount"></b>:
                        <p id="questionText"></p>
                    </h5>
                    <div class="difficultyColor easy" id="difficultyColor"></div>
                </div>
                <div class="anwserContainer" id="anwserContainer">
                    <div class="card questionCard">
                        <div class="card-body " id="anwser1" onclick="checkCorrectAnwser(1)">
                        </div>
                    </div>
                    <div class="card questionCard">
                        <div class="card-body " id="anwser2" onclick="checkCorrectAnwser(2)">
                        </div>
                    </div>
                    <div class="card questionCard">
                        <div class="card-body " id="anwser3" onclick="checkCorrectAnwser(3)">
                        </div>
                    </div>
                    <div class="card questionCard">
                        <div class="card-body " id="anwser4" onclick="checkCorrectAnwser(4)">
                        </div>
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