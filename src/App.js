import React, { useState, useEffect } from 'react';
import PropertyForm from './Forms/PropertyForm';
import './HomePage.css';

const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showListingForm, setShowListingForm] = useState(false);

  useEffect(() => {
    // Retrieve properties from local storage when the component mounts
    const storedProperties = localStorage.getItem('properties');
    if (storedProperties) {
      setProperties(JSON.parse(storedProperties));
    }
  }, []);

  useEffect(() => {
    // Update local storage when properties state changes
    localStorage.setItem('properties', JSON.stringify(properties));
  }, [properties]);

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
    setShowForm(true);
  };

  const handleFormSubmit = (tokens) => {
    // Perform logic to handle user's token pledge
    console.log(`User wants to buy ${tokens} tokens of property ${selectedProperty.realEstateName}`);
    setShowForm(false);
  };

  const handleListingFormClick = () => {
    setShowListingForm(true);
  };

  const handleListingFormSubmit = (property) => {
    setProperties([...properties, property]);
    setShowListingForm(false);
  };

  const renderProperties = () => {
    if (properties.length === 0) {
      return <p>No properties listed.</p>;
    }

    return (
      <ul>
        {properties.map((property, index) => (
          <li key={index} onClick={() => handlePropertyClick(property)}>
            <strong>{property.realEstateName}</strong>
            <p>Token Price: {property.tokenPrice}</p>
            <p>Total Tokens: {property.totalTokens}</p>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className='home-page'>
      <h2>Properties for Investment</h2>
      {renderProperties()}
      <button onClick={handleListingFormClick}>List a Property</button>
      {showListingForm && (
        <PropertyForm
          onSubmit={handleListingFormSubmit}
          onCancel={() => setShowListingForm(false)}
        />
      )}
      {showForm && selectedProperty && (
        <PropertyForm
          property={selectedProperty}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default HomePage;
