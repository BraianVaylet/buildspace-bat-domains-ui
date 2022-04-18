import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { CurrentAccountContext } from 'context/currentAccountContext'

const Dashboard = () => {
  const router = useRouter()
  const { checkIfWalletIsConnected, currentAccount } = useContext(CurrentAccountContext)
  console.log('currentAccount', currentAccount)

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  useEffect(() => {
    currentAccount === null && router.push('/')
  }, [currentAccount])

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard
