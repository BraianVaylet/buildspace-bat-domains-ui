/* eslint-disable react/no-children-prop */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { CurrentAccountContext } from 'context/currentAccountContext'
import Layout from 'components/Layout'
import { Button, Flex, FormControl, FormHelperText, FormLabel, Input, InputGroup, InputRightAddon, Spinner } from '@chakra-ui/react'
import { CONTRACT } from 'utils/contracts'

const Dashboard = () => {
  const router = useRouter()
  const { checkIfWalletIsConnected, currentAccount, chainIdOk } = useContext(CurrentAccountContext)
  const [domain, setDomain] = useState('')
  const [record, setRecord] = useState('')
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  useEffect(() => {
    currentAccount === null && router.push('/')
  }, [currentAccount])

  const mintDomain = async () => {
    setLoader(true)
    // Don't run if the domain is empty
    if (!domain) { return }
    // Alert the user if the domain is too short
    if (domain.length < 3) {
      alert('Domain must be at least 3 characters long')
      return
    }
    // Calculate price based on length of domain (change this to match your contract)
    // 3 chars = 0.5 MATIC, 4 chars = 0.3 MATIC, 5 or more = 0.1 MATIC
    const price = domain.length === 3 ? '0.5' : domain.length === 4 ? '0.3' : '0.1'
    console.log('Minting domain', domain, 'with price', price)
    try {
      const { ethereum } = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(
          CONTRACT.BAT_NAME_SERVICE.ADDRESS,
          CONTRACT.BAT_NAME_SERVICE.ABI,
          signer
        )

        console.log('Going to pop wallet now to pay gas...')

        let tx = await contract.register(domain, { value: ethers.utils.parseEther(price) })
        // Wait for the transaction to be mined
        const receipt = await tx.wait()

        // Check if the transaction was successfully completed
        if (receipt.status === 1) {
          console.log('Domain minted! https://mumbai.polygonscan.com/tx/' + tx.hash)

          // Set the record for the domain
          tx = await contract.setRecord(domain, record)
          await tx.wait()

          console.log('Record set! https://mumbai.polygonscan.com/tx/' + tx.hash)

          setRecord('')
          setDomain('')
        } else {
          alert('Transaction failed! Please try again')
        }
      }
    } catch (error) {
      console.log(error)
    }
    setLoader(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <Layout
      chain={chainIdOk}
      address={currentAccount}
      title={'Bat Name Service'}
      description={'Your immortal API on the blockchain!'}
    >
      <Flex
        direction={'column'}
        align={'center'}
        justify={'center'}
        w={'100%'}
        minH={'100vh'}
        py={5}
        px={'25%'}
      >
        <Flex
          direction={'column'}
          align={'center'}
          justify={'center'}
          w={'100%'}
        >
          <Flex
            as={'form'}
            onSubmit={handleSubmit}
            direction={'column'}
            align={'center'}
            justify={'center'}
            w={'100%'}
          >
            <FormControl
              isRequired
              as={Flex}
              direction={'column'}
              align={'center'}
              justify={'center'}
              w={'50%'}
            >
              <FormLabel
                htmlFor='domain'
                textAlign={'center'}
                fontSize={'2xl'}
                letterSpacing={1}
              >
                Domain
              </FormLabel>
              <InputGroup size='lg'>
                <Input
                  borderColor={'purple.400'}
                  onChange={(event) => setDomain(event.target.value)}
                  textAlign={'center'}
                  fontSize={'2xl'}
                  letterSpacing={1}
                  id='domain'
                  type='text'
                  placeholder='New domain'
                  color='purple.400'
                />
                <InputRightAddon
                  borderColor={'purple.400'}
                  backgroundColor={'purple.400'}
                  textAlign={'center'}
                  fontSize={'2xl'}
                  letterSpacing={1}
                  color={'white'}
                  children='.bat'
                />
              </InputGroup>
              <FormHelperText>Enter your domain name.</FormHelperText>
            </FormControl>

            <FormControl
              isRequired
              as={Flex}
              direction={'column'}
              align={'center'}
              justify={'center'}
              w={'50%'}
              mt={10}
            >
              <InputGroup size='lg'>
                <Input
                  onChange={(event) => setRecord(event.target.value)}
                  borderColor={'purple.400'}
                  textAlign={'center'}
                  fontSize={'2xl'}
                  letterSpacing={1}
                  id='value'
                  type='text'
                  placeholder='Value...'
                  color='purple.400'
                />
              </InputGroup>
              <FormHelperText>Enter the domain value.</FormHelperText>
            </FormControl>

            <Flex
              direction={'column'}
              align={'center'}
              justify={'center'}
              w={'25%'}
              mt={10}
            >
              {loader
                ? (
                  <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='purple.900'
                    color='purple.700'
                    size='xl'
                  />
                  )
                : (
                  <Button
                    onClick={mintDomain}
                    my={5}
                    w={'100%'}
                    bgGradient='linear(to-l, purple.700, purple.900)'
                    color={'white'}
                    letterSpacing={1}
                    _hover={{
                      bg: 'purple.700'
                    }}
                  >
                    MINT
                  </Button>
                  )}
              <Button
                my={5}
                w={'100%'}
                bgGradient='linear(to-l, purple.700, purple.900)'
                color={'white'}
                letterSpacing={1}
                _hover={{
                  bg: 'purple.700'
                }}
              >
                Set Data
              </Button>
            </Flex>

          </Flex>
        </Flex>
      </Flex>
    </Layout>
  )
}

export default Dashboard
