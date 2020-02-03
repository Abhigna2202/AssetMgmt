import React, { useState } from 'react';
import styled from 'styled-components';
import CompanyList from '../CompanyList/CompanyList';

const ScreenContent = styled.div`
    width: 90vw;
    height:100%;
    position:center;
`;

const Input = styled.input`
    width: 10%;
    text-align: center;
    border-radius:8px;
    font-family: 'Courier New', Courier, monospace;
    border: solid 2px #048ABF;
    padding: 12px;
    margin-bottom: 10px;
`;

const Button = styled.button`
    background-color: #048ABF;
    border-radius:8px;
    border: none;
    margin-top: 5px;
    margin-bottom: 20px
    border-radius: 8px;
    width: 7%;
    height: 7%;
    font-size: 1em;
    font-weight: light;
    color: white;
`;

const Sell = () => {
  const [menuItems, setMenuItems] = useState("Sell");
  const [tempKey, setTempKey] = useState('');

  return (
    <div>
      <ScreenContent>
        <form>
        <br></br>
        <div>Select the share you want to sell</div>
        <CompanyList setTempKey = {setTempKey}/>
          <br></br>
          <div>Enter the number of units you want to sell</div>
          <Input placeholder="Enter quantity" />
          <br></br>          
          <Button onClick={() => setMenuItems('Sell')}>Sell</Button>
        </form>
      </ScreenContent>
    </div>
  );
}
export default Sell;