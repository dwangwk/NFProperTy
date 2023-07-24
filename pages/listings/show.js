import React, { Component } from "react";
import { Card, List, Icon, Grid } from "semantic-ui-react";
import Layout from "../../components/Layout";
import { PropertyListing } from "../../ethereum/contracts";
import InvestForm from "../../components/InvestForm";

const Web3 = require("web3");
const fromWei = (str) => Web3.utils.fromWei(`${str}`, "ether");
let name;
let listingAddresss;
let description;
let propertyAddress;
let totalSupply;
let listingTimestamp;
let managerAddress;
let yourBalance;
let targetAmount;
let status;

class ListingShow extends Component {
    
    static async getInitialProps(props) {
        //console.log(props.query.address);
        listingAddresss = props.query.address;
        const listing = PropertyListing(props.query.address);
        const summary = await listing.methods.getListingDetails().call();
        //console.log(summary);
        name = summary[0];
        description = summary[1];
        propertyAddress= summary[2];
        totalSupply= summary[3];
        listingTimestamp= summary[4];
        managerAddress= summary[5];
        yourBalance= summary[6];
        targetAmount= fromWei(summary[7]);
        status= summary[8]==='0n'?'Raising Funds':"Property is not currently financing";
        return summary;
     }
    
    renderCards() {
        const items = [
            {
                header: name,
                meta: propertyAddress,
                description: description
            },
            {
                header: targetAmount,
                meta: 'Target Amount of Investment (ETH)',
                description: `| ${parseInt(
                    (100 * parseInt(yourBalance)) /
                      parseInt(targetAmount)
                  )}% funded`
            },
            {
                header: managerAddress,
                meta: 'Address of Manager',
                description: 'The manager that listed this property',
                style: {overflowWrap: 'break-word'}
            },
        ];

        return <Card.Group items={items}/>;
     };
    render() {
        return (
            <Layout>
                <h3>Listing Show</h3>
                <Grid>
                    <Grid.Column width={10}>
                    {this.renderCards()}
                    </Grid.Column>
                    <Grid.Column width={6}>
                    <InvestForm address={listingAddresss}/>
                    </Grid.Column>
                </Grid>
            </Layout>
        );
    }
}

export default ListingShow;