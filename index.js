let deckId = ""
const newDeck = document.getElementById("new-deck")
const drawCard = document.getElementById("draw-card")
const cardsContainer = document.getElementById("cards")
const winner = document.getElementById("winner")

function handleClick(){
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/')
        .then(res => res.json())
        .then(data => {
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
        })
}

drawCard.addEventListener("click", handleCard)

function decideWinner(card1, card2){
    const valueOfCards = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1IndexValue = valueOfCards.indexOf(card1.value)
    const card2IndexValue = valueOfCards.indexOf(card2.value)
    if (card1IndexValue > card2IndexValue) {
        return "Computer Wins!"
    }
    else if (card1IndexValue < card2IndexValue) {
        return "You Win!"
    }
    else {
        return "War!"
    }    
}
