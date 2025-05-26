import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { StarknetConfig, publicProvider } from "@starknet-react/core";
import { constants } from "starknet";
import { InjectedConnector } from "starknetkit/injected";
import { ArgentMobileConnector } from "starknetkit/argentMobile";
import { WebWalletConnector } from "starknetkit/webwallet";
import "./index.css";

// Define chains
const chains = [
  {
    id: constants.StarknetChainId.SN_MAIN,
    name: "Starknet Mainnet",
    network: "mainnet",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: {
      default: { http: ["https://starknet-mainnet.public.blastapi.io"] },
      public: { http: ["https://starknet-mainnet.public.blastapi.io"] },
    },
  },
  {
    id: constants.StarknetChainId.SN_SEPOLIA,
    name: "Starknet Sepolia",
    network: "sepolia",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: {
      default: { http: ["https://starknet-sepolia.public.blastapi.io"] },
      public: { http: ["https://starknet-sepolia.public.blastapi.io"] },
    },
  },
];

// Define connectors properly
const connectors = [
  new InjectedConnector({ options: { id: "braavos", name: "Braavos" } }),
  new InjectedConnector({ options: { id: "argentX", name: "Argent X" } }),
  new ArgentMobileConnector(),
  new WebWalletConnector({ url: "https://web.argent.xyz" }),
];

// Define provider
const provider = publicProvider();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StarknetConfig 
      chains={chains}
      provider={provider}
      connectors={connectors}
      autoConnect={true}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StarknetConfig>
  </React.StrictMode>
);