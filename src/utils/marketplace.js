import BigNumber from 'bignumber.js';
import { marketplaceContractAddress } from './constants';
import { cusdToWei } from './utils';

export const createProduct = async (
  marketplaceContract,
  performActions,
  {
    name, image, description, location, price,
  },
) => {
  await performActions(async (kit) => {
    // get the newly fetched address
    const { defaultAccount } = kit;

    const priceInWei = cusdToWei(price);

    await marketplaceContract.methods
      .writeProduct(name, image, description, location, priceInWei)
      .send({ from: defaultAccount });
  });
};

export const getProducts = async (marketplaceContract) => {
  const productsLength = await marketplaceContract.methods.getProductsLength().call();
  const products = [];

  for (let i = 0; i < productsLength; i += 1) {
    const product = new Promise((resolve, reject) => {
      marketplaceContract.methods
        .readProduct(i)
        .call()
        .then((p) => resolve({
          index: i,
          owner: p[0],
          name: p[1],
          image: p[2],
          description: p[3],
          location: p[4],
          price: new BigNumber(p[5]),
          sold: p[6],
        }))
        .catch((e) => reject(e));
    });
    products.push(product);
  }
  return Promise.all(products);
};

export const buyProduct = async (
  marketplaceContract,
  cusdContract,
  performActions,
  { index, price },
) => {
  await performActions(async (kit) => {
    // get the newly fetched address
    const { defaultAccount } = kit;

    await cusdContract.methods
      .approve(marketplaceContractAddress, price)
      .send({ from: defaultAccount });

    // await buyProduct(contract, _index);
    await marketplaceContract.methods.buyProduct(index).send({ from: defaultAccount });
  });
};
