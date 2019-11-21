import React, { useContext } from 'react';
import styled from 'styled-components';
import { formatNumber } from '../Utility';
const WrapAirbnb = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  z-index: 1;
  height: 100%;
`;

const ItemContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
`;

const WrapItem = styled.div`
  display: inline-block;
  flex-direction: row;
  margin-right: 15px;
  margin-bottom: 5px;
  max-width: 100%;
  :hover {
    outline-color: #67e2da;
    outline-style: solid;
    outline-width: 4px;
  }
`;

const ItemContent = styled.div``;

const ItemImage = styled.img`
  width: 318px;
  height: 212px;
`;

/* http://blog.tjsrms.me/css-%EB%A7%90%EC%A4%84%EC%9E%84-%EC%B2%98%EB%A6%AC%ED%95%98%EA%B8%B0/
말줄임
 */
const ItemTitle = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  width: 318px;
  overflow: hidden;
  font-size: 18px;
`;
const WrapPriceText = styled.div`
  font-weight: 800;
  font-size: 17px;
`;

const RoomCount = styled.div`
  width: 100%;
  height: 50px;
  font-size: 30px;
  padding-left: 60px;
  font-weight: 700;
`;

const item = ({ key, room }) => {
  return (
    <WrapItem key={key}>
      <ItemImage src={room.imgurl} />
      <ItemContent>
        {room.kind}
        <ItemTitle>{room.title}</ItemTitle>
        <div className="item-option">
          {`
          ${room.option1} 
          ${room.option2} 
          ${room.option3} 
          ${room.option4} 
        `}
        </div>
        <WrapPriceText>{`₩ ${formatNumber(room.price.toString())}`}</WrapPriceText>
        <div className="item-detail">
          <span>&#x2B50;</span>
          {room.star}
        </div>
      </ItemContent>
    </WrapItem>
  );
};

const Room = ({ isLogin, rooms }) => {
  if (rooms.length === 0) {
    return <div></div>;
  }

  const makeItemList = items => {
    const itemlist = [];
    items.forEach((v, i) => {
      itemlist.push(item({ key: i, room: v }));
    });
    return itemlist;
  };

  return (
    <WrapAirbnb>
      <RoomCount>{`${rooms.length}개의 숙소`}</RoomCount>
      <ItemContainer>{makeItemList(rooms)}</ItemContainer>
    </WrapAirbnb>
  );
};

export default Room;
