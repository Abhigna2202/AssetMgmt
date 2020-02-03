import React, { useState } from 'react';
import styled from 'styled-components';

const Select = styled.select`
    width: 15%;
    text-align: center;
    border-radius:8px;
    font-family: 'Courier New', Courier, monospace;
    border: solid 2px #048ABF;
    padding: 12px;
    margin-bottom: 10px;
`;

export default (props:any) => {

    const handleChange = (evt: any) => {
        props.setTempKey(evt.target.value)
    }

    return(
        <Select id="Shares" name="Shares" onChange={handleChange}>
        <option value='Select'>Select company</option>
        <option value='FB'>Facebook</option>
        <option value='GOOG'>Google</option>
        <option value='AAPL'>Apple</option>
        <option value='AMZN'>Amazon</option>
        <option value='MSFT'>Microsoft</option>
        <option value='NFLX'>Netflix</option>
        <option value='ORCL'>Oracle</option>
      </Select>
    )
}