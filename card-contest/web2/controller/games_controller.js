/*
Games doc ref:
{
    _id: {today's date as string}
    gameType: "5card",
    entries: [
        {
            user: {wallet pubkey},
            hand: {NFT token account pubkey}[],
            handType: String,
            score: int that maps to hand type (rank)
        },
    ]
}
*/

const { getAcesTokens } = require('../db/query.js');
const { kCombinations } = require('../utils/combinations');
const { fiveCardRank, faceOrder } = require('../utils/poker');
const { getGameCards } = require('../utils/wildCards');

/**
 * Logic helpers
 */

 const handRankings = {
    "3card": [
        "high-card",
        "pair",
        "flush",
        "straight",
        "three-of-a-kind",
        "straight-flush"
    ],
    "5card": [
        "high-card",
        "pair",
        "two-pair",
        "three-of-a-kind",
        "straight",
        "flush",
        "full-house",
        "four-of-a-kind",
        "straight-flush",
        "royal-flush"
    ]
}

function isStraight(handFaces) {
    let order = ["A"].concat(faceOrder);
    for (let i = 0; i < order.length - 4; i++) {
        let face = order[i];
        if (handFaces.includes(face)) {
            for (let j = 1; j <= 4; j++) {
                face = order[i + j];
                if (!handFaces.includes(face)) {
                    break;
                }
                else {
                    if (j === 4) return true;
                }
            }
        }
    }
    return false;
}

function isFlush(handSuits) {
    return (new Set(handSuits)).size === 1;
}

// TODO: Include Joker evaluation (recursive?)

function rankHand(tokens, gameType, wildCards) {
    // Consider wild cards
    let allCards = getGameCards(tokens, wildCards);

    // Get best hand based on game type
    switch (gameType) {
        case "5card":
            let hands = kCombinations(allCards, 5).map(hand => ({ hand: hand }));

            for (let i = 0; i < hands.length; i++) {
                let currHand = hands[i].hand;

                let faces = currHand.map(card => card.face);
                let suits = currHand.map(card => card.suit);
                let uniqueFaces = [...new Set(faces)];

                let type;

                // Royal flush check
                if (isFlush(suits) && faces.includes("10") && faces.includes("J") && 
                    faces.includes("Q") && faces.includes("K") && faces.includes("A"))
                        type = "royal-flush";
                // Straight flush check
                else if (isStraight(faces) && isFlush(suits))
                    type = "straight-flush";
                // Four of a kind and full house checks
                else if (uniqueFaces.length === 2 && faces.length > 2) {
                    let counts = [0, 0];
                    for (let j = 0; j < currHand.length; j++) {
                        if (faces[j] === uniqueFaces[0]) counts[0] += 1;
                        else counts[1] += 1;
                    }
                    if (counts[0] === 4 || counts[1] === 4)
                        type = "four-of-a-kind";
                    else type = "full-house";
                }
                // Flush check
                else if (isFlush(suits))
                    type = "flush";
                // Straight check
                else if (isStraight(faces))
                    type = "straight";
                // Three of a kind and two pair checks
                else if (uniqueFaces.length === 3 && faces.length > 3) {
                    let counts = [0, 0, 0];
                    for (let j = 0; j < currHand.length; j++) {
                        if (faces[j] === uniqueFaces[0]) counts[0] += 1;
                        else if (faces[j] === uniqueFaces[1]) counts[1] += 1;
                        else counts[2] +=1;
                    }
                    if (counts[0] === 3 || counts[1] === 3 || counts[2] === 3)
                        type = "three-of-a-kind";
                    else type = "two-pair"
                }
                // Pair checks
                else if (uniqueFaces.length === 4 && faces.length > 4)
                    type = "pair";
                else type = "high-card";

                hands[i].type = type;
                hands[i].score = handRankings[gameType].indexOf(type);
                if (hands[i].hand.length !== 5) console.log(hands[i])
            }

            hands.sort( (a,b) => fiveCardRank(b,a) );

            return hands[0];
    }
}

/**
 * EXPORTS
 */

async function getBestHandByWallet(pubkey, gameType, wildCards) {
    let acesTokens = await getAcesTokens(pubkey);
    if (acesTokens.length < 1) { console.log("Need 1 Aces NFTs to play."); return null;}
    let bestHand = rankHand(acesTokens, gameType, wildCards);
    return bestHand;
}

exports.getBestHandByWallet = getBestHandByWallet;