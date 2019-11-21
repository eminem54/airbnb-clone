import React from 'react';
import styled from 'styled-components';

const WrapInput = styled.div`
  background-color: white;
  z-index: 9;
  padding: 10px;
`;

const WrapInput2 = styled.div`
  width: '${props => (props.width ? props.width : '400px')}';
  height: ${props => (props.height ? props.height : '45px')};
  border: 2px solid #ebebeb;
  display: table;
  padding: 5px;
`;

const Td = styled.div`
  display: table-cell;
  vertical-align: middle;
`;

const SearchInput = styled.input`
  width: ${props => (props.width ? `${parseInt(props.width.slice(0, 3)) * 0.75}px` : '300px')};
  height: ${props => (props.height ? `${parseInt(props.height.slice(0, 3)) * 0.75}px` : '38px')};
  font-weight: 800;
  font-size: 20px;
  background-color: white;
  width: 100%;
  text-overflow: ellipsis;
  color: rgb(72, 72, 72);
  border-width: 0px;
  border-style: initial;
  border-color: initial;
  border-image: initial;
  margin: 0px;
  padding: 0px;
  outline: none;
}
`;

const SearchBar = ({ id }) => {
  return (
    <WrapInput id={id}>
      <WrapInput2>
        <Td>
          <SearchInput />
        </Td>
      </WrapInput2>
    </WrapInput>
  );
};

export default SearchBar;
