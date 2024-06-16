import React, { useState } from 'react';

const PropertyForm = () => {
  const [propertyData, setPropertyData] = useState({
    id: '',
    title: '',
    img: '',
    bedroom: 0,
    bathroom: 0,
    price: 0,
    address: '',
    latitude: 0,
    longitude: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData({ ...propertyData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/add-flat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(propertyData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit data');
      }

      console.log('Data submitted successfully!');
      // Optionally, handle success UI or redirect
    } catch (error) {
      console.error('Error submitting data:', error);
      // Handle error state or show error message
    }

    // Reset form fields after submission
    setPropertyData({
      id: '',
      title: '',
      img: '',
      bedroom: 0,
      bathroom: 0,
      price: 0,
      address: '',
      latitude: 0,
      longitude: 0,
    });
  };

  return (
    <div>
      <h2>Property Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID:</label>
          <input
            type="text"
            name="id"
            value={propertyData.id}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={propertyData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="img"
            value={propertyData.img}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Bedrooms:</label>
          <input
            type="number"
            name="bedroom"
            value={propertyData.bedroom}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Bathrooms:</label>
          <input
            type="number"
            name="bathroom"
            value={propertyData.bathroom}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={propertyData.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={propertyData.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Latitude:</label>
          <input
            type="number"
            name="latitude"
            value={propertyData.latitude}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input
            type="number"
            name="longitude"
            value={propertyData.longitude}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PropertyForm;
