let deckId = ""
const newDeck = document.getElementById("new-deck")

function handleClick(){
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            deckId = data.deck_id
        })
}

newDeck.addEventListener("click", handleClick)
