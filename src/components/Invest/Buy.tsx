import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CompanyList from '../CompanyList/CompanyList';
import {
  getAccountBalance,
  getAssetPrice,
  getNumberOfSharesInvested,
  createInvestmentAccount,
  getContractBalance,
  buyAssets,
  getConAddressOfInvestmentAccount
} from '../../actions/Query/AssetManagement';

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

export default () => {
  const [tempKey, setTempKey] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [queryPrice, setQueryPrice] = useState('');
  const [error, setError] = useState('');
  const [price, setPrice] = useState(0.0);
  const [amount, setAmount] = useState('0');
  const [noOfShares, setNoOfShares] = useState(0.0);
  const [conAddr, setConAddr] = useState('')

  useEffect(() => {
    if (tempKey !== '') {

      getAccountBalance().then(result => {
        setAccountBalance((parseFloat(result) / Math.pow(10, 18)).toString() + ' ETH');
      })
      getAssetPrice(tempKey).then(result => {
        setPrice((parseFloat(result) / Math.pow(10, 21)));
        setQueryPrice('Share price is ' + (parseInt(result) / Math.pow(10, 21)).toString() + ' ETH');
      })
    }
    console.log(conAddr)
  }, [tempKey, conAddr]);

  const InvestAmount = () => {
    console.log("Invest button is clicked")
    getContractBalance().then(result => console.log(result))
    getConAddressOfInvestmentAccount().then(result => console.log(result))
    // buyAssets('FB','1',1000000000000000).then(result => console.log(result))
    // getNumberOfSharesInvested('FB').then(result => console.log(result))
  }

  const createAccount = () => {
    console.log("createAccount is called")
    createInvestmentAccount().then(result => {
      console.log(result)
      //@ts-ignore
      //setConAddr(result.to)
    })
    .then(() => console.log(conAddr))
  }

  const handleChange = (evt: any) => {
    setAmount(evt.target.value);
    setNoOfShares(price > 0 ? (parseFloat(evt.target.value) / (price)) : 0);
    setError(parseFloat(evt.target.value) > parseFloat(accountBalance) ?
      'Enter amount less than your account balance' :
      '')
  }

  return (
    <div>
      <h4>Account Balance is {accountBalance}</h4>
      <ScreenContent>
        <div>Select the share you want to invest</div>
        <CompanyList setTempKey={setTempKey} />
        <br></br>
        {queryPrice}
        <div>Enter the amount you want to spend</div>
        <Input placeholder="Enter amount" onChange={handleChange} />
        <br></br>
        {(error == '') ? 'Number of Shares :' + noOfShares : error}<br />
        <Button onClick={InvestAmount}>Invest</Button>
        <Button onClick={createAccount}>Create Account</Button>
      </ScreenContent>
    </div>
  );
}