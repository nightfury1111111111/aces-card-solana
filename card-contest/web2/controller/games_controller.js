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
require("dotenv").config({ path: "../config.env" });
const axios = require('axios');
const { Connection } = require('@solana/web3.js');
const { kCombinations } = require('../utils/combinations');
const { fiveCardRank, faceOrder } = require('../utils/poker');
const { getParsedNftAccountsByOwner } = require("@nfteyez/sol-rayz");

const collection = process.env.COLLECTION_TAG;

const handRankings = {
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

/**
 * Logic helpers
 */

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

function rankHand(tokens, gameType, wildCards) {
    // Consider wild cards
    let allCards = tokens
        .map( token => {
            let suit, face;
            for (let i = 0; i < token.attributes.length; i++) {
                if (token.attributes[i].trait_type === "Suit") suit = token.attributes[i].value;
                if (token.attributes[i].trait_type === "Value") face = token.attributes[i].value;
            }
            return { mint: token.mint, suit: suit, face: face };
        })
        .concat(wildCards);

    // Get best hand based on game type
    switch (gameType) {
        case "5card":
            let hands = kCombinations(allCards, 5).map(hand => ({ hand: hand }));
            for (let i = 0; i < hands.length; i++) {
                let currHand = hands[i].hand;
                let faces = currHand.map(card => card.face);
                let uniqueFaces = [...new Set(faces)];
                let suits = currHand.map(card => card.suit);
                let type;

                // Royal flush check
                if (isFlush(suits) && faces.includes("10") && faces.includes("J") && 
                    faces.includes("Q") && faces.includes("K") && faces.includes("A"))
                        type = "royal-flush";
                // Straight flush check
                else if (isStraight(faces) && isFlush(suits))
                    type = "straight-flush";
                // Four of a kind and full house checks
                else if (uniqueFaces.length === 2) {
                    let counts = [0, 0];
                    for (let j = 0; j < 5; j++) {
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
                else if (uniqueFaces.length === 3) {
                    let counts = [0, 0, 0];
                    for (let j = 0; j < 5; j++) {
                        if (faces[j] === uniqueFaces[0]) counts[0] += 1;
                        else if (faces[j] === uniqueFaces[1]) counts[1] += 1;
                        else counts[2] +=1;
                    }
                    if (counts[0] === 3 || counts[1] === 3 || counts[2] === 3)
                        type = "three-of-a-kind";
                    else type = "two-pair"
                }
                // Pair checks
                else if (uniqueFaces.length === 4)
                    type = "pair";
                else type = "high-card";

                hands[i].type = type;
                hands[i].score = handRankings[gameType].indexOf(type);
            }

            hands.sort(fiveCardRank);

            console.log(hands[hands.length - 1]);
            return hands[hands.length - 1];
    }
}

/**
 * DB Helpers
 */

async function getAcesTokens(pubkey) {
    //const endpoint = "https://api.mainnet-beta.solana.com/";
    const endpoint = "https://api.devnet.solana.com/";
    const connection = new Connection(endpoint);

    let allNfts = await getParsedNftAccountsByOwner({ publicAddress: pubkey, connection: connection });
    let metadataList = allNfts
        .map( async (metadata) => {
            try {
                let nftData = await axios
                    .get(metadata.data.uri);
                let res = {
                    mint: metadata.mint,
                    collection: nftData.data.collection?.name,
                    attributes: nftData.data.attributes,
                    image: nftData.data.image               
                };
                if (res.collection === collection) return res;
                else return {};
            }
            catch (e) {
                return {
                    error: "ERROR"
                }
            }
        });

    return Promise.all(metadataList).then( tokens => tokens.filter(token => token.mint) )
}

/**
 * EXPORTS
 */

async function getBestHandByWallet(pubkey, gameType, wildCards) {
    let acesTokens = await getAcesTokens(pubkey);
    if (acesTokens.length < 3) { console.log("Need 3 Aces NFTs to play."); return null;}
    return rankHand(acesTokens, gameType, wildCards);
}

exports.getBestHandByWallet = getBestHandByWallet;