import React from 'react';
import InvestmentHistory from '../../contracts/InvestmentHistory.json';
import styled from 'styled-components';


const Table = styled.table`
  width:65%;
  border:1px solid #EEEEEE;
  height:45vh;
  `
  const TrHeader = styled.tr`
    display:flex;
    width:100%;
    background:#000;
    padding:15px 0;
  `
  const TdHeader = styled.td`
    color:white;
    flex: 1 1 20%;
    text-align:center;
  `
  const TrBody = styled.tr`
    display:flex;
    width:100%;
    padding:15px 0;
    
    &:nth-of-type(odd) {
      background:#EEEEEE;
    }
  `

 const TdBody = styled.td`
    flex: 1 1 20%;
    text-align:center;
  `

const History = () => {
  return (

    <div>
      <Table>
        <TrHeader>
          <TdHeader>Company</TdHeader>
          <TdHeader>Price</TdHeader>
          <TdHeader>Action</TdHeader>
          <TdHeader>Date</TdHeader>
          <TdHeader>Status</TdHeader>
          </TrHeader>
          {InvestmentHistory.Records.map((Details) => {
            return (
              <TrBody>
                <TdBody>{Details.Company}</TdBody>
                <TdBody> {Details.Price}</TdBody>
                <TdBody> {Details.Action}</TdBody>
                <TdBody> {Details.Date}</TdBody>
                <TdBody> {Details.Status}</TdBody>
              </TrBody>
            );
          })
          }
        </Table>
    </div>
  )
}
export default History;