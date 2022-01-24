const { Hand } = require('pokersolver');

// Callback function to sort hands of the type
// { hand: [{mint, suit, face}], type: String, score: int }
const faceOrder = [ "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A" ];

// if a better than b, return -1

const rank = (a, b) => {
    let gameType = "standard";
    let handA = Hand.solve(a.map(card => `${card.face === "10" ? "T" : card.face[0].toUpperCase()}${card.suit[0]}`), gameType);
    let handB = Hand.solve(b.map(card => `${card.face === "10" ? "T" : card.face[0].toUpperCase()}${card.suit[0]}`), gameType);

    // Five of a kind check
    let facesA = [...new Set(a.map(card => card.face))];
    let facesB = [...new Set(b.map(card => card.face))];

    // If they're both 5 of a kind, check face value. Consider non-wild 5 of a kind first.
    if (facesA.length === 1 && facesB.length === 1) {
        return faceOrder.indexOf(facesB[0]) - faceOrder.indexOf(facesA[0]);
    }
    else if (facesA.length === 1) {
        return -1;
    }
    else if (facesB.length === 1) {
        return 1;
    } 
    // Wild 5 of a kinds
    else if (facesA.length === 2 && facesA.indexOf("0") !== -1 && facesB.length === 2 && facesB.indexOf("0") !== -1){
        facesA.sort((a,b) => faceOrder.indexOf(b.face[0]) - faceOrder.indexOf(a.face[0]));
        facesB.sort((a,b) => faceOrder.indexOf(b.face[0]) - faceOrder.indexOf(a.face[0]));
        return faceOrder.indexOf(facesB[0]) - faceOrder.indexOf(facesA[0]);
    }
    else if (facesA.length === 2 && facesA.indexOf("0") !== -1) {
        return -1;
    }
    else if (facesB.length === 2 && facesB.indexOf("0") !== -1) {
        return 1;
    } 

    return handA.compare(handB);
}

exports.rank = rank;
exports.faceOrder = faceOrder;