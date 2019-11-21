import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './main/main.jsx';
import Login from './login/login.jsx';
import './App.css';

const App = () => {
  const [isLogin, setLogin] = useState(false);
  return (
    <Router>
      <Route exact path="/" component={() => <Main isLogin={isLogin} />}></Route>
      <Route path="/login" component={() => <Login isLogin={isLogin} setLogin={setLogin} />} />
    </Router>
  );
};

export default App;
