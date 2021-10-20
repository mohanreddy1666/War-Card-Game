let deckId = ""
let computerScore = 0
let myScore = 0
const newDeck = document.getElementById("new-deck")
const drawCard = document.getElementById("draw-card")
const cardsContainer = document.getElementById("cards")
const winner = document.getElementById("winner")
const cardCounter = document.getElementById("card-counter")
const computerScoreEl = document.getElementById("computer-score")
const myScoreEl = document.getElementById("my-score")

function handleClick(){
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/')
        .then(res => res.json())
        .then(data => {
            cardCounter.textContent = `Remaining Cards: ${data.remaining}`
            deckId = data.deck_id
        })
}

newDeck.addEventListener("click", handleClick)

function handleCard(){
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            cardsContainer.children[0].innerHTML = `
            <img src=${data.cards[0].image} class="card">
            `
            cardsContainer.children[1].innerHTML = `
            <img src=${data.cards[1].image} class="card">
            `
            const winnerText = decideWinner(data.cards[0], data.cards[1])
            winner.textContent = winnerText
            cardCounter.textContent = `Remaining Cards: ${data.remaining}`
            if (data.remaining === 0) {
                drawCard.disabled = true
                if (myScore > computerScore){
                    winner.textContent = `You Won the Game!`
                }
                else if (myScore < computerScore) {   
                    winner.textContent = `Computer Won the Game!`
                }
                else {
                    winner.textContent = `It's a Tie!`
                }
            }
        })
}

drawCard.addEventListener("click", handleCard)

function decideWinner(card1, card2){
    const valueOfCards = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1IndexValue = valueOfCards.indexOf(card1.value)
    const card2IndexValue = valueOfCards.indexOf(card2.value)
    if (card1IndexValue > card2IndexValue) {
        computerScore ++
        computerScoreEl.textContent = `Computer Score: ${computerScore}`
        return "Computer Wins!"
    }
    else if (card1IndexValue < card2IndexValue) {
        myScore ++
        myScoreEl.textContent = `My Score: ${myScore}`
        return "You Win!"
    }
    else {
        return "War!"
    }    
}
