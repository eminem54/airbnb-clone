import React from 'react';
import styled from 'styled-components';
import { fetchUsingMethod } from '../Utility.js';
import address from '../serverAddress';
import { Redirect, Link } from 'react-router-dom';

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10rem auto;
`;

const MyIdInput = styled.input`
  width: 18rem;
  height: 2.5rem;
  margin-bottom: 0.3rem;
  margin-top: 0.3rem;
`;

const MyPwInput = styled.input`
  width: 18rem;
  height: 2.5rem;
  margin-bottom: 0.3rem;
`;

const LoginBtn = styled.button`
  width: 18rem;
  height: 2rem;
  margin-bottom: 0.3rem;
`;

const SignupBtn = styled.button`
  width: 18rem;
  height: 2rem;
`;

const Login = ({ isLogin, setLogin }) => {
  const clickLoginBtn = async e => {
    const id = document.getElementById('id').value;
    const pw = document.getElementById('pw').value;
    const response = await fetchUsingMethod(address + '/login', {
      methodType: 'POST',
      data: { id, pw }
    });
    if (response.status !== 200) {
      return setLogin(!isLogin);
    }
    setLogin(!isLogin);
  };

  if (isLogin) {
    return <Redirect to="/" />;
  }

  return (
    <div className="wrap-login-form">
      <LoginForm>
        <div>Login</div>
        <MyIdInput id="id" type="text" placeholder="아이디" autoFocus />
        <MyPwInput id="pw" type="password" placeholder="비밀번호" />
        <LoginBtn onClick={clickLoginBtn}>Log in</LoginBtn>
        <SignupBtn>
          <Link to="/signup">Sign up</Link>
        </SignupBtn>
      </LoginForm>
    </div>
  );
};

export default Login;
