import {
    marketplaceContractAddress,
    ERC20_DECIMALS
  } from "./constants";
import BigNumber from "bignumber.js";

export const createProduct = async(
  marketplaceContract, performActions, { name, image, description, location, price })=>{
    await performActions(async (kit) => {

        // get the newly fetched address
        const _address = kit.defaultAccount;

        const priceInWei = new BigNumber(price)
          .shiftedBy(ERC20_DECIMALS)
          .toString();

        await marketplaceContract.methods
          .writeProduct(name, image, description, location, priceInWei)
          .send({ from: _address });
    });
}

export const getProducts = async (marketplaceContract) => {
    const _productsLength = await marketplaceContract.methods.getProductsLength().call();
    const _products = [];

    for (let i = 0; i < _productsLength; i++) {
        let _product = new Promise(async (resolve, reject) => {
            let p = await marketplaceContract.methods.readProduct(i).call();
            resolve({
                index: i,
                owner: p[0],
                name: p[1],
                image: p[2],
                description: p[3],
                location: p[4],
                price: new BigNumber(p[5]),
                sold: p[6],
            });
        });
        _products.push(_product);
    }
    return Promise.all(_products);
};

export const buyProduct = async (marketplaceContract, cusdContract, performActions, {
    index,
    price
})=> {
    await performActions(async (kit) => {
        // get the newly fetched address
        const _address = kit.defaultAccount;

        await cusdContract.methods
          .approve(marketplaceContractAddress, price)
          .send({ from: _address });

        // await buyProduct(contract, _index);
        await marketplaceContract.methods.buyProduct(index).send({ from: _address });
      });
}