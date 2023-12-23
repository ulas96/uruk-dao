import { useState, useEffect } from 'react';
import { ethers } from "ethers";
import {contractAddr, contractName, personalAddress} from "./contract/constants.js";
import contract from "./contract/Uruk.json";
import './App.css';


function App() {
    const { abi: ABI } = contract;
    const [account, setAccount] = useState("None");
    const [state, setState] = useState({
        provider: null,
        signer: null,
        contract: null,
        account: null
    });
    const [_account] = account;


    useEffect(() => {
        const connectWallet = async () => {

            const contractABI = ABI;
            try{
                const { ethereum } = window;
                console.log(ethereum);
                if (ethereum) {
                    const _account = await ethereum.request({
                        method: "eth_requestAccounts",
                    });
                    window.ethereum.on("chainChanged", () => {
                        window.location.reload();
                    });

                    window.ethereum.on("accountsChanged", () => {
                        window.location.reload();
                    });

                    const provider = new ethers.providers.Web3Provider(ethereum);
                    const signer = provider.getSigner();

                    const contract = new ethers.Contract(contractAddr, contractABI ,signer);
                    setAccount(_account);
                    setState({provider: provider, signer: signer, contract: contract});
                }

            } catch(e) {
                console.log(e);
            }

        };
        connectWallet();
    }, []);








    useEffect(() => {
        getClaimedRewards();
        console.log(claimedRewards);
    })

    const handleChange = (e) => {
        setClaimAmount(e.target.value);
    }

    const getMemberPosts = async (_memberAddr) => {
        const memberPosts = state.contract.getMemberPosts(_memberAddr);
        return memberPosts;
    }
    const getMembers = async () => {
        const members = state.contract.getMembers();
        return members;
    }

    const getMember = async (_memberAddr) => {
        const member = state.contract.getMember(_memberAddr);
        return member;
    }
    const becomeMember = async (nickname) => {
        const becomeMemberTx = await state.contract.becomeMember(nickname);
        await becomeMemberTx.wait()
    }

    const post = async (_post) => {
        const postTx = await state.contract.post(_post);
        await postTx.wait();
    }

    const connect = async (_memberAddr) => {
        const connectTx = await state.contract.connect(_memberAddr);
        await connectTx.wait();
    }


    return (
        <div className="swap-container">
            <div className="swap">

                <p className="swap-text">Enter amount:</p>

                <div className="swap-value">
                    <input value={claimAmount} onChange={handleChange}/>
                    <p  className="currency">sETH</p>
                    <p className="max" onClick={getAllowClaim}>MAX</p>
                </div>

                <div className="swap-value">
                    <input value={claimAmount} onChange={handleChange}/>
                    <p  className="currency">sETH</p>
                    <p className="max" onClick={getAllowClaim}>MAX</p>
                </div>

                <button className="swap-button" onClick={claimRewards}>Claim</button>
            </div>
        </div>
    );

}

export default App;
