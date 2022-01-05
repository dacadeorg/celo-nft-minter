
import { create as ipfsHttpClient } from 'ipfs-http-client'
import axios from "axios";

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')
export const createNft = async (
  marketplaceContract,
  performActions,
  {
      name, description, ipfsImage, ownerAddress
  },
) => {
    await performActions(async (kit) => {

        if (!name || !description || !ipfsImage) return
        const { defaultAccount } = kit;
        /* first, upload to IPFS */
        const data = JSON.stringify({
            name, description, image: ipfsImage,
            owner : defaultAccount
        })

        try {
            const added = await client.add(data)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            /* after file is uploaded to IPFS, pass the URL to save it on CELO */
            console.log({url})

            let transaction = await marketplaceContract.methods.safeMint(ownerAddress, url).send({from: defaultAccount})
            // let tx = await transaction.wait()
            // let event = tx.events[0]
            // let value = event.args[2]
            // let tokenId = value.toNumber()

            console.log({transaction})


            return transaction
            // const price = ethers.utils.parseUnits(formInput.price, 'ether')
            //
            // /* then list the item for sale on the marketplace */
            // contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
            // let listingPrice = await contract.getListingPrice()
            // listingPrice = listingPrice.toString()
            //
            // transaction = await contract.createMarketItem(nftaddress, tokenId, price, { value: listingPrice })
            // await transaction.wait()
            // router.push('/')
        } catch (error) {
            console.log('Error uploading file: ', error)
        }
    });

}

export const  uploadIpfsOnChange = async (e) => {
    const file = e.target.files[0]
    console.log({file})
    if(!file) return
    try {

        const added = await client.add(
            file,
            {
                progress: (prog) => console.log(`received: ${prog}`)
            }
        )
        return `https://ipfs.infura.io/ipfs/${added.path}`

    } catch (error) {
        console.log('Error uploading file: ', error)
    }
}

export const getNfts = async (marketplaceContract) => {
    try {
        // const calling = await marketplaceContract.methods.safeMint("0x9bb85D0bf68eeb273b7Fa1Aa1D0D822b9ee9b7fd", "https://bafybeihqiuhn3qzprjtvahyob2mxrhgr4i4xw4237zh7gu6oidobg32d3m.ipfs.infura-ipfs.io/").call();
        // console.log({calling})

        const nfts = [];
        const nftsLength = await marketplaceContract.methods.totalSupply().call()
        console.log({nftsLength})
        for (let i = 0; i < Number(nftsLength); i ++) {
            const nft = new Promise(async (resolve) => {
                const res = await marketplaceContract.methods
                    .tokenURI(i)
                    .call()
                console.log("res, ", res)
                const meta = await fetchNftMeta(res)
                console.log({meta})
                const owner = await fetchNftOwner(marketplaceContract, i)
                console.log({owner})
                resolve({
                    index: i,
                    owner,
                    name: meta.data.name,
                    image: meta.data.image,
                    description: meta.data.description,
                })
            });
            nfts.push(nft);
        }
        return Promise.all(nfts);
    } catch (e) {
        console.log({e})

    }

};

export const fetchNftMeta = async (ipfsUrl) => {
    try {

               if(!ipfsUrl)return null
                const meta = await axios.get(ipfsUrl)
                console.log({meta})
               return  meta


    } catch (e) {
        console.log({e})

    }

};


export const fetchNftOwner = async (marketplaceContract,index) => {
    try {

        return  await marketplaceContract.methods.ownerOf(index).call()



    } catch (e) {
        console.log({e})

    }

};


