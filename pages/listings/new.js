import React, {Component, useState, useContext} from "react";
import Layout from "../../components/Layout";
import { Form, Button, Input, Message } from "semantic-ui-react";
import { ListingProducer } from "../../ethereum/contracts";
import web3 from "../../web3";
import { AccountContext } from "../../components/context/AccountContext";
import { Router } from '../../routes';

const Web3 = require("web3");
const toWei = (str) => Web3.utils.toWei(`${str}`, "ether");

export default function ListingNew() {

    //const [account, _] = React.useContext(AccountContext);
    const [realEstateName, setRealEstateName] = useState('');
    const [targetAmount, setTargetAmount] = useState('');
    const [description, setDescription] = useState('');
    const [propertyAddress, setPropertyAddress] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = React.useState(false);

    const onSubmit = async (event) => {
        setErrorMessage('');
        event.preventDefault();
        setLoading(true);
        try {
            const accounts = await web3.eth.getAccounts();
            const account = accounts[0];
      
            await ListingProducer
                .methods
                .listProperty(
                    realEstateName,
                    description,
                    propertyAddress,
                    toWei(targetAmount, "ether")
                )
            .send({
                from: account
            });

            Router.pushRoute('/');
        } catch (err) {
            setErrorMessage(err.message);
        }
        setLoading(false);
    }

        return (
            <Layout>
                <h1>List your Property!</h1>

                <Form onSubmit={onSubmit} error={!!errorMessage}>
                    <Form.Field>
                        <label>Real Estate Name</label>
                        <Input placeholder="Enter your Property name"
                        value={realEstateName}
                        onChange={(e) =>
                        setRealEstateName(e.target.value.substring(0, 31))
                        }
                        error={realEstateName > 30}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Address</label>
                        <Input placeholder="Enter Address"
                        id="address"
                        value={propertyAddress}
                        onChange={(e) =>
                        setPropertyAddress(e.target.value.substring(0, 120))
                        }/>
                    </Form.Field>
                    <Form.Field>
                        <label>Description</label>
                        <Input placeholder="Enter Listing Description"
                        value={description}
                        onChange={(e) =>
                        setDescription(e.target.value.substring(0, 120))
                        }
                        error={description > 500}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Target Amount (ETH)</label>
                        <Input label="wei" 
                        placeholder="Minimum 0.1 ETH"
                        labelPosition="right"
                        value={targetAmount}
                        onChange={(e) => setTargetAmount(parseFloat(e.target.value))}
                        />
                    </Form.Field>
                    <Form.Input
                    label="Cover Image"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                        if (event.target.files[0]) {
                          const file = event.target.files[0];
                          if (file.size < 1000000) {
                            // setImage(file);
                          } else {
                            popup("Sorry, file size must be under 1MB");
                          }
                        }
                      }}
                    />
                    <Button loading ={loading} primary>List!</Button>
                    <Message error header = "Oops!" content={errorMessage} />
                </Form>
            </Layout>
        );
}
