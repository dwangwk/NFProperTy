import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import { ListingProducer } from "../ethereum/contracts";
import Layout from "../components/Layout";
import { Link } from "../routes";
import web3 from "../web3";
import { PropertyListing } from "../ethereum/contracts";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../components/firebase/Firebase";

class ListingIndex extends Component {
    
    state = {
        items: []
    }
    
    static async getInitialProps() {
        const listings = await ListingProducer.methods.getListingAddresses().call();
        return { listings };
     }

     async componentDidMount() {
        const itemPromises = this.props.listings.map(async (address) =>{
            const docRef = doc(db, "properties", address);
            const docSnapshot = await getDoc(docRef);

            if (docSnapshot.exists()) {
                const datas = docSnapshot.data();
          
                return {
                    key: address,
                    header: datas.realEstateName,
                    image: datas.downloadURL,
                    meta: datas.description,
                    description: (
                        <Link route={`/listings/${address}`}>
                            <a>View Listing</a>
                        </Link>
                    ),
                    fluid: true
                };
            } else {
                return {
                    key: address,
                    header: address,
                    description: (
                        <Link route={`/listings/${address}`}>
                            <a>View Listing</a>
                        </Link>
                    ),
                    fluid: true,
                    width: 6
                }; // Handle the case when the document doesn't exist
            }
        });

        Promise.all(itemPromises).then((items) => {
            // Filter out items that are null (for non-existing documents)
            const filteredItems = items.filter((item) => item !== null);
        
            this.setState({ items: filteredItems, isLoading: false });
        });
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
                <Card.Group itemsPerRow={2} items={this.state.items} />
            </div>
        </Layout>
        );
    }
}

export default ListingIndex;
