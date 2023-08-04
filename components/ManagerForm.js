import React, { Component, useState } from 'react';
import { Router } from '../routes';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import { PropertyListing } from "../ethereum/contracts";
import web3 from '../web3';

const Web3 = require("web3");
const toWei = (str) => Web3.utils.toWei(`${str}`, "ether");

class ManagerForm extends Component {

  state = {
      targetAmount: "",
      sharesOffered: "",
      withdrawAmount: "",
      dividendAmount: "",
      loading: false,
      errorMessage: ''
  };


  handleUnlistProperty = async (event) => {
    event.preventDefault();
    const listing = PropertyListing(this.props.address);
    const accounts = await web3.eth.getAccounts();
    this.setState({ loading: true, errorMessage: ''});
    try {
      await listing.methods.unlistProperty().send({
        from: accounts[0]
      })
      Router.replaceRoute(`/listings/${this.props.address}/manager`)
    } catch (err) {
      if (err.code === 32000 || err.code === 32603) {
        this.setState({ errorMessage: "Please reset your MetaMask account"});
      } else {
        this.setState({ errorMessage: err.message}) ;
      }
    } finally {
      this.setState({ loading: false, value: ''}) ;
    }
  };

  handleWithdraw = async (event) => {
    const withdrawAmount = toWei(this.state.withdrawAmount);
    event.preventDefault();
    const listing = PropertyListing(this.props.address);
    const accounts = await web3.eth.getAccounts();
    this.setState({ loading: true, errorMessage: ''});
    try {
      await listing.methods.withdraw(withdrawAmount).send({
        from: accounts[0]
      });
      Router.replaceRoute(`/listings/${this.props.address}/manager`);
    } catch (err) {
      if (err.code === 32000 || err.code === 32603) {
        this.setState({ errorMessage: "Please reset your MetaMask account"});
      } else {
        this.setState({ errorMessage: err.message}) ;
      }
    } finally {
      this.setState({ loading: false, withdrawAmount:'' });
    }
  };

render() {
    return (
      <div className="container cardborder">
        {this.props.status == 0 && (
          <Button
            fluid
            color="red"
            loading={this.state.loading}
            disabled={this.state.loading}
            onClick={this.handleUnlistProperty}
            content={"Unlist Property"}
          />
        )}
        {this.props.status == 1 && (
          <>
            <Form>
              <Form.Field>
                <label>Withdrawal Amount</label>
                <Input
                  type="number"
                  step={0.1}
                  min={0}
                  max={this.state.balance}
                  value={this.state.withdrawAmount}
                  onInput={(event) => {}}
                  onChange={(event) =>
                    this.setState({
                      withdrawAmount: event.target.value,
                    })
                  }
                  label="ETH"
                  labelPosition="right"
                />
                <Message error header = "Oops!" content={this.state.errorMessage} />
              </Form.Field>
            </Form>
            <br />
            <Button
              fluid
              primary
              loading={this.state.loading}
              disabled={this.state.loading}
              onClick={this.handleWithdraw}
              content="Withdraw"
            />
          </>
        )}
        {this.props.status == 2 && (
          <Button fluid color="red" disabled content={"Listing failed"} />
        )}
      </div>
    );
  }
}

export default ManagerForm;