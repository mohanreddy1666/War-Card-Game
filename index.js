const newDeck = document.getElementById("new-deck")

newDeck.addEventListener("click", function(){
    fetch('https://deckofcards/api/deck/new/shuffle/')
        .then(res => res.json())
        .then(data => console.log(data))
})
