const fs = require("fs-extra");
const path = require("path");
const { Web3 } = require('web3');
const ganache = require("ganache");
const web3 = new Web3(ganache.provider());
const assert = require("assert");

const fromWei = (str) => Web3.utils.fromWei(`${str}`, "ether");
const toWei = (str) => Web3.utils.toWei(`${str}`, "ether");

const p = path.resolve(__dirname, "build/contracts.json");

let accounts;
let producer;
let manager;
let investor;
let listingAddress;
let listing;
const gas = { gas: 6721975, gasPrice: "20000000000" }; //default ganache-cli params

beforeEach(async () => {
    //get account
    accounts = await web3.eth.getAccounts();
    //console.log(accounts[0]);

    const { ListingProducer, PropertyListing } = JSON.parse(fs.readFileSync(p, "utf-8"));
    //console.log(ListingProducer.abi);
    
    manager = accounts[1];
    investor = accounts[2];
    investor2 = accounts[3];
    investor3 = accounts[4];

    //deploy listing producer contract w/ connected account
    producer = await new web3.eth.Contract(ListingProducer.abi)
    .deploy({ data: ListingProducer.evm.bytecode.object })
    .send({ from: accounts[0], gas: '5000000' });

    //call listingProperty function using producer to create propertylisting instance
    await producer.methods.listProperty("SOME RANDOM HOUSE","test", "test", toWei("0.01"))
    .send({ from: accounts[1], gas:'1000000' });

    //get list of propertylistings (view function)
    [listingAddress] = await producer.methods.getListingAddresses().call();

    //get deployed listing contract as a javascript object
    listing = await new web3.eth.Contract(PropertyListing.abi, listingAddress);
    //console.log("listing created");
    
});

describe(' Listings', () => {
    it('deploys a producer and listing', () => {
        assert.ok(producer.options.address);
        assert.ok(listing.options.address);
    });

    it('listing has correct target amount',  async () => {
        const totalSupply = await listing.methods.targetAmount().call();
        assert.equal(totalSupply, toWei("0.01"));
    });

    it('caller is listing manager', async () => {
        const managerAdd = await listing.methods.managerAddress().call();
        assert.strictEqual(manager, managerAdd);
    });
    
    it('get summary', async () => {
        const listingDetails = await listing.methods.getListingDetails().call();
        console.log(listingDetails);
    });

    it("allows investment", async () => {
        await listing.methods.invest().send({
            value: toWei("0.005"), 
            from: investor,
            ...gas});
        const investedAmount = await web3.eth.getBalance(listing.options.address);
        assert.equal(investedAmount, toWei("0.005"));
    });

    it("allows manager to close listing and refund investors", async () => {
        const begBalance = await web3.eth.getBalance(investor);
        await listing.methods.invest().send({
            value: toWei("0.005"), 
            from: investor,
            ...gas});
        await listing.methods.unlistProperty().send({
            from: manager,
            ...gas})
            .on("receipt", (receipt) => console.log("closing listing, refund"));
            const aftBalance = await web3.eth.getBalance(investor);
            console.log(fromWei(aftBalance - begBalance));
            assert.ok(aftBalance - begBalance < toWei("0.005"));
    });

    it("allows manager to conclude campaign and distribute tokenized shares", async () => {
        await listing.methods.invest().send({
            value: toWei("0.04"), 
            from: investor,
            ...gas});
        await listing.methods.invest().send({
            value: toWei("0.04"), 
            from: investor2,
            ...gas});
        await listing.methods.invest().send({
            value: toWei("0.04"), 
            from: investor3,
            ...gas});
        await listing.methods.unlistProperty().send({
            from: manager,
            ...gas})
            .on("receipt", (receipt) => console.log("closing listing, distributing tokens"));
        
    });
});