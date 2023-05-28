//import logo from "./logo.svg";
//import web3 from '../web3';
import React, { useState } from 'react';
import './PropertyForm.css'; // Import the CSS file
import db from '../firebase/firebase';
//import { ModalContext } from "../context/ModalContext";
//import { AccountContext } from "../context/AccountContext";

const PropertyForm = ({ onSubmit, onCancel }) => {
  const [realEstateName, setRealEstateName] = useState('');
  const [tokenPrice, setTokenPrice] = useState(0);
  const [totalTokens, setTotalTokens] = useState(0);
  const [delistDate, setDelistDate] = useState('');
  const [imageFile, setImageFile] = useState(null);
  //const popup = React.useContext(ModalContext);
  //const [account, _] = React.useContext(AccountContext);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  //when form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();
    /*if (!account) {
      popup("Please connect wallet first");
      return;
    }
    const accounts = web3.eth.getAccounts();*/

    // Create a new property document in Firestore
    db.collection('properties')
      .add({
        realEstateName,
        tokenPrice,
        totalTokens,
        delistDate,
      })
      .then((docRef) => {
        console.log('Property added with ID:', docRef.id);

        if (imageFile) {
          // Upload the image file to storage
          const storageRef = db.storage().ref();
          const imageRef = storageRef.child(`images/${docRef.id}`);
          imageRef.put(imageFile).then(() => {
            console.log('Image uploaded successfully');
            onSubmit(); // Call the parent component's onSubmit function
          });
        } else {
          onSubmit();
        }
      })
      .catch((error) => {
        console.error('Error adding property:', error);
      });
  };

  return (
    <div>
      <h3>List a Property</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Real Estate Name:
          <input
            type="text"
            value={realEstateName}
            onChange={(e) => setRealEstateName(e.target.value)}
          />
        </label>
        <label>
          Token Price:
          <input
            type="number"
            value={tokenPrice}
            onChange={(e) => setTokenPrice(parseFloat(e.target.value))}
          />
        </label>
        <label>
          Total Tokens:
          <input
            type="number"
            value={totalTokens}
            onChange={(e) => setTotalTokens(parseInt(e.target.value))}
          />
        </label>
        <label>
          Delist Date:
          <input
            type="date"
            value={delistDate}
            onChange={(e) => setDelistDate(e.target.value)}
          />
        </label>
        <label>
          Image:
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
        <button type="submit">Submit</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default PropertyForm;
