import React, { useState } from "react";
import Navbar from "./Navbar.js";
import "./App.css";
import NFT from "./artifacts/contracts/NFT.sol/NFT.json";
import { ethers } from "ethers";
global.Buffer = global.Buffer || require("buffer").Buffer; //To solve buffer depreciated issue (BS:-/)

const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

function App() {
  let NFTaddress = "0x0E97CC2BA8b826CAB1F86E0E08A3746b2959AdE2";
  let [qty, setqty] = useState(0);

  let whitelist = [
    "0xd6095332367CE41B969E053D6B3eD375E8140bbc2",//Last digit being qty
    "0xB53a0053141355e59Ea5999E48c954D33260e83D2",//Last digit being qty
    "0x1E29E270930F0A24576381b7f9F73Cd0711094693",//Last digit being qty
    "0xa4ff6FC669F62457d9f7650A337F5D8d4b6Db1E42",//Last digit being qty
    "0xace085582F7C1E692Bb5610c7920683d45a27Af71"//Last digit being qty
  ];

  let leafs = whitelist.map((leaf) => keccak256(leaf));
  let tree = new MerkleTree(leafs, keccak256, { sortPairs: true });
 
  

  async function claim() {
    if (typeof window.ethereum !== "undefined") {
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let signer = provider.getSigner();
      let accounts = await provider.send("eth_requestAccounts", []);
      let account = accounts[0];
      let trialLeaf = keccak256(account+qty);
      let proof = tree.getHexProof(trialLeaf);
      let contract = new ethers.Contract(NFTaddress, NFT.abi, signer);
      let txn = await contract.mint(account, qty, proof,trialLeaf);
    }
  }

  return (
    <>
      <Navbar />
      <br />
      <div className="App">
        <div className="mint">
          <h2>Punk Exclusive</h2>
          <br />
          <h3>
            Account:<span id="acc"></span>
          </h3>
          <label>Enter the qty </label>
          <input
            onChange={(e) => {
              setqty(e.target.value);
            }}
            value={qty}
          />
          <br />
          <br />
          <button onClick={claim}>Claim</button>
        </div>
      </div>
    </>
  );
}

export default App;
