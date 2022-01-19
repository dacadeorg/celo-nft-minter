const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyNFT", function () {
  this.timeout(50000);
  let myNFT;

  this.beforeEach(async function() {
      // This is executed before each test
      // Deploying the smart contract
      const MyNFT = await ethers.getContractFactory("MyNFT");
      myNFT = await MyNFT.deploy();
  })

  it("Should mint one NFT", async function() {
      [account1] = await ethers.getSigners();

      expect(await myNFT.balanceOf(account1.address)).to.equal(0);
      
      const tokenURI = "https://example.com/1"
      const tx = await myNFT.connect(account1).safeMint(account1.address, tokenURI);
      await tx.wait();

      expect(await myNFT.balanceOf(account1.address)).to.equal(1);
  })

  it("Should set the correct tokenURI", async function() {
      [account1, account2] = await ethers.getSigners();

      const tokenURI_1 = "https://example.com/1"
      const tokenURI_2 = "https://example.com/1"

      const tx1 = await myNFT.connect(account1).safeMint(account1.address, tokenURI_1);
      await tx1.wait();
      const tx2 = await myNFT.connect(account1).safeMint(account2.address, tokenURI_2);
      await tx2.wait();

      expect(await myNFT.tokenURI(0)).to.equal(tokenURI_1);
      expect(await myNFT.tokenURI(1)).to.equal(tokenURI_2);
  })
});
