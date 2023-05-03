import './UserStyle.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';

function Viewuser() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({
    id: '',
    name: '',
    designation: '',
    email: '',
    phone: '',
    address: {
      street: '',
      colony: '',
      city: '',
      zipcode: '',
      state: '',
    },
  });

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const result = await axios.get(
        `https://64246c169e0a30d92b1b90c8.mockapi.io/api/v1/users/${id}`
      );
      console.log(result.data);
      setUser(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container
      className="square bg-#9A616D rounded view-page-container mt-5 px-4 py-4"
      style={{
        width: '675px',
        height: '375px',
        background: 'rgb(50, 42, 79)',
      }}
    >
      <div className="view-data-container">
        <div className="view-list-container">
          <div className="list-container my-3" style={{ background: 'white' }}>
            <ul className="view-user-list my-4">
              <li className="list-items">
                User Id: <span className="user-span">{id}</span>
              </li>
              <li className="list-items">
                Name: <span className="user-span">{user.name}</span>
              </li>
              <li className="list-items">
                Designation:{' '}
                <span className="user-span">{user.designation}</span>
              </li>
              <li className="list-items">
                Email: <span className="user-span">{user.email}</span>
              </li>
              <li className="list-items">
                Phone: <span className="user-span">{user.phone}</span>
              </li>
              <li className="list-items">
                Address:{' '}
                <span className="user-span">{`${user.address.street}, ${user.address.colony}, ${user.address.city}, ${user.address.zipcode}, ${user.address.state}`}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="view-page-button">
          <Button
            variant="secondary"
            className="w-20"
            onClick={() => {
              navigate('/home');
            }}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </Container>
  );
}
export default Viewuser;
