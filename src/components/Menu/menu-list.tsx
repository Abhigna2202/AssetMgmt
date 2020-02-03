import React, { useState, SetStateAction, Dispatch, useEffect } from 'react';
import { Jumbotron, Alert, Button, Col, Row, SplitButton } from 'react-bootstrap';
import styled from 'styled-components';
import Portfolio from '../Portfolio/Portfolio';
import Invest from '../Invest/Invest';
import Withdraw from '../Withdraw/Withdraw';
import Account from '../Account/Account';

const AssetManagementMenu = styled.div`
    display: flex;
    justify-content: left ;
    align-items: center;
    padding: 2%;
    height:50%;
`;

const NavSelection = styled.div`
    display: flex;
    flex-direction: column;
    background-color: steelblue;
    width:20%;
    height:100%; 
`;

const ScreenContent = styled.div`
    width: 90vw;
    height:100%;
    position:center;
`;

const StyledButton = styled(Button)`
    width: 100%;
    height: 50%;
    background-color: skyblue;
    border: none;
    padding: 10px 10px 10px 10px;
    border-radius: 0px;
    font-size: large;
    position : center;
    `;

const StyledButtonChild = styled(Button)`
    width: 100%;
    height: 100%;
    background-color: Skyblue;
    :hover{
        background-color: #EEEEEE;
    }
    :focus{
        background-color: #EEEEEE;
    }
    border: none;
    padding: 10px 10px 10px 10px;
    border-radius: 0px;
    font-size: medium;
    position : right;
    text-align : right;

    `;

type menuMapType = {
    [key: string] : React.FC
}

const AssetMenu = () => {
    const [menuItems, setMenuItems] = useState("Portfolio");

    const menuMap: menuMapType = {
        "Portfolio": Portfolio,
        "Invest": Invest,
        "Withdraw":Withdraw
    }
    const SelectedComponent = menuMap[menuItems];
    return (
        <AssetManagementMenu>
            <NavSelection>
                <StyledButton>MENU</StyledButton>
                <StyledButtonChild onClick={() => setMenuItems('Portfolio')}>Portfolio</StyledButtonChild>
                <StyledButtonChild onClick={() => setMenuItems('Invest')}>Invest</StyledButtonChild>
                <StyledButtonChild onClick={() => setMenuItems('Withdraw')}>Withdraw</StyledButtonChild>
                <StyledButton>ACCOUNT</StyledButton>
                <StyledButtonChild onClick={() => setMenuItems(`${Account}`)}>Account</StyledButtonChild>
                <StyledButtonChild onClick={() => setMenuItems(`${Account}`)}>Account1</StyledButtonChild>
            </NavSelection>
            <ScreenContent>
                <SelectedComponent></SelectedComponent>
            </ScreenContent>
        </AssetManagementMenu>
    );
}
export default AssetMenu;
