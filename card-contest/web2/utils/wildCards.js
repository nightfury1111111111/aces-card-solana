// Example data
const suits = ["spades", "clubs", "hearts", "diamonds"];
const faces = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];


const wildCards = (numWildcards) => {
    let res = [];
    for (let i = 0; i < numWildcards; i++) {
        res.push( { face: faces[Math.floor(Math.random() * faces.length)], suit: suits[Math.floor(Math.random() * suits.length)] } )
    }

    return res;
}

exports.wildCards = wildCards;