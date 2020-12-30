const DATA = [{
        question: 'Вопрос 1',
        answers: [{
                id: '1',
                value: 'Ответ 1',
                correct: true,
            },
            {
                id: '2',
                value: 'Ответ 2',
                correct: false,
            },
            {
                id: '3',
                value: 'Ответ 3',
                correct: false,
            },
        ]
    },
    {
        question: 'Вопрос 2',
        answers: [{
                id: '4',
                value: 'Ответ 4',
                correct: false,
            },
            {
                id: '5',
                value: 'Ответ 5',
                correct: true,
            },
        ]
    },
    {
        question: 'Вопрос 3',
        answers: [{
                id: '6',
                value: 'Ответ 6',
                correct: false,
            },
            {
                id: '7',
                value: 'Ответ 7',
                correct: true,
            },
        ]
    },
];


let localResults = {};

const questions = document.getElementById('questions');
const quiz = document.getElementById('quiz');
const results = document.getElementById('results');
const indicator = document.getElementById('indicator');
const btnRestart = document.getElementById('btn-restart');
const btnNext = document.getElementById('btn-next');

const renderQuestions = (index) => {

    renderIndicator(index + 1);
    questions.dataset.currentStep = index;

    const renderAnswers = () => DATA[index].answers
        .map((answer) => `
                <li>
                    <label>
                        <input class="answer-input" type="radio" name="${index}" value="${answer.id}">
                        ${answer.value}
                    </label>
                </li>
            `)
        .join('');

    questions.innerHTML = `
        <div class="quiz-questions-item">
            <div class="quiz-questions-item-question">${DATA[index].question}</div>
            <ul class="quiz-questions-item-answers">${renderAnswers()}</ul>
        </div>
    `;
};

const renderResults = () => {
    let content = '';

    const getClassname = (answer, questionIndex) => {
        let classname = '';

        if (!answer.correct && answer.id === localResults[questionIndex]) {
            classname = 'answer--invalid';
        } else if (answer.correct) {
            classname = 'answer--valid';
        }

        return classname;
    };

    const getAnswers = (questionIndex) => DATA[questionIndex].answers
        .map((answer) => `<li class=${getClassname(answer, questionIndex)}>${answer.value}</li>`)
        .join('');

    DATA.forEach((question, index) => {
        content += `
        <div class="quiz-results-item">
            <div class="quiz-results-item-question">${question.question}</div>
            <ul class="quiz-results-item-answers">${getAnswers(index)}</ul>
        </div>
        `;
    });
    results.innerHTML = content;
};

const renderIndicator = (currentStep) => {
    indicator.innerHTML = `${currentStep}/${DATA.length}`;
};

quiz.addEventListener('change', (event) => {
    if (event.target.classList.contains('answer-input')) {
        localResults[event.target.name] = event.target.value;
        btnNext.disabled = false;
    };
});

quiz.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-next')) {
        const nextQuestionIndex = Number(questions.dataset.currentStep) + 1;


        if (DATA.length === nextQuestionIndex) {
            questions.classList.add('questions--hidden');
            results.classList.add('results--visible');
            indicator.classList.add('indicator--hidden');
            btnRestart.classList.add('btnRestart--visible');
            btnNext.classList.add('btnNext--hidden');

            renderResults();
        } else {
            renderQuestions(nextQuestionIndex);
        }

        btnNext.disabled = true;
    };
    if (event.target.classList.contains('btn-restart')) {
        localResults = {};
        results.innerHTML = '';

        questions.classList.remove('questions--hidden');
        results.classList.remove('results--visible');
        indicator.classList.remove('indicator--hidden');
        btnRestart.classList.remove('btnRestart--visible');
        btnNext.classList.remove('btnNext--hidden');

        renderQuestions(0);
    };
});

renderQuestions(0);