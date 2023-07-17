"use client"
import { useEffect, useState } from "react";
import { Button, Container } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

import MetamaskLogo from "./MetamaskLogo";


interface Window {
    ethereum: {
      request: (options: { method: string }) => Promise<string[]>;
    };
  }
export default function NavbarWalletButton (){
    const [show, setShow] = useState(false);
    const [showWallet, setShowWallet] = useState("Connect Wallet");
    const [showMetamask, setShowMetamask] = useState("Connect MetaMask")
    const [walletActive, setWalletActive] = useState(false)
    
    useEffect(() => {
        requestAccount()
    }, []);

    async function requestAccount() {
        if(window.ethereum){
            try{
                setWalletActive(true);
                const accounts = await window.ethereum.request({
                    method:  "eth_requestAccounts"
                })
                const shortenedAccount = accounts[0].substring(0, 6) + "..." + accounts[0].substring(accounts[0].length - 4);
                setShowWallet(shortenedAccount);
                setShowMetamask(accounts[0]);
            }catch(error) {
                console.log(error);
                }
                

        }else{console.log('wallet not found')}

    }
       
    return (
        <>
        { !walletActive &&
        <Button variant="success" href="https://metamask.io/download/" target="_blank" rel="noopener">
            Install MetaMask
       </Button>}
        { walletActive &&
        <Button variant="success" onClick={() => setShow(true)}>
            {showWallet}
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
          <Button onClick={requestAccount} >{showMetamask}</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );


}




// "use client"
// import { useState } from "react";
// import { Button, Container } from 'react-bootstrap';
// import Modal from 'react-bootstrap/Modal';
// import { MetaMaskSDK } from '@metamask/sdk';
// import ModelViewer from '@metamask/logo';
// import MetamaskLogo from "./MetamaskLogo";


// interface Window {
//     ethereum: any;
//   }
// export default function NavbarWalletButton (){
//     const [show, setShow] = useState(false);
//     const [showWallet, setShowWallet] = useState("Connect Wallet");
//     const [showMetamask, setShowMetamask] = useState("Connect MetaMask")
    
//     async function requestAccount() {
//         if (window.ethereum){
//             console.log(window.ethereum)
//             try{
//                 const accounts = await window.ethereum.request({
//                     method: "eth_requestAccounts",
//                 });
//                 const shortenedAccount = accounts[0].substring(0, 6) + "..." + accounts[0].substring(accounts[0].length - 4);
//                 setShowWallet(shortenedAccount);
//                 setShowMetamask(accounts[0]);
//             }catch(error) {
//             console.log('Error connecting .....');
//             }
        
//             }else{console.log('wallet not found')}
//         }
       
//     return (
//         <>
//         <Button variant="success" onClick={() => setShow(true)}>
//             {showWallet}
//        </Button>

//       <Modal
//         show={show}
//         onHide={() => setShow(false)}
//         dialogClassName="modal-90w"
//         aria-labelledby="connect-wallet-button-on-Navbar"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title id="connect-wallet-button-on-Navbar">
//             Connect Wallet
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body >
//             <>
//             <MetamaskLogo />
//             </>
//             <div className="text-center">
//           <Button  onClick={requestAccount}>{showMetamask}</Button>
//           </div>
//         </Modal.Body>
//       </Modal>
//     </>
//   );


// }