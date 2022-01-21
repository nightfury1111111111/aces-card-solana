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
const { fiveCardRank, faceOrder } = require('../utils/poker');
const { getGameCards } = require('../utils/wildCards');

// TODO: Include Joker evaluation (recursive?)

function rankHand(tokens, gameType, wildCards) {
    // Consider wild cards
    let allCards = getGameCards(tokens, wildCards);

    // Get best hand based on game type
    switch (gameType) {
        case "5card":
            let hands = kCombinations(allCards, 5).map(hand => ({ hand: hand }));

            hands.sort( (a,b) => fiveCardRank(a.hand, b.hand) );
            let solvedHand = Hand.solve(hands[0].hand.map(card => `${card.face === "10" ? "T" : card.face[0].toUpperCase()}${card.suit[0]}`));

            return { hand: hands[0].hand, type: solvedHand.descr, score: solvedHand.rank };
    }
}

/**
 * EXPORTS
 */

async function getBestHandByWallet(pubkey, gameType, wildCards) {
    let acesTokens = await getAcesTokens(pubkey);
    if (acesTokens.length < 1) { console.log("Need 1 Aces NFTs to play."); return {};}
    let bestHand = rankHand(acesTokens, gameType, wildCards);
    return bestHand;
}

exports.getBestHandByWallet = getBestHandByWallet;