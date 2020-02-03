import Web3 from 'web3'
let Transaction = require('ethereumjs-tx').Transaction
const Manager = require('../../contracts/Manager.json')

//const contract = require("@truffle/contract");

//const provider = new Web3.providers.HttpProvider("http://localhost:7545");
const provider = new Web3.providers.HttpProvider(
  'https://kovan.infura.io/v3/9f8dc888a7c845789d89379aed6be307',
)
let web3 = new Web3()

web3.setProvider(provider)
const account = '<your metamask kovan account address>'
const privateKey = Buffer.from(
  '<your private key>',
  'hex',
)

export const getAssetPrice = async (stock_key: string) => {
  let managerContract = new web3.eth.Contract(
    Manager.abi,
    Manager.networks[42].address,
  )
  const actualAssetPrice = await managerContract.methods
    .query(stock_key)
    .call({ value: web3.utils.toHex(1000000000000000) })
  return actualAssetPrice
}

export const getAccountBalance = async () => {
  return web3.eth.getBalance(account)
}

export const getNumberOfSharesInvested = async (stock_key: string) => {
  let managerContract = new web3.eth.Contract(
    Manager.abi,
    Manager.networks[42].address,
  )
  const NumberOfUnits = await managerContract.methods.getNumberOfUnits(stock_key).call()
  return NumberOfUnits
}

export const getContractBalance = async () => {
    let managerContract = new web3.eth.Contract(
      Manager.abi,
      Manager.networks[42].address,
    )
    const bal = await managerContract.methods.getContractBalance().call()
    return bal
  }
  export const getConAddressOfInvestmentAccount = async () => {
    let managerContract = new web3.eth.Contract(
      Manager.abi,
      Manager.networks[42].address,
    )
    const conAddr = await managerContract.methods.getConAddressOfInvestmentAccount().call()
    return conAddr
  }

export const createInvestmentAccount = async () => {
  let dataHex = web3.eth.abi.encodeFunctionCall(
    {
      name: 'createInvestmentAccount',
      type: 'function',
      inputs: [],
    },
    [],
  )

  const receipt = await sendSignedTransaction(dataHex,1000000000000000)
  return receipt
}

export const buyAssets = async (stock_key: string, NumberOfUnits: string, amount:number) => {
  let dataHex = web3.eth.abi.encodeFunctionCall(
    {
      name: 'buyAssests',
      type: 'function',
      inputs: [
        {
          type: 'uint',
          name: '_creditVal',
        },
        {
          type: 'string',
          name: '_shareName',
        },
      ],
    },
    [NumberOfUnits, stock_key],
  )
  const receipt = await sendSignedTransaction(dataHex,amount)
  return receipt
}

const sendSignedTransaction = async (dataHex: any, amount:number) => {
  let nonce = web3.utils.toHex(
    await web3.eth.getTransactionCount(account, 'pending'),
  )
  let gasPrice = web3.utils.toHex(await web3.eth.getGasPrice())
  let gasLimitHex = web3.utils.toHex(1000000)
  let rawTx = {
    nonce: nonce,
    gasPrice: gasPrice,
    gasLimit: gasLimitHex,
    to: Manager.networks[42].address,
    from: account,
    value: web3.utils.toHex(amount), //wei i.e 0.001 ETH
    data: dataHex,
  }
  let tx = new Transaction(rawTx, { chain: 'kovan' })
  tx.sign(privateKey)
  let serializedTx = '0x' + tx.serialize().toString('hex')

  const receipt = await web3.eth
    .sendSignedTransaction(serializedTx)
    // .on('transactionHash', (hash) => { console.log(hash) })
    .on('receipt', receipt => {
      return receipt.status
    })
    .catch(err => console.warn(err))
}
