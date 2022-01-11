// Callback function to sort hands of the type
// { hand: [{mint, suit, facee}], type: String, score: int }
const faceOrder = [ "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A" ];

const fiveCardRank = (a, b) => {
    let score = a.score - b.score;
    if (score !== 0) return score;

    // Tie-breaker situations
    let handA = a.hand; let handB = b.hand;
    let facesA = {}; let facesB = {};

    // Get counts of all faces
    for (let i = 0; i < 5; i++) {
        if (handA[i].face in facesA) facesA[handA[i].face] += 1;
        else facesA[handA[i].face] = 1;

        if (handB[i].face in facesB) facesB[handB[i].face] += 1;
        else facesB[handB[i].face] = 1;
    }

    let facesAList = Object.keys(facesA);
    let facesBList = Object.keys(facesB);

    if (a.type === "straight-flush" || a.type == "straight") {
        // Find highest card value
        handA.sort((x, y) => (faceOrder.indexOf(x.face) - faceOrder.indexOf(y.face)));
        handB.sort((x, y) => (faceOrder.indexOf(x.face) - faceOrder.indexOf(y.face)));
        return faceOrder.indexOf(handA[4]) - faceOrder.indexOf(handB[4]);
    }
    else if (a.type === "four-of-a-kind" || a.type === "full-house") {
        let minA, minB;
        if (facesA[facesAList[0]] in [3, 4])
            minA = 1;
        else minA = 0;
        if (facesB[facesBList[0]] in [3, 4])
            minB = 1;
        else minB = 0;

        let maxA = (minA === 0) ? 1 : 0;
        let maxB = (minB === 0) ? 1 : 0;
        let diff = facesA[maxA] - facesB[maxB];
        if (diff === 0) return facesA[minA] - facesB[minB];
        else return diff;
    }
    else if (a.type == "three-of-a-kind" || a.type == "pair") {
        let pairedIndexA = -1; let pairedIndexB = -1;
        let highCardIndexA = -1; let highCardIndexB = -1;

        for (let i = 0; i < facesAList.length; i++) {
            if (facesA[facesAList[i]] in [2, 3]) pairedIndexA = i;
            if (facesB[facesBList[i]] in [2, 3]) pairedIndexB = i;

            if (highCardIndexA === -1 || facesA[facesAList[i]] > facesA[facesAList[highCardIndexA]])
                highCardIndexA = i;
            if (highCardIndexB === -1 || facesB[facesBList[i]] > facesB[facesBList[highCardIndexB]])
                highCardIndexB = i;
        }

        let diff = facesA[pairedIndexA] - facesB[pairedIndexB];
        if (diff !== 0) return diff;

        let next = facesA[highCardIndexA] - facesB[highCardIndexB];
        if (next !== 0) return next;

        if (a.type === "three-of-a-kind") {
            let iA = [0, 1, 2].filter(x => x !== pairedIndexA && x !== highCardIndexA)[0];
            let iB = [0, 1, 2].filter(x => x !== pairedIndexB && x !== highCardIndexB)[0];
            return faceOrder.indexOf(facesAList[iA]) - faceOrder.indexOf(facesBList[iB]);
        }
        else {
            let lastIndicesA = [0, 1, 2, 3].filter(x => x !== pairedIndexA && x !== highCardIndexA);
            let lastIndicesB = [0, 1, 2, 3].filter(x => x !== pairedIndexB && x !== highCardIndexB);
            let lastFacesA = [facesAList[lastIndicesA[0]], facesAList[lastIndicesA[1]]];
            let lastFacesB = [facesBList[lastIndicesB[0]], facesBList[lastIndicesB[1]]];
            let iA = (faceOrder.indexOf(lastFacesA[0]) > faceOrder.indexOf(lastFacesA[1])) ? 0 : 1;
            let iB = (faceOrder.indexOf(lastFacesB[0]) > faceOrder.indexOf(lastFacesB[1])) ? 0 : 1;
            let third = faceOrder.indexOf(facesAList[iA]) - faceOrder.indexOf(facesBList[iB]);
            if (third !== 0) return third;
            return faceOrder.indexOf(facesAList[(iA === 0) ? 1 : 0]) - faceOrder.indexOf(facesBList[(iB === 0) ? 1 : 0]);
        }
    }
    else if (a.type == "two-pair") {
        let pairFacesA = facesAList.filter(face => facesA[face] === 2);
        let pairFacesB = facesBList.filter(face => facesB[face] === 2);

        pairFacesA.sort((x, y) => faceOrder.indexOf(x) - faceOrder.indexOf(y));
        pairFacesB.sort((x, y) => faceOrder.indexOf(x) - faceOrder.indexOf(y));
        
        let diff = faceOrder.indexOf(pairFacesA[1]) - faceOrder.indexOf(pairFacesB[1]);
        if (diff !== 0) return diff;
        let diff2 = faceOrder.indexOf(pairFacesA[0]) - faceOrder.indexOf(pairFacesB[0]);
        if (diff2 !== 0) return diff2;
        
        return faceOrder.indexOf(facesAList.filter(face => facesA[face] === 1)[0]) - faceOrder.indexOf(facesBList.filter(face => facesB[face] === 1)[0])
    }
    // High card
    else {
        handA.sort((x, y) => (faceOrder.indexOf(x.face) - faceOrder.indexOf(y.face)));
        handB.sort((x, y) => (faceOrder.indexOf(x.face) - faceOrder.indexOf(y.face)));
        for (let i = 0; i < 5; i++) {
            let diff = faceOrder.indexOf(handA[i].face) - faceOrder.indexOf(handB[i].face);
            if (diff !== 0) return diff;
        }
        return 0;
    }
}

exports.fiveCardRank = fiveCardRank;
exports.faceOrder = faceOrder;