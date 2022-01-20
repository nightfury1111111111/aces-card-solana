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

function getGameCards(tokens, wildCards) {
    return tokens
            .map( token => {
                let suit, face;
                for (let i = 0; i < token.attributes.length; i++) {
                    if (token.attributes[i].trait_type === "Suit") suit = token.attributes[i].value.trim();
                    if (token.attributes[i].trait_type === "Value") face = token.attributes[i].value.trim();
                }
                return { mint: token.mint, image: token.image, suit: suit, face: face };
    }).concat(wildCards);
}

exports.wildCards = wildCards;
exports.getGameCards = getGameCards;