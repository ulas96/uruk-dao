import React, { useState, useEffect } from 'react';
import { ethers, } from "ethers";
import {Route, Routes , createRoutesFromElements, createBrowserRouter, RouterProvider, BrowserRouter} from "react-router-dom";

import TextArea from "./TextArea.jsx";
import Navbar from "./Navbar.jsx";
import Community from "./Community.jsx";
import Profile from "./Profile.jsx";
import Feed from "./Feed.jsx";


import {contractAddr, personalAddress} from "../constants/contract.js";
import contract from "../contract/Uruk.json";

import './App.css';
import "./style.css";




function App() {
    const { abi: ABI } = contract;
    const [account, setAccount] = useState("None");
    const [state, setState] = useState({
        provider: null,
        signer: null,
        contract: null
    });
    const [_account] = account;

    const [member, setMember] = useState({
        nickname: null,
        memberIndex: null,
        memberAddress: null,
        memberSince: null,
    });


    useEffect(() => {
        const connectWallet = async () => {
            const contractABI = ABI;
            try {
                const { ethereum } = window;
                if (ethereum) {
                    const _account = await ethereum.request({
                        method: "eth_requestAccounts",
                    });

                    ethereum.on("chainChanged", () => {
                        window.location.reload();
                    });

                    ethereum.on("accountsChanged", () => {
                        window.location.reload();
                    });

                    const provider = new ethers.providers.Web3Provider(ethereum);
                    const signer = provider.getSigner();
                    const contract = new ethers.Contract(contractAddr, contractABI, signer);
                    setAccount(_account);
                    setState({ provider, signer, contract });
                } else {
                    console.error("Please install MetaMask or another Ethereum provider");
                }
            } catch (e) {
                console.error(e);
            }
        };

        connectWallet().then().catch();
    }, []);








    useEffect(() => {

        setConnectedMember().then().catch();
    })




    const getMember = async (_memberAddr) => {
        const member = await state.contract.getMember(_memberAddr);
        return member;
    }
    const becomeMember = async (_nickname) => {
        const becomeMemberTx = await state.contract.becomeMember(_nickname);
        await becomeMemberTx.wait()
    }

    const post = async () => {
        const postTx = await state.contract.post(text);
        await postTx.wait();
    }

    const connect = async (_memberAddr) => {
        const connectTx = await state.contract.connect(_memberAddr);
        await connectTx.wait();
    }

    const setConnectedMember = async () => {
        const _member = await getMember(String(account));
        setMember(_member);

    }







    return(
        <>
            <BrowserRouter>
                <Navbar member={member}/>
                <Routes>
                    <Route path="/community"  element={<Community state={state}/>}/>
                    <Route path="/profile"  element={<Profile/>}/>
                    <Route path="/feed"  element={<Feed/>}/>
                </Routes>
            </BrowserRouter>

        </>
    );
}

export default App;
