import React, { Component, useState } from 'react';
import { Router } from '../routes';
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
            this.setState({ loading: true, errorMessage: ''});
            const accounts = await web3.eth.getAccounts();
            console.log(accounts[0]);
            await listing.methods.invest().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            });
            Router.replaceRoute(`/listings/${this.props.address}`);
        } catch (err) {
            this.setState({ errorMessage: err.message}) ;
        }
        this.setState({ loading: false, value: ''}) ;
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
                    <Message error header = "Oops!" content={this.state.errorMessage} />
                    <Button loading ={this.state.loading} primary style={{ marginTop: '10px'}} >
                        Invest!
                    </Button>
                    
                </Form.Field>
            </Form>
        );
    }
}

export default InvestForm;