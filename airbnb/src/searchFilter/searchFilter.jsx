import React, { useState } from 'react';
import styled from 'styled-components';
import DateFilter from './dateFilter.jsx';
import PeopleFilter from './peopleFilter.jsx';
import PriceFilter from './priceFilter.jsx';
import { removeClassFromNodeList } from '../Utility';
const SplitLine = styled.div`
  border-bottom: 1px solid black;
`;

const WrapFilter = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  padding: 10px 20px;
  z-index: 8;
  background-color: white;
`;

const SearchFilter = ({ checkout, setCheckout }) => {
  const [isPriceClicked, setIsPriceClicked] = useState([false]);

  const toggleSelectedChild = e => {
    if (e.target.tagName === 'BUTTON') {
      if (e.target.classList.contains('clicked')) {
        e.target.classList.remove('clicked');
        if (e.target.id === 'price-btn') {
          setIsPriceClicked([false]);
        }
      } else {
        removeClassFromNodeList(e.target.parentNode.childNodes, 'clicked');
        e.target.classList.add('clicked');
        if (e.target.id === 'price-btn') {
          setIsPriceClicked([true]);
        }
      }
    }
  };

  return (
    <>
      <SplitLine />
      <WrapFilter onClick={toggleSelectedChild}>
        <DateFilter checkout={checkout} setCheckout={setCheckout}></DateFilter>
        <PeopleFilter></PeopleFilter>
        <PriceFilter
          isPriceClicked={isPriceClicked}
          setIsPriceClicked={setIsPriceClicked}
        ></PriceFilter>
      </WrapFilter>
      <SplitLine />
    </>
  );
};

export default SearchFilter;
