import { gql } from 'apollo-boost';

export const roomsQuery = gql`
  {
    rooms {
      kind
      price
      title
      imgurl
      option1
      option2
      option3
      option4
      star
    }
  }
`;

export const roomsbypriceQuery = ({ minPrice, maxPrice }) => {
  return gql`
    {
      roomsbyprice (startPrice: "${minPrice[0]}", endPrice: "${maxPrice[0]}") {
        kind
        price
        title
        imgurl
        option1
        option2
        option3
        option4
        star
      }
    }
  `;
};

export const roomsbypeopleQuery = ({ guest }) => {
  return gql`
    {
      roomsbypeople (guest: "${guest}") {
        kind
        price
        title
        imgurl
        option1
        option2
        option3
        option4
        star
      }
    }
  `;
};

export const roomsbydateQuery = ({ startDate, finishDate }) => {
  return gql`
    {
      roomsbydate (startDate: "${startDate}", finishDate: "${finishDate}") {
        kind
        price
        title
        imgurl
        option1
        option2
        option3
        option4
        star
      }
    }
  `;
};

export const roomsbypeopleandpriceQuery = ({ guest, minPrice, maxPrice }) => {
  return gql`
    {
      roomsbypeopleandprice (guest: "${guest}" startPrice: "${minPrice[0]}", endPrice: "${
    maxPrice[0]
  }") {
        kind
        price
        title
        imgurl
        option1
        option2
        option3
        option4
        star
      }
    }
  `;
};

export const roomsbydateandpeopleQuery = ({ startDate, finishDate, guest }) => {
  return gql`
    {
      roomsbydateandpeople (guest: "${guest}", startDate: "${startDate}", finishDate: "${finishDate}") {
        kind
        price
        title
        imgurl
        option1
        option2
        option3
        option4
        star
      }
    }
  `;
};

export const roomsbydateandpriceQuery = ({ startDate, finishDate, minPrice, maxPrice }) => {
  return gql`
    {
      roomsbydateandprice (startPrice: "${minPrice[0]}", endPrice: "${
    maxPrice[0]
  }", startDate: "${startDate}", finishDate: "${finishDate}") {
        kind
        price
        title
        imgurl
        option1
        option2
        option3
        option4
        star
      }
    }
  `;
};

export const roomsbydateandpeopleandpriceQuery = ({
  guest,
  startDate,
  finishDate,
  minPrice,
  maxPrice
}) => {
  return gql`
    {
      roomsbydateandpeopleandprice (guest: "${guest}", startPrice: "${minPrice[0]}", endPrice: "${
    maxPrice[0]
  }", startDate: "${startDate}", finishDate: "${finishDate}") {
        kind
        price
        title
        imgurl
        option1
        option2
        option3
        option4
        star
      }
    }
  `;
};
