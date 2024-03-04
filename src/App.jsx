import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ConnectWallet from "./components/ConnectWallet";
import SignMessage from "./components/SignMessage";

function App() {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h2>Vite + React + Stacks.js 👋</h2>

      {/* ConnectWallet file: `./src/components/ConnectWallet.js` */}
      <ConnectWallet />

      {/* ContractCallVote file: `./src/components/ContractCallVote.js` */}
      {/* <ContractCallVote /> */}

      <SignMessage />
    </>
  );
}

export default App;
