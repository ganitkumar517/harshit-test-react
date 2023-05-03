import React, { useState } from 'react';
import './SignInStyle.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CgUserlane } from 'react-icons/cg';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SigninPage() {
  let navigate = useNavigate();
  // const onSubmit = () => {
  //   localStorage.setItem('email', 'harshipatidar32@gmail.com');
  //   navigate('/home');
  // };

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    let userId = 0;
    if (loginEmail === 'harshipatidar32@gmail.com') {
      userId = 1;
      setError('');
    } else if (loginEmail === 'ayushipatidar33@gmail.com') {
      userId = 2;
      setError('');
    } else if (loginEmail === 'badalpatidar210@gmail.com') {
      userId = 3;
      setError('');
    } else {
      userId = '';
      setError('Enter a valid email');
    }
    console.log(userId);

    if (userId) {
      try {
        const result = await axios.get(
          `https://64246c169e0a30d92b1b90c8.mockapi.io/api/v1/users/${userId}`
        );
        console.log(result.data);
        if (
          result.data.email === loginEmail &&
          result.data.password === loginPassword
        ) {
          localStorage.setItem('email', loginEmail);
          setLoginEmail('');
          navigate('/home');
          setError('');
        } else {
          setError('Incorrect Password');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Container
      className="square bg-#9A616D rounded py-5 px-5"
      style={{
        width: '850px',
        height: '660px',
        background: '#9A616D',
      }}
    >
      <Container
        className="loginpage-card"
        style={{
          width: '100%',
          height: '100%',
          background: 'white',
        }}
      >
        <Row>
          <Col
            sm={5}
            className="loginpage-image-container"
            style={{
              height: '480px',
            }}
          ></Col>
          <Col
            sm={7}
            style={{
              height: '527px',
              // background: 'violet',
              padding: '50px',
            }}
          >
            <Row
              style={{
                height: '50px',
                // background: 'white',
              }}
            >
              <Col sm={2}>
                <CgUserlane size={'50px'} color="#ff6219"></CgUserlane>
              </Col>
              <Col sm={10}>
                <h1>User_Info</h1>
              </Col>
            </Row>
            <Row
              className="my-4 mb-4"
              style={{
                height: '40px',
                // background: 'gray',
              }}
            >
              <Col>
                <h5 className="my-1">Sign into your account</h5>
              </Col>
            </Row>
            <Row
              className="mb-2"
              style={{
                height: '170px',
                // background: 'yellow',
              }}
            >
              <Col>
                <Form className="my-2">
                  <Form.Control
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="Enter email"
                  />

                  <Form.Control
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Password"
                    className="my-3"
                  />
                  <Button
                    variant="dark"
                    style={{ width: '100%' }}
                    onClick={handleSignIn}
                    //onClick={onSubmit}
                  >
                    Login
                  </Button>
                  {error && <p className="loginpage-error">{error}</p>}
                </Form>
              </Col>
            </Row>
            <Row
              className="my-1"
              style={
                {
                  // background: 'green',
                }
              }
            >
              <Col>Forgot password?</Col>
            </Row>
            <Row
              className="my-1 mb-25"
              style={{
                // background: 'white',
                height: '30px',
                color: 'blue',
              }}
            >
              <Col>
                Don't have an account?{' '}
                <Link to={`/signup`}>
                  <a href="#!">Register here</a>
                </Link>
              </Col>
            </Row>
            <Row
              className="login-footer mt-5"
              style={{
                // background: 'white',
                height: '22px',
              }}
            >
              Terms of use. Privacy policy
            </Row>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default SigninPage;
