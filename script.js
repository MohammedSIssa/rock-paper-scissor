const buttons = document.querySelectorAll('button')
const humanChoice = document.querySelector('.human-choice')
const cpuChoice = document.querySelector('.computer-choice')
const humanHTMLScore = document.querySelector('.human-score')
const cpuHTMLScore = document.querySelector('.cpu-score')
const roundNumber = document.querySelector('.round-number')

let rounds = 1
let humanScore = 0
let cpuScore = 0
let gameFinished = false
let winner

const cpuChoices = ['rock', 'paper', 'scissor']

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    if(!gameFinished){
      reset()
      playRound(getHumanChoice(btn.getAttribute('value')), getComputerChoice())
      updateScore(rounds, humanScore, cpuScore)
      checkEndGame()
    }
  })
})

function getHumanChoice(choice) {
  let humanChoiceSVG = document.createElement('img')
  humanChoiceSVG.src = `./svg/${choice}.svg`
  humanChoice.append(humanChoiceSVG)
  return choice
}

function reset(){
  humanChoice.innerHTML = ""
  cpuChoice.innerHTML = ""
  humanChoice.classList.remove('winner')
  cpuChoice.classList.remove('winner')
}

// This function add the svg into the cpu, and returns cpu choice
function getComputerChoice(){
  let cpu = cpuChoices[Math.floor(Math.random() * 3)]
  let cpuChoiceSVG = document.createElement('img')
  cpuChoiceSVG.src = `./svg/${cpu}.svg`
  cpuChoice.append(cpuChoiceSVG)
  return cpu
}

function playRound(human, cpu){
  if(
    human === "rock" && cpu === "scissor" ||
    human === "paper" && cpu === "rock"   ||
    human === "scissor" && cpu === "paper"
  ) {
    humanScore++
    rounds++
    humanChoice.classList.add('winner')
  }
  if(
    cpu === "rock" && human === "scissor" ||
    cpu === "paper" && human === "rock"   ||
    cpu === "scissor" && human === "paper"
  ) {
    cpuScore++
    rounds++
    cpuChoice.classList.add('winner')
  }
  if(
    cpu === human
  ) {
    // I decided draw does not increment players score
    // humanScore++
    // cpuScore++
    rounds++
  }
}

function updateScore(round, human, cpu){
  humanHTMLScore.textContent = human
  cpuHTMLScore.textContent = cpu
  roundNumber.textContent = round
}

function checkEndGame(){
  if(humanScore === 5 || cpuScore === 5){
    gameFinished = true
    announceWinner(humanScore, cpuScore)
  }
}

function announceWinner(human, cpu){
  if(human === 5){
    winner = "You"
  }
  if(cpu === 5){
    winner = "Computer"
  }
  showWinningModal()
}

function showWinningModal(){
  let winnnigModal = document.createElement('div')
  winnnigModal.className = "modal"
  let centeredDiv = document.createElement('div')
  centeredDiv.className = "centered"
  let whoWon = document.createElement('p')
  whoWon.textContent = winner + " Won!"
  let playAgainBtn = document.createElement('button')
  playAgainBtn.className = "play-again"
  playAgainBtn.textContent = "Play Again"
  centeredDiv.append(whoWon)
  centeredDiv.append(playAgainBtn)
  winnnigModal.append(centeredDiv)
  document.body.append(winnnigModal)
  document.querySelector('.play-again').addEventListener('click', playAgain)
}

function playAgain(){
  location.reload()
}