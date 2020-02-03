import React, { useState, SetStateAction, Dispatch, useEffect } from 'react';
import { Jumbotron, Alert, Button, Col, Row, SplitButton } from 'react-bootstrap';
import styled from 'styled-components';
import Buy from './Buy';
import Sell from './Sell';

const ScreenContent = styled.div`
    width: 90vw;
    height:100%;
    position : center;
`;

const StyledButton = styled(Button)`
    width: 20%;
    height: 50%;
    background-color: skyblue;
    border: none;
    padding: 10px 10px 10px 10px;
    border-radius:5px;
    font-size: large;
    position : top;
    `;

type menuMapType = {
  [key: string]: React.FC
}

const Invest = () => {
  const [menuItems, setMenuItems] = useState("Buy");

  const menuMap: menuMapType = {
    "Buy": Buy,
    "Sell": Sell,
  }
  const SelectedComponent = menuMap[menuItems];
  return (
    <div>
        <StyledButton onClick={() => setMenuItems('Buy')}>Buy</StyledButton>
        <StyledButton onClick={() => setMenuItems('Sell')}>Sell</StyledButton>
      <ScreenContent>
        <SelectedComponent></SelectedComponent>
      </ScreenContent>
    </div>
  );
}
export default Invest;