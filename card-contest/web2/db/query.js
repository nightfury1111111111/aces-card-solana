require("dotenv").config({ path: "../config.env" });
const axios = require('axios');
const { Connection } = require('@solana/web3.js');
const { getParsedNftAccountsByOwner } = require("@nfteyez/sol-rayz");

const collectionSymbol = process.env.COLLECTION_SYMBOL;
const collectionDscr = process.env.COLLECTION_DSCR;

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

    return Promise.all(metadataList).then( tokens => tokens.filter(token => token.mint) )
}

exports.getAcesTokens = getAcesTokens;