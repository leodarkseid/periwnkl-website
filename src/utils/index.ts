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
    return `${addr.substring(0, 6) + "..." + addr.substring(addr.length - 4)}`
  }
  export const shortenAddress = (addr: string) => {
    return `${addr.substring(0, 20) + "..." + addr.substring(addr.length - 4)}`
  }



export const checkIfValidAddress = (Arr: Array<string>)=> {
  try{
    for(const str of Arr){  
    if(str.length !== 42 || !str.startsWith('0x')){
      return false
    }
  }
  return true
}catch(error){
    console.error(error)
    return false
  }
};

export const switchNetwork = async () => {
  try{
  await window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: '0xe704' }],
  });
  // refresh
  window.location.reload();
  
} catch(error){
  console.error("something went wrong", error)
}
};