import React, { useState } from 'react';
import styled from 'styled-components';
import { ButtonBase } from './buttonBase.jsx';
import Calender from './calender.jsx';

const DateBtn = ({ checkout, setCheckout }) => {
  if (!checkout[0] && !checkout[1]) {
    return (
      <ButtonBase id={'date-btn'} able={checkout[1]}>
        {'날짜'}
      </ButtonBase>
    );
  } else if (checkout[0] && !checkout[1]) {
    return (
      <ButtonBase id={'date-btn'} able={checkout[1]}>{`${checkout[0].month() +
        '월 ' +
        checkout[0].date() +
        '일'}~체크아웃`}</ButtonBase>
    );
  } else {
    return (
      <ButtonBase id={'date-btn'} able={checkout[1]}>
        {`${checkout[0].month() + '월 ' + checkout[0].date() + '일'}~${checkout[1].month() +
          '월 ' +
          checkout[1].date() +
          '일'}`}
      </ButtonBase>
    );
  }
};

const DateFilter = ({ checkout, setCheckout }) => {
  return (
    <>
      <DateBtn checkout={checkout} setCheckout={setCheckout} />
      <Calender checkout={checkout} setCheckout={setCheckout} />
    </>
  );
};

export default DateFilter;
