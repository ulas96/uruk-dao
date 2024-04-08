import React, { useState, useEffect } from 'react';
import {ethers} from "ethers";
import {Route, Routes , BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Community from "./Community.jsx";
import Profile from "./Profile.jsx";
import Feed from "./Feed.jsx";
import Home from "./Home.jsx";
import Banner from "./Banner.jsx";
import {contractAddr, personalAddress} from "../constants/contract.js";
import contract from "../contract/Uruk.json";


import "./style.scss";

import '@rainbow-me/rainbowkit/styles.css';
import {
    getDefaultWallets,
    RainbowKitProvider,

} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig} from 'wagmi';
import {
    sepolia
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';


const theme = {
    blurs: {
      modalOverlay: 'blur(5px)',
    },
    colors: {
      accentColor: '#050c10',
      accentColorForeground: '...',
      actionButtonBorder: '...',
      actionButtonBorderMobile: '...',
      actionButtonSecondaryBackground: '...',
      closeButton: '...',
      closeButtonBackground: '...',
      connectButtonBackground: '#050c10',
      connectButtonBackgroundError: '...',
      connectButtonInnerBackground: '...',
      connectButtonText: 'white',
      connectButtonTextError: '...',
      connectionIndicator: '...',
      downloadBottomCardBackground: '...',
      downloadTopCardBackground: '...',
      error: '...',
      generalBorder: '...',
      generalBorderDim: '...',
      menuItemBackground: '...',
      modalBackdrop: '...',
      modalBackground: '#050c10',
      modalBorder: '#050c10',
      modalText: 'white',
      modalTextDim: '...',
      modalTextSecondary: '...',
      profileAction: '...',
      profileActionHover: '...',
      profileForeground: '...',
      selectedOptionBorder: '...',
      standby: '...',
    },
    fonts: {
      body: '...',
    },
    radii: {
      actionButton: '15px',
      connectButton: '15px',
      menuButton: '15px',
      modal: '15px',
      modalMobile: '15px',
    },
    shadows: {
        connectButton: '0px 0px 10px rgba(0, 0, 0, 0.5)',
        dialog: '0px 0px 10px rgba(0, 0, 0, 0.5)',
        profileDetailsAction: '0px 0px 10px rgba(0, 0, 0, 0.5)',
        selectedOption: '0px 0px 10px rgba(0, 0, 0, 0.5)',
        selectedWallet: '0px 0px 10px rgba(0, 0, 0, 0.5)',
        walletLogo: '0px 0px 10px rgba(0, 0, 0, 0.5)',
      },
  };
  



function App() {

    const [active,setActive] = useState('');

    const { abi: ABI } = contract;
    const [state, setState] = useState({
        provider: null,
        signer: null,
        contract: null
    });




    const { chains, publicClient } = configureChains(
        [sepolia],
        [publicProvider()]
    );

    const { connectors } = getDefaultWallets({
        appName: 'Uruk',
        projectId: '1',
        chains
    });

    const wagmiConfig = createConfig({
        autoConnect: true,
        connectors,
        publicClient
    })




    useEffect(() => {
        const connectWallet = async () => {
            const contractABI = ABI;
            try{
                const { ethereum } = window;
                if (ethereum) {
                    window.ethereum.on("chainChanged", () => {
                        window.location.reload();
                    });
                    window.ethereum.on("accountsChanged", () => {
                        window.location.reload();
                    });
                    const provider = new ethers.providers.Web3Provider(ethereum);
                    const signer = provider.getSigner();
                    const contract = new ethers.Contract(contractAddr, contractABI,signer);
                    setState({provider: provider, signer: signer, contract: contract});
                }
            } catch(e) {
                console.log(e);
            }
        };
        connectWallet();
    }, []);




    return(
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains} theme={theme}>
                <BrowserRouter>
                    <Banner active={active} setActive={setActive}/>
                    <Routes>    
                        <Route path="/" element={<Home active={active}  setActive={setActive} />} />  
                        <Route path="/community"  element={<Community state={state} active={active} setActive={setActive}/>}/>
                        <Route path="/profile"  element={<Profile state={state} active={active} setActive={setActive}/>}/>
                        <Route path="/feed"  element={<Feed state={state} active={active} setActive={setActive}/>}/>
                    </Routes>
                </BrowserRouter>
            </RainbowKitProvider>

        </WagmiConfig>
    );
}


export default App;