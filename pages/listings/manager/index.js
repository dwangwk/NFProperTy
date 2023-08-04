import React, { Component } from "react";
import Layout from "../../../components/Layout";
import { Header, Card, Grid, GridColumn, Table, CardHeader, CardDescription } from "semantic-ui-react";
import ManagerForm from "../../../components/ManagerForm";
import InvestorRow from "../../../components/InvestorRow";
import { PropertyListing } from "../../../ethereum/contracts";

const Web3 = require("web3");
const fromWei = (str) => Web3.utils.fromWei(`${str}`, "ether");
let name;
let address;
let description;
let propertyAddress;
let totalSupply;
let listingTimestamp;
let managerAddress;
let balance;
let targetAmount;
let status;
let statusCode;

class ManagerIndex extends Component {
    static async getInitialProps(props) {
        //console.log(props.query.address);
        const address = props.query.address;
        const listing = PropertyListing(address);
        const summary = await listing.methods.getListingDetails().call();
        
        const investorCount = await listing.methods.getInvestorCount().call();
        const investors = await Promise.all(
            Array(parseInt(investorCount))
            .fill()
            .map((element, index) => {
                return listing.methods.investors(index).call();
            })
        );

        const investments = await Promise.all(
            investors.map(investor => {
                return listing.methods.investment(investor).call();
            })
        );
        
        //console.log(summary);
        name = summary[0];
        description = summary[1];
        propertyAddress= summary[2];
        totalSupply= summary[3];
        listingTimestamp= summary[4];
        managerAddress= summary[5];
        balance= fromWei(summary[6]);
        console.log(balance);
        targetAmount= fromWei(summary[7]);
        statusCode = parseInt(summary[8]);
        status= statusCode===0?'Raising Funds':"Property is not currently financing";
        return { name, balance, managerAddress, totalSupply, description, targetAmount, address, investors, investments, investorCount, statusCode, status };
     }

     renderRows() {
        return this.props.investors.map((investor, index) => {
            return <InvestorRow 
                key = {index}
                id = {index}
                investment={fromWei(this.props.investments[index])}
                investor = {investor}
                address = { this.props.address }
            />
        });
     }
    
    render() {
        const { Header, Row, HeaderCell, Body } = Table;
        return (
            <Layout>
                <h3>Manager Portal</h3>
                <Grid>
                    <GridColumn width={10}>
                        <Table>
                            <Header>
                                <Row>
                                    <HeaderCell>ID</HeaderCell>
                                    <HeaderCell>Address</HeaderCell>
                                    <HeaderCell>Invested Amount</HeaderCell>
                                </Row>
                            </Header>
                            <Body>
                                {this.renderRows()}
                            </Body>
                        </Table>
                    </GridColumn>
                    <GridColumn width={6}>
                        <Card width={3}>
                        <Card.Content>
                            <CardHeader textAlign="center">Total Balance</CardHeader>
                            <CardDescription textAlign="center"><h3>{this.props.balance}</h3></CardDescription>
                        </Card.Content>
                        </Card>
                        <Card>
                            <Card.Content>
                                <h3>{this.props.status}</h3>
                            </Card.Content>
                            <Card.Content>
                                <ManagerForm 
                                address={this.props.address} 
                                status={this.props.statusCode}
                                managerAddress={this.props.managerAddress}
                                />
                            </Card.Content>
                        </Card>
                    </GridColumn>
                </Grid>
            </Layout>
        );
    }
}

export default ManagerIndex;