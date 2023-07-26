"use client"
import { useEffect, useState } from "react";
import { Button, Container } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import {ethers } from "ethers";
import { useMetaMask } from "../../hooks/useMetaMask";
import { formatAddress, switchNetwork } from "@/utils";

import MetamaskLogo from "./MetamaskLogo";



// const provider = new ethers.providers.Web3Provider(window.ethereum);
interface Window {
    ethereum: {
      request: (options: { method: string }) => Promise<string[]>;
    };
  }
export default function NavbarWalletButton (){

  const { wallet, hasProvider, isConnecting,signer, connectMetaMask } = useMetaMask()
    const [show, setShow] = useState(false);
    // const [showWallet, setShowWallet] = useState("Connect Wallet");
    // const [showMetamask, setShowMetamask] = useState("Connect MetaMask")
    // const [walletActive, setWalletActive] = useState(false)

    const targetNetworkId = "0xe704";
    // const [currentChainId, setCurrentChain] = useState<number>();

    
  
    
    // useEffect(() => {
    //     requestAccount();
    // }, []);

    // async function requestAccount() {
    //     if(window.ethereum){
    //         try{
              
    //             setWalletActive(true);
    //             const accounts = await window.ethereum.request({
    //                 method:  "eth_requestAccounts"
    //             })
    //             const shortenedAccount = accounts[0].substring(0, 6) + "..." + accounts[0].substring(accounts[0].length - 4);
    //             setShowWallet(shortenedAccount);
    //             setShowMetamask(accounts[0]);
    //             const provider = new ethers.providers.Web3Provider(window.ethereum);
    //             const txx = await provider.getNetwork();
    //             const chainId = txx.chainId;
    //             setCurrentChain(chainId)
    //         }catch(error) {
    //             console.log(error);
    //             }
                

    //     }else{console.log('wallet not found')}

    // }

    return (
        <>
        { !hasProvider &&
        <Button variant="success" href="https://metamask.io/download/" target="_blank" rel="noopener">
            Install MetaMask
       </Button>}

       {(window as any).ethereum?.isMetaMask && wallet.accounts.length < 1 &&
            <Button variant="success" disabled={isConnecting} onClick={() => setShow(true)}>
              Connect MetaMask
            </Button>
          }

        { (window as any).ethereum?.isMetaMask && wallet.chainId == targetNetworkId &&
        <Button variant="success" disabled={isConnecting} onClick={() => setShow(true)}>
            {wallet.accounts.length < 1? "Connect MetaMask" : formatAddress(wallet.accounts[0])}
       </Button>}
       { wallet.chainId !== targetNetworkId && wallet.accounts.length >= 1 &&
        <Button variant="danger" onClick={() => setShow(true)}>
            Switch Network !
       </Button>}

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="connect-wallet-button-on-Navbar"
      >
        <Modal.Header closeButton>
          <Modal.Title id="connect-wallet-button-on-Navbar">
            Connect Wallet
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
            <>
            <MetamaskLogo />
            </>
            <div className="text-center">
            { (window as any).ethereum?.isMetaMask && wallet.chainId == targetNetworkId &&
                <Button variant="success"  onClick={connectMetaMask}>
                  {wallet.accounts.length < 1? "Connect MetaMask" : <a className="text-white" href={`https://etherscan.io/address/${wallet.accounts[0]}`}>{formatAddress(wallet.accounts[0])}</a>}
                </Button>}

            { wallet.chainId !== targetNetworkId && wallet.accounts.length >= 1 &&
                <Button variant="danger" onClick={switchNetwork}>
                  Switch Network !
                </Button>}

                {(window as any).ethereum?.isMetaMask && wallet.accounts.length < 1 &&
            <Button variant="success" disabled={isConnecting} onClick={connectMetaMask}>
              Connect MetaMask
            </Button>
          }
          </div>
        </Modal.Body>
      </Modal>
    </>
  );


}
