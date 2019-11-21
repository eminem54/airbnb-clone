import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NaviTitle = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  font-size: 2rem;
  margin-left: 5rem;
`;

const LoginBtn = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  position: relative;
  top: 0px;
  right: 30px;
  background-color: rgb(231, 75, 127);
  text-decoration: none;
  margin: 3px;
  border-radius: 5px;
  padding: 3px;
`;

const LogoutBtn = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  position: relative;
  top: 0px;
  right: 30px;
  background-color: rgb(231, 75, 127);
  text-decoration: none;
  cursor: pointer;
  margin: 3px;
  border-radius: 5px;
  padding: 3px;
`;

const WelcomeText = styled.div`
  display: ${props => (props.isLogin ? 'flex' : 'none')};
  align-items: center;
  font-size: 1.5rem;
`;

const WrapNavigator = styled.div`
  background-color: white;
  width: 100%;
  z-index: 10;
`;

const Navigators = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Navigator = ({ isLogin }) => {
  return (
    <WrapNavigator>
      <Navigators>
        <NaviTitle>
          <Link to="/">Boost Camp</Link>
        </NaviTitle>
        <WelcomeText isLogin={isLogin}>Welcome!</WelcomeText>
        {isLogin ? (
          <LogoutBtn>Log out</LogoutBtn>
        ) : (
          <LoginBtn>
            <Link to="/login">Log in</Link>
          </LoginBtn>
        )}
      </Navigators>
    </WrapNavigator>
  );
};

export default Navigator;
