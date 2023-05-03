import './UserStyle.css';
import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { HiEye } from 'react-icons/hi';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import { CgUserlane } from 'react-icons/cg';
import { TiUserAdd } from 'react-icons/ti';
import { MdPersonSearch } from 'react-icons/md';
import { TbLogout } from 'react-icons/tb';

function Home() {
  let navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');
  const [show, setShow] = useState(false);
  const [isBoxOpen, setIsBoxOpen] = useState(false);

  const handleIconClick = () => {
    setIsBoxOpen(!isBoxOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('email');
    navigate('/');
  };

  const handleClose = () => {
    setUserId('');
    setShow(false);
  };
  const handleShow = (id) => {
    setUserId(id);
    setShow(true);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const result = await axios.get(
        'https://64246c169e0a30d92b1b90c8.mockapi.io/api/v1/users'
      );
      console.log(result.data);
      setUsers(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(
        `https://64246c169e0a30d92b1b90c8.mockapi.io/api/v1/users/${id}`
      );
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const icon = localStorage.getItem('email').split('')[0];
  const email = localStorage.getItem('email');

  return (
    <div>
      <Navbar bg="secondary" variant="dark">
        <Container>
          <CgUserlane size={'30px'} color="#ff6219"></CgUserlane>
          <Navbar.Brand href="#home">User_Info</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Users list</Nav.Link>
          </Nav>
        </Container>

        <MdPersonSearch className="mx-2 mb-1" size={'30px'} color="white" />

        <Button
          className="mx-1 w-20"
          variant="outline-light"
          size="sm"
          onClick={() => {
            navigate('/user/add');
          }}
        >
          <TiUserAdd className="mb-1" size={'20px'} />
          Add User
        </Button>

        <div className="home-page-logout-button mx-2" onClick={handleIconClick}>
          {icon}
          {isBoxOpen && (
            <div className="home-page-logout-button-box my-2">
              <div className="home-page-logout-icon-container mt-2">
                <div className="home-page-logout-icon my-2">{icon}</div>
              </div>
              <div className="home-page-logout-email">{email}</div>
              <button
                className="home-page-box-logout-button my-4"
                onClick={handleLogout}
              >
                <TbLogout /> logout
              </button>
            </div>
          )}
        </div>
      </Navbar>

      <div className="container my-4">
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((val) => {
              return (
                <tr>
                  <td>{val.id}</td>
                  <td>{val.name}</td>
                  <td>{val.designation}</td>
                  <td>{val.phone}</td>
                  <td>
                    <Link to={`/user/details/${val.id}`}>
                      <HiEye color="blue"></HiEye>
                    </Link>
                    <Link to={`/signup/${val.id}`}>
                      <MdModeEdit className="mx-4" color="green"></MdModeEdit>
                    </Link>
                    <Link>
                      <MdDelete
                        color="red"
                        onClick={() => handleShow(val.id)}
                      />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>Are you sure you want to delete..??</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                deleteUser(userId);
                handleClose();
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Home;
