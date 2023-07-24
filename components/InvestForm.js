import React, { Component, useState } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import { PropertyListing } from "../ethereum/contracts";
import web3 from '../web3';

class InvestForm extends Component {

    state = {
        value: '',
        loading: false,
        errorMessage: ''
    };

    onSubmit = async (event) => {        
        //const [loading, setLoading] = React.useState(false);
        event.preventDefault();
        const listing = PropertyListing(this.props.address);
        console.log(this.props.address);
        try {
            this.setState({ loading: true});
            const accounts = await web3.eth.getAccounts();
            console.log(accounts[0]);
            await listing.methods.invest().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            });
        } catch (err) {
            this.setState({ errorMessage: err.message}) ;
        }
        this.setState({ loading: false}) ;
    };

    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>
                        Amount to Invest
                    </label>
                    <Input
                        value={this.state.value}
                        onChange={event => this.setState({value: event.target.value})}
                        label = "ether"
                        labelPosition="right"
                    />
                    <Button loading ={this.state.loading} primary style={{ marginTop: '10px'}} >
                        Invest!
                    </Button>
                    <Message error header = "Oops!" content={this.state.errorMessage} />
                </Form.Field>
            </Form>
        );
    }
}

export default InvestForm;