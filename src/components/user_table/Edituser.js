import './UserStyle.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function Edituser() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    designation: '',
    email: '',
    password: '',
    phone: '',
    address: {
      street: '',
      colony: '',
      city: '',
      zipcode: '',
      state: '',
    },
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (
      name === 'street' ||
      name === 'colony' ||
      name === 'city' ||
      name === 'zipcode' ||
      name === 'state'
    ) {
      setFormData({
        ...formData,
        address: { ...formData.address, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const result = await axios.get(
        `https://64246c169e0a30d92b1b90c8.mockapi.io/api/v1/users/${id}`
      );
      console.log(result.data);
      setFormData(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.put(
        `https://64246c169e0a30d92b1b90c8.mockapi.io/api/v1/users/${id}`,
        formData
      );
      console.log(result.data);
      navigate('/home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="input-form my-5">
      <Button
        variant="secondary"
        className="bootstrap-button-container w-25"
        onClick={() => {
          navigate('/home');
        }}
      >
        Back to Home
      </Button>
      <form className="user-form" onSubmit={handleSubmit}>
        <label className="user-label" htmlFor="name">
          Name:
        </label>
        <input
          className="user-input"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <br />
        <label className="user-label" htmlFor="designation">
          Designation:
        </label>
        <input
          className="user-input"
          type="text"
          id="designation"
          name="designation"
          value={formData.designation}
          onChange={handleInputChange}
        />
        <br />
        <label className="user-label" htmlFor="email">
          Email:
        </label>
        <input
          className="user-input"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <br />
        <label className="user-label" htmlFor="password">
          Password:
        </label>
        <input
          className="user-input"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <br />
        <label className="user-label" htmlFor="phone">
          Phone:
        </label>
        <input
          className="user-input"
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
        <br />
        <label className="user-label" htmlFor="street">
          Street:
        </label>
        <input
          className="user-input"
          type="text"
          id="street"
          name="street"
          value={formData.address.street}
          onChange={handleInputChange}
          required
        />
        <br />
        <label className="user-label" htmlFor="colony">
          Colony:
        </label>
        <input
          className="user-input"
          type="text"
          id="colony"
          name="colony"
          value={formData.address.colony}
          onChange={handleInputChange}
          required
        />
        <br />
        <label className="user-label" htmlFor="city">
          City:
        </label>
        <input
          className="user-input"
          type="text"
          id="city"
          name="city"
          value={formData.address.city}
          onChange={handleInputChange}
          required
        />
        <br />
        <label className="user-label" htmlFor="zipcode">
          Zipcode:
        </label>
        <input
          className="user-input"
          type="tel"
          id="zipcode"
          name="zipcode"
          value={formData.zipcode}
          onChange={handleInputChange}
          required
        />
        <br />
        <label className="user-label" htmlFor="state">
          State:
        </label>
        <input
          className="user-input"
          type="text"
          id="state"
          name="state"
          value={formData.address.state}
          onChange={handleInputChange}
          required
        />
        <br />
        <button className="user-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Edituser;
