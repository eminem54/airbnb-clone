import React, { useEffect, useState } from 'react';
import Room from '../room/room.jsx';
import SearchBar from '../searchBar/searchBar.jsx';
import SearchFilter from '../searchFilter/searchFilter.jsx';
import styled from 'styled-components';
import Navigator from '../navigator/navigator.jsx';
import { fetchQuery } from '../Apollo';
import { MINPRICE, MAXPRICE } from '../searchFilter/priceFilter.jsx';
import * as Query from './filterQuery';

const WrapMain = styled.div``;

const WrapFixedNavigator = styled.div`
  position: sticky;
  top: 0;
`;

export const FilterContext = React.createContext();

const Main = ({ isLogin }) => {
  const [rooms, setRooms] = useState([]);
  const [checkout, setCheckout] = useState([null, null]);

  const [minPrice, setMinPrice] = useState([MINPRICE]);
  const [maxPrice, setMaxPrice] = useState([MAXPRICE]);
  const [adult, setAdult] = useState(0);
  const [kid, setKid] = useState(0);

  const [filter, setFilter] = useState({ checkout, minPrice, maxPrice, adult, kid });
  const isAbleDate = () => checkout[0] && checkout[1];
  const isAblePeople = () => adult !== 0;
  const isAblePrice = () => minPrice[0] !== MINPRICE || maxPrice[0] !== MAXPRICE;
  useEffect(() => {
    if (isAbleDate()) {
      if (isAblePeople()) {
        if (isAblePrice()) {
          fetchQuery(
            Query.roomsbydateandpeopleandpriceQuery({
              guest: adult + kid,
              startDate: checkout[0].toISOString().slice(0, 10),
              finishDate: checkout[1].toISOString().slice(0, 10),
              minPrice,
              maxPrice
            })
          ).then(data => setRooms(data.roomsbydateandpeopleandprice));
        } else {
          fetchQuery(
            Query.roomsbydateandpeopleQuery({
              guest: adult + kid,
              startDate: checkout[0].toISOString().slice(0, 10),
              finishDate: checkout[1].toISOString().slice(0, 10)
            })
          ).then(data => setRooms(data.roomsbydateandpeople));
        }
      } else {
        if (isAblePrice()) {
          fetchQuery(
            Query.roomsbydateandpriceQuery({
              startDate: checkout[0].toISOString().slice(0, 10),
              finishDate: checkout[1].toISOString().slice(0, 10),
              minPrice,
              maxPrice
            })
          ).then(data => setRooms(data.roomsbydateandprice));
        } else {
          fetchQuery(
            Query.roomsbydateQuery({
              startDate: checkout[0].toISOString().slice(0, 10),
              finishDate: checkout[1].toISOString().slice(0, 10)
            })
          ).then(data => setRooms(data.roomsbydate));
        }
      }
    } else {
      if (isAblePeople()) {
        if (isAblePrice()) {
          fetchQuery(
            Query.roomsbypeopleandpriceQuery({ guest: adult + kid, minPrice, maxPrice })
          ).then(data => setRooms(data.roomsbypeopleandprice));
        } else {
          fetchQuery(Query.roomsbypeopleQuery({ guest: adult + kid })).then(data =>
            setRooms(data.roomsbypeople)
          );
        }
      } else {
        if (isAblePrice()) {
          fetchQuery(Query.roomsbypriceQuery({ minPrice, maxPrice })).then(data =>
            setRooms(data.roomsbyprice)
          );
        } else {
          //
        }
      }
    }
  }, [filter]);
  useEffect(() => {
    fetchQuery(Query.roomsQuery).then(data => setRooms(data.rooms));
  }, rooms);

  return (
    <FilterContext.Provider
      value={{
        checkout,
        setCheckout,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        adult,
        setAdult,
        kid,
        setKid,
        filter,
        setFilter
      }}
    >
      <WrapMain>
        <WrapFixedNavigator>
          <Navigator isLogin={isLogin} />
          <SearchBar id={'main-search-bar'} />
          <SearchFilter checkout={checkout} setCheckout={setCheckout} />
        </WrapFixedNavigator>
        <Room rooms={rooms} />
      </WrapMain>
    </FilterContext.Provider>
  );
};

export default Main;
