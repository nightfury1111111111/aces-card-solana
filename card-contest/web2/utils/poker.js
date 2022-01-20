const { Hand } = require('pokersolver');

// Callback function to sort hands of the type
// { hand: [{mint, suit, face}], type: String, score: int }
const faceOrder = [ "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A" ];

const fiveCardRank = (a, b) => {
    let handA = Hand.solve(a.map(card => `${card.face === "10" ? "T" : card.face[0].toUpperCase()}${card.suit[0]}`));
    let handB = Hand.solve(b.map(card => `${card.face === "10" ? "T" : card.face[0].toUpperCase()}${card.suit[0]}`));
    return handA.compare(handB);
}

exports.fiveCardRank = fiveCardRank;
exports.faceOrder = faceOrder;