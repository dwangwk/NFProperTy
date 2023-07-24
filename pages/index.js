import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import { ListingProducer } from "../ethereum/contracts";
import Layout from "../components/Layout";
import { Link } from "../routes";
import web3 from "../web3";

class ListingIndex extends Component {
    static async getInitialProps() {
        const listings = await ListingProducer.methods.getListingAddresses().call();
        return { listings };
     }

     renderListings() {
        const items = this.props.listings.map(address =>{
            return {
                header: address,
                description: (
                    <Link route={`/listings/${address}`}>
                        <a>View Listing</a>
                    </Link>
                ),
                fluid: true
            }
        });

        return <Card.Group items={items} />;
     }

     render() {
        return (
        <Layout>
        <div>
            <h3>Open Listings</h3>
            <Link route="/listings/new">
            <a>
                <Button 
                    floated="right"
                    content = "Create Listing"
                    icon ="add circle"
                    primary
                />
            </a>
            </Link>
            {this.renderListings()}
        </div>
        </Layout>
        );
    }
}

export default ListingIndex;