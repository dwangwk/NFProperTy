import web3 from "../web3";
import contracts from "./build/contracts.json";

const ListingProducer = new web3.eth.Contract(
  contracts.ListingProducer.abi,
  "0x3b88B41B524b9DF477B489B99b67638A7F0eeD6D"
);

const PropertyListing = (listingAddress) => {
  console.log(listingAddress);
  return new web3.eth.Contract(contracts.PropertyListing.abi, listingAddress);
};

export { ListingProducer, PropertyListing };