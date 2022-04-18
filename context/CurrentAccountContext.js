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
        await checkNetwork(ethereum)
      }

      // Comprobamos si estamos autorizados a acceder a la billetera del usuario
      const accounts = await ethereum.request({ method: 'eth_accounts' })

      if (accounts.length !== 0) {
        const account = accounts[0]
        _message = `Found an authorized account: ${account}`
        console.log(_message)
        setMessage({
          title: _message,
          status: 'info'
        })
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

  const checkNetwork = async (ethereum) => {
    let _message = ''
    try {
      if (ethereum.networkVersion !== '80001') {
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

  return (
    <CurrentAccountContext.Provider
      value={{
        currentAccount,
        setCurrentAccount,
        checkIfWalletIsConnected,
        connectWallet,
        chainIdOk,
        message
      }}
    >
      {children}
    </CurrentAccountContext.Provider>
  )
}
