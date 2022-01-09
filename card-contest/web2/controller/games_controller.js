/*
Games doc ref:
{
    _id: {today's date as string}
    gameType: "5 Card Poker",
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

// TODO: Get NFTs by wallet, prune to just Aces collection, then use a hand ranking algo
function getBestHandByWallet(pubkey) {
    return { hand: [1,2,3,4,5], type: "straight", score: 8 };
}

exports.getBestHandByWallet = getBestHandByWallet;