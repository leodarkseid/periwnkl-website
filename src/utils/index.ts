import type { MetaMaskInpageProvider } from "@metamask/providers";

export const formatBalance = (rawBalance: string) => {
    const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2)
    return balance
  }
  
  export const formatChainAsNum = (chainIdHex: string) => {
    const chainIdNum = parseInt(chainIdHex)
    return chainIdNum
  }

  export const formatAddress = (addr: string) => {
    return `${addr.substring(0, 8)}...`
  }

  

export const useMetaMask = () => {
  const ethereum = global?.window?.ethereum;
  if (!ethereum || !ethereum.isMetaMask) return;
  return ethereum as unknown as MetaMaskInpageProvider;
};

export const connectWallet = async () => {
  const accounts= await window.ethereum.request({method: 'eth_requestAccounts'});
  console.log(accounts)
  }

export const checkIfValidAddress = (Arr: Array<string>)=> {
  console.log("from utils", Arr)
  try{
    for(const str of Arr){  
    if(str.length !== 42 || !str.startsWith('0x')){
      console.log("from utils", false)
      return false
    }
  }
  console.log("from utils", true)
  return true
}catch(error){
    console.error(error)
    console.log("from utils", false)
    return false
  }
};