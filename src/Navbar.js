import "./Navbar.css";
import React from "react";
import { ethers } from "ethers";

function Navbar() {
  async function connect() {
    if (window.ethereum) {
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let accounts = await provider.send("eth_requestAccounts", []);
      let account = accounts[0];
      document.getElementById("acc").textContent = account;
    }
  }

  return (
    <div className="flex">
      <h2>PUNK DROP</h2>
      <button onClick={connect}>CONNECT WALLET</button>
    </div>
  );
}

export default Navbar;
