import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { ButtonBase, Btn } from './buttonBase.jsx';
import { WrapModalBase, Modal } from './modalBase';
import { FilterContext } from '../main/main.jsx';

const WrapPeopleModal = styled(WrapModalBase)``;
const PeopleModal = styled(Modal)``;

const Flexdiv1 = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 20px;
  justify-contetn: center;
  align-items: center;
`;

const Flexdiv2 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  font-size: 20px;
  justify-contetn: center;
  align-items: center;
`;

const PeopleBtn = ({ adult = 0, kid = 0, baby = 0 }) => {
  let text = '';
  if (!adult && !kid && !baby) {
    text = '인원';
  }
  const big = adult + kid;
  if (adult || kid) {
    text += `성인 ${big}명,`;
  }
  if (baby) {
    text += `유아 ${baby}명,`;
  }
  if (text[text.length - 1] === ',') {
    text = text.slice(0, -1);
  }
  return (
    <ButtonBase id={'people-btn'} able={text === '인원' ? null : true}>
      {text}
    </ButtonBase>
  );
};

const PeopleFilter = () => {
  // const [adult, setAdult] = useState(0);
  // const [kid, setKid] = useState(0);
  const [baby, setBaby] = useState(0);
  const { adult, setAdult, kid, setKid, filter, setFilter } = useContext(FilterContext);
  const plusAdultBtn = e => {
    setAdult(adult + 1);
  };
  const minusAdultBtn = e => {
    if (adult <= 0) {
      return e;
    }
    if (adult - 1 === 0 && (kid !== 0 || baby !== 0)) {
      return e;
    }
    setAdult(adult - 1);
  };
  const plusKidBtn = e => {
    if (adult === 0) {
      setAdult(1);
    }
    setKid(kid + 1);
  };
  const minusKidBtn = e => {
    if (kid <= 0) {
      return e;
    }
    setKid(kid - 1);
  };
  const plusBabyBtn = e => {
    if (adult === 0) {
      setAdult(1);
    }
    setBaby(baby + 1);
  };
  const minusBabyBtn = e => {
    if (baby <= 0) {
      return e;
    }
    setBaby(baby - 1);
  };

  useEffect(() => {});

  const clickOuterModal = e => {
    if (e.target.id === 'people-outer-modal') {
      const dateBtn = document.getElementById('people-btn');
      dateBtn.classList.remove('clicked');
      if (adult !== 0) {
        const newFilter = { ...filter };
        newFilter.adult = adult;
        newFilter.kid = kid;
        setFilter(newFilter);
      }
    }
  };
  return (
    <>
      <PeopleBtn adult={adult} kid={kid} baby={baby}>
        인원
      </PeopleBtn>
      <WrapPeopleModal id="people-outer-modal" onClick={clickOuterModal}>
        <PeopleModal>
          <Flexdiv1>
            <Flexdiv2>
              <span>성인</span>
              <span>
                <Btn onClick={minusAdultBtn}>-</Btn>
              </span>
              <span>
                <div>{`${adult}명`}</div>
              </span>
              <span>
                <Btn onClick={plusAdultBtn}>+</Btn>
              </span>
            </Flexdiv2>
            <Flexdiv2>
              <span>어린이</span>
              <span>
                <Btn onClick={minusKidBtn}>-</Btn>
              </span>
              <span>
                <div>{`${kid}명`}</div>
              </span>
              <span>
                <Btn onClick={plusKidBtn}>+</Btn>
              </span>
            </Flexdiv2>
            <Flexdiv2>
              <span>어린이</span>
              <span>
                <Btn onClick={minusBabyBtn}>-</Btn>
              </span>
              <span>
                <div>{`${baby}명`}</div>
              </span>
              <span>
                <Btn onClick={plusBabyBtn}>+</Btn>
              </span>
            </Flexdiv2>
            <Flexdiv2></Flexdiv2>
          </Flexdiv1>
        </PeopleModal>
      </WrapPeopleModal>
    </>
  );
};

export default PeopleFilter;
