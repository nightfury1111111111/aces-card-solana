require("dotenv").config();
const axios = require('axios');
const { Connection } = require('@solana/web3.js');
const { getParsedNftAccountsByOwner } = require("@nfteyez/sol-rayz");

const collectionSymbol = process.env.COLLECTION_SYMBOL || "ACES";
const collectionDscr = process.env.COLLECTION_DSCR || "The Aces NFT";

const faceRankings = [ "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

async function getAcesTokens(pubkey, limit=false) {
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
                    symbol: nftData.data.symbol,
                    dscr: nftData.data.description,
                    attributes: nftData.data.attributes,
                    image: nftData.data.image               
                };

                if (res.symbol === collectionSymbol && res.dscr === collectionDscr) return res;
                else return {};
            }
            catch (e) {
                return {
                    error: "ERROR"
                }
            }
        });

    return Promise.all(metadataList).then( tokens => {
        let aces = tokens
            .filter(token => token.mint)
            .sort((a,b) => (faceRankings.indexOf(b.face) - faceRankings.indexOf(a.face)));
        if (aces.length > 10 && limit) return aces.sort(() => Math.random() - 1/2).slice(0,10);
        else return aces;
    });
}

exports.getAcesTokens = getAcesTokens;