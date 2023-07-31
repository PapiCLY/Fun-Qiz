//Build start screen elemts in HTML

const startButton = document.querySelector('#start')
var questions = [
    {
        prompt: 'Which one of these is a string?',
        choices: ["(this is the right answer)", '"or this is the right answer"', '-maybe this is it-'],
        correct: '"or this is the right answer"'
    },
    {
        prompt: 'Which is NOT a JavsScript data type?',
        choices: ['Boolean', 'Undefined', 'Variable', 'Object'],
        correct: 'Variable'
    },
    {
        prompt: 'What is === operator?',
        choices: ['== is called a strict equality operator', '== is called an equality operator', '=== is called a strict equality operator', '= is called an equality operator'],
        correct: '=== is called a strict equality operator'
    },
    {
        prompt: 'How can you convert a string into a number?',
        choices: ['parseInd()', 'ParseInt()', 'parceInt()', 'parseInt()'],
        correct: 'parseInt()'
    }, 
    {
        prompt: 'What is an undefined value in JavaScript?',
        choices: ['A value that does not exist', 'A variable that is assigned to another variable', 'A variable that has not been assigned a value', 'A value that has not been assigned a variable'],
        correct: 'A variable that has not been assigned a value'
    },
    {
        prompt: 'Which company developed JavaScript?',
        choices: ['Mozilla', 'Java', 'EcmaScript', 'NetScape'],
        correct: 'NetScape'
    }
]

console.log(questions[0].choices[1])
//let the element know we are selecting it
const quizContainer = document.querySelector('#quiz-container')
const quizOver = document.querySelector('#quiz-over')
let timeEl = document.getElementById('time-element')
let questionIndex = 0
let score = 0
let currentTime = 60

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

        if (e.target.textContent === questions[questionIndex].correct) {
            console.log('correct')
            score += 25
        } else {
            console.log('incorrect')
            currentTime -= 15
        }
        questionIndex++
        renderQuestions()
    }

}

function startTimer() {
    let timeInterval = setInterval(function (){
        if (currentTime === 0 || questionIndex >= questions.length || currentTime < 0) {
            clearInterval(timeInterval)
            endQuiz()
            document.querySelector('#quiz-container').setAttribute('style', 'display: none;')
        }
        timeEl.textContent = currentTime
        currentTime--
    }, 1000)
}

function endQuiz() {
    // quizOver.textContent = `Thank you for playing, your score is ${score}`

    if(score<=25){
        quizOver.textContent = `Yikes! Your score is ${score}. I'm sure you can do better than that!`
    } else if(score >25 && score <=75){
        quizOver.textContent = `Not bad! Your score is ${score}. But I think you can do better!`
    } else{
        quizOver.textContent = `Awesome! your score is ${score}. Teach me your ways, oh JavaScript legend!`
    }
    document.querySelector('#quiz-container').setAttribute('style', 'display: none;')
}

startButton.addEventListener('click', startQuiz)
document.querySelector('#quiz-container').addEventListener('click', checkAnswer)

