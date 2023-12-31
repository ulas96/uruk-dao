import React, { useState, useEffect } from 'react';
import { ethers, } from "ethers";
import { Route, createRoutesFromElements, createBrowserRouter, RouterProvider} from "react-router-dom";

import TextArea from "./TextArea.jsx";
import Navbar from "./Navbar.jsx";
import Root from "./Root.jsx";


import {contractAddr} from "../constants/contract.js";
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
    const [members,setMembers] = useState([])


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

        connectWallet();
    }, []);








    useEffect(() => {
        getMembers();
    })


    const getMemberPosts = async (_memberAddr) => {
        const memberPosts = state.contract.getMemberPosts(_memberAddr);
        return memberPosts;
    }
    const getMembers = async () => {
        const _members = await state.contract.getMembers();
        setMembers(_members);
    }

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


    const router = createBrowserRouter( createRoutesFromElements(
        <Route path="/" element={<Root account={account}/>}>

        </Route>
    ));




    return <RouterProvider router={router} />;
}

export default App;
