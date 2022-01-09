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

async function getAcesTokens(pubkey) {
    const endpoint = "https://api.mainnet-beta.solana.com/";
    //const endpoint = "https://api.devnet.solana.com/";
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

async function getBestHandByWallet(pubkey, gameType) {
    let acesTokens = await getAcesTokens(pubkey);
    switch (gameType) {
        case "5card":
            // TODO: calculate best hand
            return { hand: ["A",2,3,4,5], type: "straight", score: 4 };
    }
}

exports.getBestHandByWallet = getBestHandByWallet;