import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { WrapModalBase, Modal } from './modalBase';
import { Btn } from './buttonBase.jsx';
import { FilterContext } from '../main/main.jsx';

/* 
1. 캐러셀을 만든다.
  1.트랜지션을 써야한다.
2. 트릭을 쓴다.
  1. 무슨트릭이 있을까.
    1. 상태변수 [start, end]를 이용해서 start가 있다면 달력이동시에 start 
*/

const WrapDateModal = styled(WrapModalBase)``;

const WrapCalender = styled(Modal)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 400px;
`;

const WrapTitle = styled.div`
  dispaly: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CalenderTitle = styled.div`
  display: inline-flex;
  font-size: 25px;
`;
const TABLE = styled.table`
  border-collapse: collapse;
  :hover {
    cursor: pointer;
  }
`;

const DayCell = styled.th`
  width: 50px;
  height: 30px;
  padding-top: 9px;
`;
const AvailableTD = styled.td`
  width: 50px;
  height: 30px;
  text-align: center;
  border: 1px solid #e3e7e7;

  :hover {
    background-color: #dfdfdf;
  }

  &.clicked {
    background-color: #018489;
    :hover {
      background-color: #018489;
    }
  }

  &.selected {
    background-color: #67e2da;
    :hover {
      background-color: #67e2da;
    }
  }

  &.unavailable {
    cursor: initial;
    background-color: #ffffff;
    color: rgba(0, 0, 0, 0.5);
    :hover {
      background-color: #ffffff;
    }
  }
`;

const SelectedTd = styled.td`
  width: 50px;
  height: 30px;
  text-align: center;
  border: 1px solid grey;
  cursor: initial;
  background-color: #67e2da;
  :hover {
    background-color: #67e2da;
  }
`;
const BlankTD = styled.td`
  width: 50px;
  height: 30px;
`;

const MakeWeekdayshortname = () => {
  return moment.weekdaysShort().map(day => {
    return (
      <DayCell key={day} className="week-day">
        {day}
      </DayCell>
    );
  });
};

const getfirstDayOfMonth = dateObject => {
  return moment(dateObject)
    .startOf('month')
    .format('d');
};

const makeBlanks = dateObject => {
  let blanks = [];
  for (let i = 0; i < getfirstDayOfMonth(dateObject); i++) {
    blanks.push(<BlankTD className="calendar-day empty">{''}</BlankTD>);
  }
  return blanks;
};

const isSameDate = (moment1, moment2) => {
  const year = moment1.isSame(moment2, 'year');
  const month = moment1.isSame(moment2, 'month');
  const date = moment1.isSame(moment2, 'date');
  return year && month && date;
};

const makeAvailableDay = (dateObject, checkout) => {
  let daysInMonth = [];
  const compareMoment = moment();
  for (let d = 1; d <= dateObject.daysInMonth(); d++) {
    compareMoment.set('year', dateObject.year());
    compareMoment.set('month', dateObject.month());
    compareMoment.set('date', d);
    if (moment().isAfter(compareMoment)) {
      daysInMonth.push(
        <AvailableTD key={d} className="calendar-day unavailable">
          {d}
        </AvailableTD>
      );
      continue;
    }

    if (checkout[0] && !checkout[1]) {
      if (isSameDate(compareMoment, checkout[0])) {
        daysInMonth.push(
          <AvailableTD key={d} className="calendar-day clicked">
            {d}
          </AvailableTD>
        );
        continue;
      }
    }

    if (checkout[1]) {
      if (isSameDate(compareMoment, checkout[0]) || isSameDate(compareMoment, checkout[1])) {
        daysInMonth.push(
          <AvailableTD key={d} className="calendar-day clicked">
            {d}
          </AvailableTD>
        );
        continue;
      }
      if (compareMoment.isAfter(checkout[0]) && compareMoment.isBefore(checkout[1])) {
        daysInMonth.push(
          <AvailableTD key={d} className="calendar-day selected">
            {d}
          </AvailableTD>
        );
        continue;
      }
    }
    daysInMonth.push(
      <AvailableTD key={d} className="calendar-day">
        {d}
      </AvailableTD>
    );
  }
  return daysInMonth;
};

const makeDayTd = totalSlots => {
  const rows = [];
  let cells = [];

  totalSlots.forEach((row, i) => {
    if (i % 7 !== 0) {
      cells.push(row);
    } else {
      rows.push(cells);
      cells = [];
      cells.push(row);
    }
    if (i === totalSlots.length - 1) {
      rows.push(cells);
    }
  });

  let daysinmonth = rows.map((d, i) => {
    return <tr>{d}</tr>;
  });
  return daysinmonth;
};

function removeClassFromTable(tableId, className) {
  const table = document.getElementById(tableId);
  table.childNodes.forEach(tr => {
    if (tr.tagName === 'TH') return;
    tr.childNodes.forEach(td => {
      if (td.classList.contains(className)) {
        td.classList.remove(className);
      }
    });
  });
}

const Calender = () => {
  const [dateObject, setDateObject] = useState(moment());
  const { checkout, setCheckout, filter, setFilter } = useContext(FilterContext);
  const totalSlots = [...makeBlanks(dateObject), ...makeAvailableDay(dateObject, checkout)];
  const [calCheckout, setCalCheckout] = useState(checkout);

  const logicInClickButton = step => {
    removeClassFromTable('calender-table', 'clicked');
    removeClassFromTable('calender-table', 'selected');
    dateObject.add(step, 'month');
    const clone = dateObject.clone();
    setDateObject(clone);
  };
  const clickLeftButton = e => {
    logicInClickButton('-1', e);
  };
  const clickRightButton = e => {
    logicInClickButton('1', e);
  };

  useEffect(() => {}, dateObject);
  useEffect(() => {}, calCheckout);

  const clickTableEvent = e => {
    const setMomentToCheckout = () => {
      e.target.classList.add('clicked');
      const checkoutMoment = dateObject.clone();
      checkoutMoment.set('date', e.target.innerHTML);
      return checkoutMoment;
    };
    if (!e.target.tagName === 'TD') {
      return e;
    }
    if (e.target.classList.contains('unavailable')) {
      return e;
    }

    if (e.target.classList.contains('clicked')) {
    } else {
      if (checkout[0]) {
        setCheckout([checkout[0], setMomentToCheckout()]);
      } else {
        setCheckout([setMomentToCheckout(), null]);
      }
    }
  };

  const clickOuterModal = e => {
    if (e.target.id === 'date-outer-modal') {
      const dateBtn = document.getElementById('date-btn');
      dateBtn.classList.remove('clicked');
      if (checkout[0] && checkout[1]) {
        const newFilter = { ...filter };
        newFilter.checkout = checkout;
        setFilter(newFilter);
      }
    }
  };

  return (
    <WrapDateModal id={'date-outer-modal'} onClick={clickOuterModal}>
      <WrapCalender id={'inner-modal'}>
        <WrapTitle>
          <Btn id={'left-btn'} onClick={clickLeftButton}>
            {'<'}
          </Btn>
          <CalenderTitle>
            {dateObject.year()} {moment.months(dateObject.month())}
          </CalenderTitle>
          <Btn id={'right-btn'} onClick={clickRightButton}>
            {'>'}
          </Btn>
        </WrapTitle>

        <TABLE id={'calender-table'} onClick={clickTableEvent}>
          {MakeWeekdayshortname()}
          {makeDayTd(totalSlots)}
        </TABLE>
      </WrapCalender>
    </WrapDateModal>
  );
};

export default Calender;
