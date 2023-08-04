const fs = require("fs-extra");
const path = require("path");
const  Web3  = require("web3");

const HDWalletProvider = require("@truffle/hdwallet-provider");

const provider = new HDWalletProvider({
  mnemonic:
    "twist clog coral glove kingdom begin birth fun pride fan impulse filter",
  providerOrUrl:
    "https://sepolia.infura.io/v3/b6cbb2d6d63a4dd4a571ac738f137bfe",
  numberOfAddresses: 1,
});

const web3 = new Web3(provider);

const { ListingProducer } = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "build/contracts.json"), "utf-8")
);

(async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("> deploying from:", accounts[0]);
  const gas = { gas: 6721975, gasPrice: "20000000000" }; //default ganache-cli params

  try {
  const listingProducer = await new web3.eth.Contract(ListingProducer.abi)
    .deploy({ data: ListingProducer.evm.bytecode.object })
    .send({ from: accounts[0], ...gas });

  const listingProducerAddress = listingProducer.options.address;
  console.log("> successfully deployed at:", listingProducerAddress);
  } catch (err) {
    console.log(err.message);
  } finally {
  provider.engine.stop();
  process.exit();
  }
})();