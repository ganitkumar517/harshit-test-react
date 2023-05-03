import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import SignInPage from './components/signin_page/SignInPage';
import SignUpPage from './components/signup_page/SignUpPage';
import Home from './components/user_table/Home';
import Adduser from './components/user_table/Adduser';
import Edituser from './components/user_table/Edituser';
import Viewuser from './components/user_table/Viewuser';

const PrivateRoute = (props) => {
  const token = localStorage.getItem('email');
  if (!token) {
    return <Navigate to="/" />;
  } else {
    return props.children;
  }
};

function App(props) {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<SignInPage />} />
          <Route exact path="/signup/:id?" element={<SignUpPage />} />
          <Route
            exact
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/user/add"
            element={
              <PrivateRoute>
                <Adduser />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/user/edit/:id"
            element={
              <PrivateRoute>
                <Edituser />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/user/details/:id"
            element={
              <PrivateRoute>
                <Viewuser />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
