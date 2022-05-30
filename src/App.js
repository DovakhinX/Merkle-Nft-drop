import React, { useState } from "react";
import Navbar from "./Navbar.js";
import "./App.css";
import NFT from "./artifacts/contracts/NFT.sol/NFT.json";
import { ethers } from "ethers";
global.Buffer = global.Buffer || require("buffer").Buffer; //To solve buffer depreciated issue (BS:-/)

const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

function App() {
  let NFTaddress = "0xc0e78c12A8bb316C85E52E177f98242e0c39eE29";
  let [qty, setqty] = useState(1);

  let whitelist = [
    "0xd6095332367CE41B969E053D6B3eD375E8140bbc",
    "0xB53a0053141355e59Ea5999E48c954D33260e83D",
    "0x1E29E270930F0A24576381b7f9F73Cd071109469",
    "0xa4ff6FC669F62457d9f7650A337F5D8d4b6Db1E4",
    "0xace085582F7C1E692Bb5610c7920683d45a27Af7",
  ];

  let leafs = whitelist.map((leaf) => keccak256(leaf));
  let tree = new MerkleTree(leafs, keccak256, { sortPairs: true });
  let buf2hex = (x) => "0x" + x.toString("hex");
  

  async function claim() {
    if (typeof window.ethereum !== "undefined") {
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let signer = provider.getSigner();
      let accounts = await provider.send("eth_requestAccounts", []);
      let account = accounts[0];
      let trialLeaf = keccak256(account);
      let proof = tree.getHexProof(trialLeaf);
      let contract = new ethers.Contract(NFTaddress, NFT.abi, signer);
      let txn = await contract.mint(account, qty, proof);
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
