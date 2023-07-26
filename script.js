//Build start screen elemts in HTML

const startButton = document.querySelector('#start')
var questions = [
    {
        prompt: 'What is the answer to the first question?',
        choices: ['this is the right answer', 'or this is the right answer', 'maybe this is it'],
        correct: 'or this is the right answer'
    },
    {
        prompt: 'What is the answer to the second question?',
        choices: ['this is the right answer', 'or this is the right answer', 'maybe this is it'],
        correct: 'maybe this is it'
    },
    {
        prompt: 'What is the answer to the third question?',
        choices: ['this is the right answer', 'or this is the right answer', 'maybe this is it'],
        correct: 'maybe this is it'
    },
    {
        prompt: 'What is the answer to the fourth question?',
        choices: ['this is the right answer', 'or this is the right answer', 'maybe this is it'],
        correct: 'maybe this is it'
    }
]

console.log(questions[0].choices[1])
//let the element know we are selecting it
const quizContainer = document.querySelector('#quiz-container')
let timeEl = document.getElementById('time-element')
let questionIndex = 0
let score = 0
let currentTime = 100

//Hide welcome screen elements, and display first question and choices

function startQuiz() {
    // console.log('start button clicked')
    document.querySelector('.welcome-screen').setAttribute('style', 'display: none;')
    startTimer()
    renderQuestions()
}
//create HTML elemets to hold question data

function renderQuestions() {
    quizContainer.textContent = ""
    if (questionIndex >= questions.length) {
        return
    }
    //create element
    const questionEl = document.createElement('h3')
    //extract text content from array
    questionEl.textContent = questions[questionIndex].prompt

    //place element on screen
    quizContainer.append(questionEl)

    //create choices for questions
    for (let i = 0; i < questions[questionIndex].choices.length; i++) {
        const choiceButton = document.createElement('button')
        choiceButton.textContent = questions[questionIndex].choices[i]
        quizContainer.append(choiceButton)
    }

}

function checkAnswer(e) {
    if (e.target.tagName === 'BUTTON') {

        if (e.target.textContent === questions[0].correct) {
            console.log('correct')
            score += 25
        } else {
            console.log('incorrect')
            currentTime -= 10
        }
        questionIndex++
        renderQuestions()
    }

}

function startTimer() {
    let timeInterval = setInterval(function (){
        if (currentTime === 0 || questionIndex >= questions.length) {
            clearInterval(timeInterval)
            endQuiz()
        }
        timeEl.textContent = currentTime
        currentTime--
    }, 1000)
}

function endQuiz() {
    console.log('quiz is over your score is ', score)
}

startButton.addEventListener('click', startQuiz)
document.querySelector('#quiz-container').addEventListener('click', checkAnswer)

