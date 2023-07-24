import React, { Component } from "react";
import Layout from "../../../components/Layout";
import { Grid, Table } from "semantic-ui-react";
import { InvestorRow } from "../../../components/InvestorRow";

class ManagerIndex extends Component {
    static async getInitialProps(props) {
        //console.log(props.query.address);
        listingAddresss = props.query.address;
        const listing = PropertyListing(props.query.address);
        const summary = await listing.methods.getListingDetails().call();
        /*
        const investorCount = await listing.methods.getInvestorCount().call();
        const investors = await Promise.all(
            Array(investorCount)
            .fill()
            .map((element, index) => {
                return listing.methods.investors(index).call();
            })
        );*/
        
        //console.log(summary);
        name = summary[0];
        description = summary[1];
        propertyAddress= summary[2];
        totalSupply= summary[3];
        listingTimestamp= summary[4];
        managerAddress= summary[5];
        balance= fromWei(summary[6]);
        targetAmount= fromWei(summary[7]);
        status= summary[8]==='0n'?'Raising Funds':"Property is not currently financing";
        return summary;
     }
    
    render () {
        const { Header, Row, HeaderCell, Body } = Table;
        return (
            <Layout>
                <h3>Manager Portal</h3>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Address</HeaderCell>
                            <HeaderCell>Invested Amount</HeaderCell>
                        </Row>
                    </Header>
                </Table>
            </Layout>
        );
    }
}

export default ManagerIndex;