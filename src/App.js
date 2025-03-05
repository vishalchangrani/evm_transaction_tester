import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import ResultsTable from "./components/ResultsTable";

function App() {
  const [endpoint1, setEndpoint1] = useState("");
  const [endpoint2, setEndpoint2] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_requestAccounts" });
    }
  }, []);

  const handleSubmit = async () => {
    const provider1 = new ethers.providers.JsonRpcProvider(endpoint1);
    const provider2 = new ethers.providers.JsonRpcProvider(endpoint2);

    const signer1 = provider1.getSigner();
    const signer2 = provider2.getSigner();

    const tx1 = await signer1.sendTransaction({
      to: await signer1.getAddress(),
      value: ethers.utils.parseEther("0.01")
    });

    const tx2 = await signer2.sendTransaction({
      to: await signer2.getAddress(),
      value: ethers.utils.parseEther("0.01")
    });

    const softFinality1 = Date.now() - tx1.timestamp; // Simplified timing logic
    const softFinality2 = Date.now() - tx2.timestamp;
    
    // Add logic for hard finality timing

    setResults([
      { chain: "Chain 1", softFinality: softFinality1 + " ms" },
      { chain: "Chain 2", softFinality: softFinality2 + " ms" }
    ]);
  };

  return (
    <div>
      <h1>Transaction Timing Tester</h1>
      <input
        type="text"
        value={endpoint1}
        onChange={(e) => setEndpoint1(e.target.value)}
        placeholder="Enter EVM Endpoint 1"
      />
      <input
        type="text"
        value={endpoint2}
        onChange={(e) => setEndpoint2(e.target.value)}
        placeholder="Enter EVM Endpoint 2"
      />
      <button onClick={handleSubmit}>Test Transactions</button>
      <ResultsTable results={results} />
    </div>
  );
}

export default App;
