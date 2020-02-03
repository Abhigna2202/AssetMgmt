import React, { useState, useEffect } from 'react';
import History from '../History/History';
import Chart from '../../actions/Charts/chart'
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import QueryAssetPrice from '../QueryAssetPrice/QueryAssetPrice';


export default () => {

  return (
    <div>
      <h2>
        Welcome Alexa!.
        </h2>
      <h4>Here is your account summary</h4>
      <QueryAssetPrice />
      <Chart />
      <br />
      <History />
    </div>
  )
}