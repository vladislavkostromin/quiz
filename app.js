const DATA = [
    {
        question:'Вопрос-1',
        answers: [
            {
                id:'1',
                value:'Ответ-1',
                correct:'true',
            },
            {
                id:'2',
                value:'Ответ-2',
                correct:'false',
            },
            {
                id:'3',
                value:'Ответ-3',
                correct:'false',
            },
        ]
    },
    {
        question:'Вопрос-2',
        answers: [
            {
                id:'4',
                value:'Ответ-4',
                correct:'false',
            },
            {
                id:'5',
                value:'Ответ-5',
                correct:'true',
            },
        ]
    },
];

const questions = document.getElementById('questions');
const quiz = document.getElementById('quiz');
const results = document.getElementById('results');
const indicator = document.getElementById('indicator');
const btnRestart = document.getElementById('btn-restart');
const btnNext = document.getElementById('btn-next');