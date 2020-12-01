

var startBtn = document.querySelector(".startBtn");
var quizCard = document.querySelector(".quizCard");
var scoreDOM = document.querySelector(".scoreDOM")
var quiz = [];
let counter = 0;
let score = 0;
let correct = 0;

startBtn.onclick=startQuiz;



async function startQuiz(){

    startBtn.style.display='none';
    quizCard.innerHTML = "GOOD LUCK!"
    scoreDOM.innerHTML = score;
    counter = 0;
    quiz = await getQuestions()
    movieinfo = await getMovieInfo()

    console.log(movieinfo)
    
    printQuestion(movieinfo.Poster)
}



const getQuestions = async()=>{

        quiz = await fetch('quiz.json')
        quiz = await quiz.json()

    // console.log(quiz)
    return quiz
}


async function getMovieInfo(){
    let movieinfo = await fetch(`https://www.omdbapi.com?t=${quiz[counter].title}&apikey=trilogy`);
        movieinfo = await movieinfo.json();

    console.log(movieinfo)
    return movieinfo

}


function printQuestion(poster){
    quizCard.innerHTML = ""
    console.log("printQuestion fires!")
    var html = `<div class='quizDiv'>
    <h3>Question:${counter+1}</h3>
     <img src=${poster} class='movieposter'>
    <h2>${quiz[counter].question}</h2>
    `;

    quiz[counter].answers.map(answer=>(
        html += `<input type='radio' name='question${counter}' value=${answer}>${answer}` 
    ))

    html += `
    <br/>
    <button onclick=answerQuestion() class='answerBtn'>Answer</button>
    </div>`

    quizCard.innerHTML = html;
}


startQuiz()



async function answerQuestion(){
    console.log("answer!")
    console.log(document.querySelector(`input[name='question${counter}']:checked`).value)
    var playerAnswer = document.querySelector(`input[name='question${counter}']:checked`).value;
    var rightAnswer = quiz[counter].answer;

    if(playerAnswer === rightAnswer){
        score += 100;
        scoreDOM.innerHTML = score;
        correct++
        console.log("Correct!")
    }
    else{
        score-=25;
        scoreDOM.innerHTML = score;
        console.log("Wrong!")
    }

    if(counter === quiz.length - 1){
        console.log("GameOver");
        console.log("Score: " + score);
        gameOver()
        return
    }
    else{
    counter++
    movieinfo = await getMovieInfo()

    console.log(movieinfo)
    
    printQuestion(movieinfo.Poster)
    }
}


function gameOver(){
    quizCard.innerHTML = ""
    var html = `<div class='gameOverCard'>
    <h2>Game Over</h2>
    <h3>Score:${score}</h3>
    <h5>Correct:${correct}, Wrong:${quiz.length - correct}</h5>
    <button onclick=playAgain() class='replayBtn'>Play Again </button>
    </div>`

    quizCard.innerHTML = html;
}



async function playAgain(){
    score = 0;
    correct = 0;
    scoreDOM.innerHTML = score;
    counter = 0;

    movieinfo = await getMovieInfo()

    console.log(movieinfo)
    
    printQuestion(movieinfo.Poster)
}