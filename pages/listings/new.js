import React, {Component, useState, useContext} from "react";
import Layout from "../../components/Layout";
import { Card, Form, Button, Input, Message } from "semantic-ui-react";
import { ListingProducer } from "../../ethereum/contracts";
import web3 from "../../web3";
import { AccountContext } from "../../components/context/AccountContext";
import { Router } from '../../routes';
import { db, storage } from "../../components/firebase/Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from 'firebase/firestore'; 

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
    const [previewUrl, setPreviewUrl] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [downloadURL, setDownloadURL] = useState(null);
    const [listingContractAddress, setListingContractAddress] = useState(null);

    const handleFileChange = (event) => {
        if (event.target.files[0]) {
        const file = event.target.files[0];
        setSelectedImage(file);
        // Display image preview
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
        }
    };


    const onSubmit = async (event) => {
        setErrorMessage('');
        event.preventDefault();
        setLoading(true);
        try {
            if (realEstateName.length < 1) {
                throw Error('Please input Real Estate Name');
            } else if (propertyAddress.length < 20) {
                throw Error('Please input Property Address');
            } else if (description.length < 20) {
                throw Error('Please input description');
            } else if (targetAmount < 0.01 ) {
                throw Error('Please input valid targetAmount (> 0.01 ETH)');
            } 

            const accounts = await web3.eth.getAccounts();
            const account = accounts[0];
            
            const transactionReceipt = await ListingProducer
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

            const event = transactionReceipt.events.ListProperty;
            
            if (event) {
                const listingAddress = event.returnValues.listingAddress;
                setListingContractAddress(listingAddress);
                console.log(listingAddress);
                if (selectedImage) {
                    if (selectedImage) {
                        const imageRef = ref(storage, 'images/' + listingAddress);
                        const metadata = {
                            contentType: 'image/jpeg'
                          };
                        const uploadTask = uploadBytesResumable(imageRef, selectedImage, metadata);
                        
                        // Listen for state changes, errors, and completion of the upload.
                        uploadTask.on('state_changed',
                        (snapshot) => {
                            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log('Upload is ' + progress + '% done');
                            switch (snapshot.state) {
                                case 'paused':
                                console.log('Upload is paused');
                                break;
                                case 'running':
                                console.log('Upload is running');
                                break;
                            }
                        }, 
                        (error) => {
                            // A full list of error codes is available at
                            // https://firebase.google.com/docs/storage/web/handle-errors
                            switch (error.code) {
                                case 'storage/unauthorized':
                                // User doesn't have permission to access the object
                                break;
                                case 'storage/canceled':
                                // User canceled the upload
                                break;
                                case 'storage/unknown':
                                // Unknown error occurred, inspect error.serverResponse
                                break;
                            }
                        }, 
                        () => {
                            // Upload completed successfully, now we can get the download URL
                            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                console.log('File available at', downloadURL);
                                setDownloadURL(downloadURL);
                            });
                            }
                        );
        
                        // Include the imageUrl in your contract transaction if needed
                        setDoc(doc(db, 'properties', listingAddress), {
                            realEstateName: realEstateName,
                            targetAmount: targetAmount,
                            description: description,
                            propertyAddress: propertyAddress,
                            downloadURL : downloadURL
                        });
                    }
                }
            } else {
                console.error("ListProperty event not found in transaction receipt.");
            }
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
                        error={realEstateName > 30 || realEstateName < 1}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Address</label>
                        <Input placeholder="Enter Address"
                        id="address"
                        value={propertyAddress}
                        onChange={(e) =>
                        setPropertyAddress(e.target.value.substring(0, 120))}
                        error={propertyAddress > 500 || propertyAddress < 1}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Description</label>
                        <Input placeholder="Enter Listing Description"
                        value={description}
                        onChange={(e) =>
                        setDescription(e.target.value.substring(0, 120))
                        }
                        error={description > 500 || description < 2}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Target Amount (ETH)</label>
                        <Input label="wei" 
                        type='number'
                        placeholder="Minimum 0.1 ETH"
                        labelPosition="right"
                        value={targetAmount}
                        onChange={(e) => setTargetAmount(parseFloat(e.target.value))}
                        error={!!targetAmount || targetAmount <= 0}
                        />
                    </Form.Field>
                    <Form.Field>
                    <label>Document File</label>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    </Form.Field>
                    <Card>
                    {previewUrl && (
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="ui fluid image"
                        />
                    )}
                    </Card>
                    <Button loading ={loading} primary>List!</Button>
                    <Message error header = "Oops!" content={errorMessage} />
                </Form>
            </Layout>
        );
}
