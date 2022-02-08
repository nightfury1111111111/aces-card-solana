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
const { Hand } = require('pokersolver');

const { getAcesTokens } = require('../db/query.js');
const { kCombinations } = require('../utils/combinations');
const { rank, faceOrder } = require('../utils/poker');
const { getGameCards } = require('../utils/wildCards');

// TODO: Include Joker evaluation (recursive?)

function rankHand(tokens, gameType, wildCards) {
    // Consider wild cards
    let allCards = getGameCards(tokens, wildCards);

    // Handle wild cards (joker-type, not table cards): add one hand per possible value with each card pointing at the original wild card's image
    let wilds;
    if (gameType === "deuceswild") {
        wilds = ["2", "joker"];
    }
    else if (gameType == "4swild") {
        wilds = ["4", "joker"];
    }
    else if (gameType === "secretwild") {
        wilds = ["7", "joker"];
    }
    else wilds = ["joker"];

    for (let i = 0; i < allCards.length; i++)
        if (wilds.indexOf(allCards[i].face) !== -1 && allCards[i].image)
            allCards[i].face = "0";

    // Ignore original wilds
    allCards = allCards.filter(card => !card.ignore);

    let hands = kCombinations(allCards, 5).map(hand => ({ hand: hand }));

    // Get best hand based on game type
    hands.sort( (a,b) => rank(a.hand, b.hand) );
    let solvedHand = Hand.solve(hands[0].hand.map(card => `${card.face === "10" ? "T" : card.face[0].toUpperCase()}${card.suit[0]}`));

    // Five of a kind check
    let uniqueFaces = [...new Set(hands[0].hand.map(card => card.face))];
    if (uniqueFaces.length === 1 || (uniqueFaces.length === 2 && uniqueFaces.indexOf("0") !== -1)) {
        solvedHand.descr = `Five of a kind`;
        solvedHand.rank = 10;
    }

    return { hand: hands[0].hand, type: solvedHand.descr, score: solvedHand.rank, aces: getGameCards(tokens,[]) };

}

/**
 * EXPORTS
 */

async function getBestHandByWallet(pubkey, gameType, wildCards) {
    let acesTokens = await getAcesTokens(pubkey, true);
    if (acesTokens.length < 1) { console.log("Need 1 Aces NFTs to play."); return {};}
    let bestHand = rankHand(acesTokens, gameType, wildCards);
    return bestHand;
}

function getBestHandByPool(cards, gameType) {
    return rankHand([], gameType, cards);
}

exports.getBestHandByWallet = getBestHandByWallet;
exports.getBestHandByPool = getBestHandByPool;