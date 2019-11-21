import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { ButtonBase, Btn } from './buttonBase.jsx';
import { WrapModalBase, Modal } from './modalBase';
import Nouislider from 'nouislider-react';
import 'nouislider/distribute/nouislider.css';
import { formatNumber } from '../Utility';
import { FilterContext } from '../main/main.jsx';

export const MINPRICE = '20000';
export const MAXPRICE = '300000';
const MINPRICENUM = 20000;
const MAXPRICENUM = 300000;

const WrapPriceModal = styled(WrapModalBase)``;
const WrapPriceFilter = styled(Modal)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 400px;
`;

const WrapRangeSlider = styled.div`
  display: block;
  width: 80%;
`;

const WrapPriceInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const PriceInput = styled.input`
  width: 100px;
  height: 30px;
  font-size: 20px;
`;

const makePriceBtnText = ({ minPrice, maxPrice, isPriceClicked }) => {
  const checkMaxPrice = () => {
    if (maxPrice[0] !== MAXPRICE) return true;
    return false;
  };
  if (!isPriceClicked[0]) {
    if (minPrice[0] === MINPRICE) {
      return checkMaxPrice() ? `최대 ₩ ${formatNumber(maxPrice[0])}` : `가격`;
    } else {
      return checkMaxPrice()
        ? `₩ ${formatNumber(minPrice[0])} ~ ₩ ${formatNumber(maxPrice[0])}`
        : `₩ ${formatNumber(minPrice[0])}+`;
    }
  } else {
    if (minPrice[0] === MINPRICE) {
      return checkMaxPrice() ? `최대 ₩ ${formatNumber(maxPrice[0])}` : `₩ 20,000+`;
    } else {
      return checkMaxPrice()
        ? `₩ ${formatNumber(minPrice[0])} ~ ₩ ${formatNumber(maxPrice[0])}`
        : `₩ ${formatNumber(minPrice[0])}+`;
    }
  }
};

const PriceBtn = ({ minPrice, maxPrice, isPriceClicked }) => {
  const text = makePriceBtnText({ minPrice, maxPrice, isPriceClicked });
  const isAble = !isPriceClicked[0] && (minPrice[0] !== MINPRICE || maxPrice[0] !== MAXPRICE);
  return (
    <ButtonBase id={'price-btn'} able={isAble}>
      {text}
    </ButtonBase>
  );
};

const PriceFilter = ({ isPriceClicked, setIsPriceClicked }) => {
  const [slider, setSlider] = useState(null);
  const { minPrice, setMinPrice, maxPrice, setMaxPrice, filter, setFilter } = useContext(
    FilterContext
  );

  const onChangeSlide = ([left, right]) => {
    setMinPrice([left.slice(0, -3)]);
    setMaxPrice([right.slice(0, -3)]);
  };

  const clickOuterModal = e => {
    if (e.target.id === 'price-outer-modal') {
      const priceBtn = document.getElementById('price-btn');
      priceBtn.classList.remove('clicked');
      setIsPriceClicked([false]);
      if (minPrice !== MINPRICE || maxPrice !== MAXPRICE) {
        const newFilter = { ...filter };
        newFilter.minPrice = minPrice;
        newFilter.maxPrice = maxPrice;
        console.log(newFilter);
        setFilter(newFilter);
      }
    }
  };

  useEffect(() => {
    const startPrice = document.getElementById('start-price');
    startPrice.value = minPrice[0];
  }, minPrice);

  useEffect(() => {
    const endPrice = document.getElementById('end-price');
    endPrice.value = maxPrice[0];
  }, maxPrice);

  const changeByRef = e => {
    if (slider && slider.noUiSlider) {
      const startPrice = document.getElementById('start-price').value;
      const endPrice = document.getElementById('end-price').value;
      slider.noUiSlider.set([startPrice, endPrice]);
    }
  };

  const checkPriceRange = number => {
    if (number >= MINPRICENUM && number <= MAXPRICENUM) return true;
    return false;
  };
  const changeStartPrice = e => {
    changeByRef(e);
    const num = parseInt(e.target.value);
    if (!isNaN(num) && checkPriceRange(num)) {
      setMinPrice([num.toString()]);
    }
  };
  const changeEndPrice = e => {
    changeByRef(e);
    const num = parseInt(e.target.value);
    if (!isNaN(num) && checkPriceRange(num)) {
      setMaxPrice([num.toString()]);
    }
  };
  return (
    <>
      <PriceBtn minPrice={minPrice} maxPrice={maxPrice} isPriceClicked={isPriceClicked}>
        인원
      </PriceBtn>
      <WrapPriceModal id={'price-outer-modal'} onClick={clickOuterModal}>
        <WrapPriceFilter>
          <WrapRangeSlider>
            <Nouislider
              range={{ min: MINPRICENUM, max: MAXPRICENUM }}
              start={[MINPRICENUM, MAXPRICENUM]}
              onSlide={onChangeSlide}
              instanceRef={instance => {
                if (instance && !slider) {
                  setSlider(instance);
                }
              }}
              connect
            />
          </WrapRangeSlider>
          <WrapPriceInput>
            <PriceInput
              id={'start-price'}
              type={'text'}
              defaultValue={MINPRICE}
              onChange={changeStartPrice}
            />
            {'  -  '}
            <PriceInput
              id={'end-price'}
              type={'text'}
              defaultValue={MAXPRICE}
              onChange={changeEndPrice}
            />
          </WrapPriceInput>
        </WrapPriceFilter>
      </WrapPriceModal>
    </>
  );
};

export default PriceFilter;
