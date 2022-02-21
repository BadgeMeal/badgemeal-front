import Caver from 'caver-js'; // or const Caver = require('caver-js')
import toastNotify from '@utils/toast';

const caver = new Caver(window.klaytn);

const BADGEMEAL_CONTRACT_ADDRESS = process.env.REACT_APP_NFT_CONTRACT_ADDRESS;

const mintWithTokenURIABI =
  '[{ "constant": false, "inputs": [ { "name": "to", "type": "address" }, { "name": "tokenId", "type": "uint256" }, { "name": "genralTokenURI", "type": "string" }, { "name": "masterTokenURI", "type": "string" }, { "name": "menuType", "type": "string" } ], "name": "mintWithTokenURI", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }]';
const mintWithklayABI =
  '[{ "constant": false, "inputs": [ { "name": "to", "type": "address" }, { "name": "tokenId", "type": "uint256" }, { "name": "genralTokenURI", "type": "string" }, { "name": "masterTokenURI", "type": "string" }, { "name": "menuType", "type": "string" } ], "name": "mintWithKlay", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }]';

export const kaikasLogin = async () => {
  if (typeof window.klaytn !== 'undefined') {
    const accounts = await window.klaytn.enable();
    const account = accounts[0]; // We currently only ever provide a single account,
    console.log(`지갑주소 : ${account}`);
    console.log(`네트워크 주소 : ${window.klaytn.networkVersion}`);
    return account;
  } else {
    toastNotify({
      state: 'error',
      message: 'Please install Kaikas wallet.',
    });
  }
};

export const kaikasGetBalance = async (address) => {
  const balance = await caver.klay.getBalance(address);
  console.log(`현재 잔액 : ${balance / 10 ** 18}`);
  return balance;
};

export const isKaikasUnlocked = async () => {
  const result = await window.klaytn._kaikas.isUnlocked();
  return result; //잠금상태: false, 열린상태: true
};

export const isKaikasEnabled = async () => {
  const result = await window.klaytn._kaikas.isEnabled();
  return result;
};

export const mintWithTokenURI = async (tokenID, genralTokenURI, masterTokenURI, menuType) => {
  const contract = caver.contract.create(JSON.parse(mintWithTokenURIABI), process.env.REACT_APP_NFT_CONTRACT_ADDRESS);

  caver.klay
    .sendTransaction({
      type: 'SMART_CONTRACT_EXECUTION',
      from: window.klaytn.selectedAddress,
      to: process.env.REACT_APP_NFT_CONTRACT_ADDRESS,
      data: contract.methods
        .mintWithTokenURI(window.klaytn.selectedAddress, tokenID, genralTokenURI, masterTokenURI, menuType)
        .encodeABI(),
      value: caver.utils.toPeb(0, 'KLAY'),
      gas: '8000000',
    })
    .on('transactionHash', (hash) => {
      console.log(`transactionHash ${hash}`);
    })
    .on('receipt', (receipt) => {
      // success
      console.log(`succes ${receipt}`);
    })
    .on('error', (e) => {
      // failed
      console.log(`error ${e}`);
    });
};

export const mintWithKlay = async (tokenID, genralTokenURI, masterTokenURI, menuType) => {
  const contract = caver.contract.create(JSON.parse(mintWithklayABI), process.env.REACT_APP_NFT_CONTRACT_ADDRESS);

  caver.klay
    .sendTransaction({
      type: 'SMART_CONTRACT_EXECUTION',
      from: window.klaytn.selectedAddress,
      to: process.env.REACT_APP_NFT_CONTRACT_ADDRESS,
      data: contract.methods
        .mintWithKlay(window.klaytn.selectedAddress, tokenID, genralTokenURI, masterTokenURI, menuType)
        .encodeABI(),
      value: '500000000000000000',
      gas: '8000000',
    })
    .on('transactionHash', (hash) => {
      console.log(`transactionHash ${hash}`);
    })
    .on('receipt', (receipt) => {
      // success
      console.log(`succes ${receipt}`);
    })
    .on('error', (e) => {
      // failed
      console.log(`error ${e}`);
    });
};
