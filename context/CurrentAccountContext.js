/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'

export const CurrentAccountContext = createContext()

export const CurrentAccountContextProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState()
  const [message, setMessage] = useState(null)
  const [chainIdOk, setChainIdOk] = useState(false)

  const checkIfWalletIsConnected = async () => {
    let _message = ''
    try {
      const { ethereum } = window
      // Nos aseguramos de tener acceso a window.ethereum
      if (!ethereum) {
        _message = 'Make sure you have metamask!'
        console.log(_message)
        setMessage({
          title: _message,
          status: 'error'
        })
        return
      } else {
        console.log('We have the ethereum object', ethereum)
      }

      // Comprobamos si estamos autorizados a acceder a la billetera del usuario
      const accounts = await ethereum.request({ method: 'eth_accounts' })

      if (accounts.length !== 0) {
        const account = accounts[0]
        setCurrentAccount(account)
      } else {
        _message = 'No authorized account found'
        console.log(_message)
        setMessage({
          title: _message,
          status: 'error'
        })
        setCurrentAccount(null)
      }
    } catch (error) {
      console.log(new Error(error))
    }
  }

  const checkNetwork = ethereum => {
    let _message = ''
    console.log('ethereum', ethereum)
    try {
      const { ethereum } = window
      if (ethereum) {
        console.log('ethereum.networkVersion', ethereum.networkVersion)
        if (ethereum.networkVersion && ethereum.networkVersion !== '80001') {
          setChainIdOk(false)
          _message = 'Wrong network! Please switch to the Polygon testnet'
          console.log(_message)
          setMessage({
            title: _message,
            status: 'error'
          })
        } else {
          setChainIdOk(true)
        }
      } else {
        _message = 'Make sure you have metamask!'
        console.log(_message)
        setMessage({
          title: _message,
          status: 'error'
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window
      if (!ethereum) {
        alert('Get MetaMask!')
        return
      }
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      console.log('Connected', accounts[0])
      setCurrentAccount(accounts[0])
    } catch (error) {
      console.log(new Error(error))
      setCurrentAccount(null)
    }
  }

  const switchNetwork = async () => {
    let _message = ''
    if (window.ethereum) {
      try {
        // Try to switch to the Mumbai testnet
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x13881' }] // Check networks.js for hexadecimal network ids
        })
        _message = 'Successfully switched to the Mumbai testnet, reload the page to see the changes'
        console.log(_message)
        setMessage({
          title: _message,
          status: 'success'
        })
      } catch (error) {
        // This error code means that the chain we want has not been added to MetaMask
        // In this case we ask the user to add it to their MetaMask
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x13881',
                  chainName: 'Polygon Mumbai Testnet',
                  rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
                  nativeCurrency: {
                    name: 'Mumbai Matic',
                    symbol: 'MATIC',
                    decimals: 18
                  },
                  blockExplorerUrls: ['https://mumbai.polygonscan.com/']
                }
              ]
            })
          } catch (error) {
            console.log(error)
          }
        }
        console.log(error)
      }
    } else {
      // If window.ethereum is not found then MetaMask is not installed
      _message = 'MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html'
      console.log(_message)
      setMessage({
        title: _message,
        status: 'error'
      })
    }
  }

  return (
    <CurrentAccountContext.Provider
      value={{
        currentAccount,
        setCurrentAccount,
        checkIfWalletIsConnected,
        connectWallet,
        switchNetwork,
        chainIdOk,
        message,
        checkNetwork
      }}
    >
      {children}
    </CurrentAccountContext.Provider>
  )
}
