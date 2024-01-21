import React, { useState, useEffect } from 'react';
import {ethers} from "ethers";
import {Route, Routes , BrowserRouter} from "react-router-dom";

import Navbar from "./Navbar.jsx";
import Community from "./Community.jsx";
import Profile from "./Profile.jsx";
import Feed from "./Feed.jsx";
import Home from "./Home.jsx";

import {contractAddr, personalAddress} from "../constants/contract.js";
import contract from "../contract/Uruk.json";

import './App.css';
import "./style.css";

import '@rainbow-me/rainbowkit/styles.css';
import {
    getDefaultWallets,
    RainbowKitProvider,

} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig} from 'wagmi';
import {
    sepolia
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

function App() {
    const { abi: ABI } = contract;
    const [state, setState] = useState({
        provider: null,
        signer: null,
        contract: null
    });

    const [member, setMember] = useState({
        nickname: null,
        memberIndex: null,
        memberAddress: null,
        memberSince: null,
    });




    const { chains, publicClient } = configureChains(
        [sepolia],
        [
            publicProvider()
        ]
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
            <RainbowKitProvider chains={chains}>
                <BrowserRouter>
                    <Navbar member={member}/>
                    <Routes>
                        <Route path="/" element={<Home />}/>
                        <Route path="/community"  element={<Community state={state} />}/>
                        <Route path="/profile"  element={<Profile state={state}/>}/>
                        <Route path="/feed"  element={<Feed state={state}/>}/>
                    </Routes>
                </BrowserRouter>
            </RainbowKitProvider>

        </WagmiConfig>
    );
}


export default App;