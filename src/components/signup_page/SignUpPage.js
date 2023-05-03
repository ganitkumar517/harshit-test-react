import './SignUpStyle.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

function SignupPage() {
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
    if (id) {
      console.log('id', id);
      getUsers();
    }
  }, [id]);

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
      if (id) {
        const result = await axios.put(
          `https://64246c169e0a30d92b1b90c8.mockapi.io/api/v1/users/${id}`,
          formData
        );
        console.log(result.data);
        navigate('/home');
      } else {
        const result = await axios.post(
          'https://64246c169e0a30d92b1b90c8.mockapi.io/api/v1/users',
          formData
        );
        console.log(result.data);
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const token = localStorage.getItem('email');
  if (token && !id) {
    return <Navigate to="/home" />;
  }

  // const handleSubmit = async () => {
  //   //event.preventDefault();
  //   try {
  //     const result = await axios.post(
  //       'https://64246c169e0a30d92b1b90c8.mockapi.io/api/v1/users',
  //       formData
  //     );
  //     console.log(result.data);
  //     navigate('/');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <Container
      className="square bg-dark rounded-top signupPage-container py-5 px-4 mt-5"
      style={{ width: '875px', height: '850px' }}
    >
      <Container
        className="square bg-white rounded signupPage-card"
        style={{ width: '100%', height: '100%' }}
      >
        <Row>
          <Col className="square bg-primary rounded-start signupPage-image-container"></Col>
          <Col className="py-5 px-5">
            <Form onSubmit={handleSubmit}>
              <Row>
                <h3>USER REGISTRATION FORM</h3>
              </Row>
              <Row className="signupPage-row mt-4">
                <Col>
                  <Form.Control
                    className="my-2"
                    width={'100%'}
                    type="text"
                    placeholder="Full Name"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </Col>
                <Col>
                  <Form.Control
                    className="my-2"
                    width={'100%'}
                    type="text"
                    placeholder="Designation"
                    id="designation"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                  />
                </Col>
              </Row>
              <Row className="signupPage-row mt-4">
                <Col>
                  <Form.Control
                    className="my-2"
                    type="email"
                    placeholder="Enter email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </Col>
              </Row>
              <Row className="signupPage-row mt-4">
                <Col>
                  <Form.Control
                    className="my-2"
                    type="password"
                    placeholder="Password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </Col>
              </Row>
              <Row className="signupPage-row mt-4">
                <Col>
                  <Form.Control
                    className="my-2"
                    type="text"
                    placeholder="House no,/Street no./Landmark"
                    id="street"
                    name="street"
                    value={formData.address.street}
                    onChange={handleInputChange}
                    required
                  />
                </Col>
              </Row>
              <Row className="signupPage-row mt-4">
                <Col>
                  <Form.Control
                    className="my-2"
                    type="text"
                    placeholder="Colony / Sector"
                    id="colony"
                    name="colony"
                    value={formData.address.colony}
                    onChange={handleInputChange}
                    required
                  />
                </Col>
              </Row>
              <Row className="signupPage-row mt-3">
                <Col>
                  <Form.Control
                    className="my-2"
                    width={'100%'}
                    type="text"
                    placeholder="City"
                    id="city"
                    name="city"
                    value={formData.address.city}
                    onChange={handleInputChange}
                    required
                  />
                </Col>
                <Col>
                  <Form.Control
                    className="my-2"
                    width={'100%'}
                    type="text"
                    placeholder="State"
                    id="state"
                    name="state"
                    value={formData.address.state}
                    onChange={handleInputChange}
                    required
                  />
                </Col>
              </Row>
              <Row className="signupPage-row mt-3 mb-5">
                <Col>
                  <Form.Control
                    className="my-2"
                    width={'100%'}
                    type="tel"
                    placeholder="Zipcode"
                    id="zipcode"
                    name="zipcode"
                    value={formData.zipcode}
                    onChange={handleInputChange}
                    required
                  />
                </Col>
                <Col>
                  <Form.Control
                    className="my-2"
                    width={'100%'}
                    type="tel"
                    placeholder="Phone"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </Col>
              </Row>
              <Row className="mb-5">
                <Col></Col>
                <Col lg={5}>
                  <Button
                    type="submit"
                    variant="warning"
                    color="white"
                    className="signupPage-submit-button mb-5 ml-5"
                    onSubmit={handleSubmit}
                  >
                    SUBMIT FORM
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default SignupPage;
