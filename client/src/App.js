import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log("in use effect");
    const loadProvider = async () => {
      console.log("load provider called");
      if (provider) {
        window.ethereum.on("chainChanged", () => window.location.reload());
        window.ethereum.on("accountsChanged", () => window.location.reload());
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        const Contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        console.log(Contract);
        setContract(Contract);
        setProvider(provider);
        // console.log(contract);
      } else {
        console.log("Metamask is not installed");
      }
    };
    // console.log("provider");
    provider && loadProvider();
    // console.log(contract);
  }, []);
  return (
    <>
      {modalOpen && (<Modal setModalOpen={setModalOpen} contract={contract}></Modal>)}
      {!modalOpen && (<button className="share" onClick={() => { setModalOpen(true) }}>share</button>)}
      <div className="App">
        <h1>X-Cloud</h1>
        <div className="bg"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div>
        {/* {provider.getCode(contract.address)} */}
        <p>Account : {account ?? "please connect Metamask"}</p>
        <FileUpload contract={contract} provider={provider} account={account} />
        <Display contract={contract} account={account} />
      </div>
    </>
  );
}

export default App;
