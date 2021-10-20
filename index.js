let deckId = ""
const newDeck = document.getElementById("new-deck")
const drawCard = document.getElementById("draw-card")

function handleClick(){
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            deckId = data.deck_id
        })
}

function handleCard(){
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            console.log(data.cards)
            document.getElementById("cards").innerHTML = `
            <img src=${data.cards[0].image}>
            <img src=${data.cards[1].image}>
            `
        })
}

newDeck.addEventListener("click", handleClick)

drawCard.addEventListener("click", handleCard)
