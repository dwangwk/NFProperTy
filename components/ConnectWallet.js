import React, { useContext, useState } from 'react';
import { AccountContext } from './context/AccountContext';
import { Menu } from 'semantic-ui-react';
import { truncateAddress } from './utils';

export default function ConnectWallet() {

    const [walletAddress, setWalletAddress] = useState('');
    const [account, setAccount] = useContext(AccountContext);
    
    React.useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
          window.ethereum.on("accountsChanged", (accounts) => setAccount(accounts[0]));
        }
      }, []);

      //setAccount('Test');
      //console.log(account);

    const handleConnect = async (event) => {
        event.preventDefault();
            try {
                if (window.ethereum) {
                    // Request access to the user's MetaMask account
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    // Get the connected wallet address
                    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                    setWalletAddress(accounts[0]);
                    setAccount(accounts[0]);
                } else {
                    throw new Error('Metamask not detected');
                }
                
            } catch (error) {
                console.error('Error connecting wallet:', error);
                // Handle error connecting the wallet
            }
    }
    return (
        <>
      <Menu.Item
        onClick={!!account ? () => {} : handleConnect}
      >
        <b>{!account ? "CONNECT WALLET" : truncateAddress(account)}</b>
      </Menu.Item>
    </>
    )
;
}

