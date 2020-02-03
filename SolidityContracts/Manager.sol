pragma solidity ^0.5.0;
import './helpers/SafeMath.sol';
import './InvestmentAccount.sol';
import {usingBandProtocol, Oracle} from 'band-solidity/contracts/Band.sol';

contract Manager is usingBandProtocol{
    using SafeMath for *;

     mapping  (address => InvestmentAccount) InvestmentAccounts;
    mapping (address => address) SenderToContractAddressMap;
    InvestmentAccount[] arrayOfAccounts;

    function createInvestmentAccount() public payable{
        InvestmentAccount InvestmentAccountContract = new InvestmentAccount();
        // address payable UserAccount = address(InvestmentAccountContract);
        InvestmentAccounts[msg.sender] = InvestmentAccountContract;
        arrayOfAccounts.push(InvestmentAccountContract);
        SenderToContractAddressMap[msg.sender] = address(InvestmentAccountContract);
    }

    function query(string memory _shareName) public payable returns(uint256){
        return FINANCIAL.querySpotPrice(_shareName);
    }

    function sellAssests(uint _debitVal, string memory _shareName, uint256 amount) public payable {
        InvestmentAccounts[msg.sender].deductFromAssets(_shareName,_debitVal);
        msg.sender.transfer(amount);
    }

    function buyAssets(uint _creditVal, string memory _shareName) public payable {
        InvestmentAccounts[msg.sender].addToAssets.value(msg.value)(_shareName,_creditVal);
    }

    function getNumberOfUnits(string memory _shareName) public view returns (uint){
        return  InvestmentAccounts[msg.sender].getNumberOfUnits(_shareName);
    }

    function getContractBalance() public view returns (uint256){
        return address(this).balance;
    }

    function getConAddressOfInvestmentAccount() public view returns (InvestmentAccount[] memory){
        //return address(InvestmentAccounts[msg.sender]);
        return arrayOfAccounts;
        //SenderToContractAddressMap
    }
}