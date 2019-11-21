import styled from 'styled-components';

const WrapModalBase = styled.div`
  position: absolute;
  width: 100%;
  height: 500%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
`;

const Modal = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  background-color: white;
  left: 20px;
  top: 190px;
`;

export { WrapModalBase, Modal };
