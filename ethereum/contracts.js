import web3 from "../web3";
import contracts from "./build/contracts.json";

const ListingProducer = new web3.eth.Contract(
  contracts.ListingProducer.abi,
  "0x96b5437dd98005Cdf34e7b17D3dDE3bA4cf0dFcA"
);

const PropertyListing = (listingAddress) => {
  console.log(listingAddress);
  return new web3.eth.Contract(contracts.PropertyListing.abi, listingAddress);
};

export { ListingProducer, PropertyListing };