import styled from 'styled-components';

export const ButtonBase = styled.button`
  display: inline-flex;
  padding: 5px 15px;
  border-radius: 0.3rem;
  font-size: 17px;
  margin: 0 10px;
  background-color: ${props => (props.able ? '#018489' : 'transparent')};
  color: ${props => (props.able ? 'white' : 'black')};
  outline: none;

  &.clicked {
    background-color: #018489;
    color: white;
    :hover {
      background-color: #018489;
      color: white;
    }
  }

  :hover {
    background-color: #dfdfdf;
  }

  + div {
    display: none;
  }

  &.clicked + div {
    display: initial;
  }
`;

export const Btn = styled.div`
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 1rem;
  font-size: 30px;
  text-align: center;
  cursor: pointer;
`;
