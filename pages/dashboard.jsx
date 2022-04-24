/* eslint-disable react/no-children-prop */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { CurrentAccountContext } from 'context/CurrentAccountContext'
import Layout from 'components/Layout'
import { Button, Center, Flex, FormControl, FormHelperText, FormLabel, Heading, Input, InputGroup, InputRightAddon, Spinner, Text, useToast } from '@chakra-ui/react'
import { CONTRACT } from 'utils/contracts'
import { EditIcon } from '@chakra-ui/icons'

const tld = '.bat'

const Dashboard = () => {
  const router = useRouter()
  const toast = useToast()
  const { checkIfWalletIsConnected, currentAccount, chainIdOk } = useContext(CurrentAccountContext)
  const [domain, setDomain] = useState('')
  const [record, setRecord] = useState('')
  const [mints, setMints] = useState([])
  const [loading, setLoading] = useState({ message: '', status: false })
  const [loading2, setLoading2] = useState({ message: '', status: false })

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  useEffect(() => {
    currentAccount === null && router.push('/')
  }, [currentAccount])

  useEffect(() => {
    if (chainIdOk) {
      fetchMints()
    }
  }, [currentAccount, chainIdOk])

  const mintDomain = async () => {
    // Don't run if the domain is empty
    if (!domain) { return }

    setLoading({
      message: 'Minting Domain...',
      status: true
    })

    // Alert the user if the domain is too short
    if (domain.length < 3) {
      console.log('Domain must be at least 3 characters long')
      toast({
        title: 'Domain must be at least 3 characters long',
        status: 'warning',
        duration: 3000,
        isClosable: true
      })
      return
    }
    // Calculate price based on length of domain (change this to match your contract)
    // 3 chars = 0.5 MATIC, 4 chars = 0.3 MATIC, 5 or more = 0.1 MATIC
    const price = domain.length === 3 ? '0.5' : domain.length === 4 ? '0.3' : '0.1'
    console.log('Minting domain', domain, 'with price', price)
    try {
      const { ethereum } = window
      if (ethereum) {
        const contract = handleContract(ethereum)
        let tx = await contract.register(domain, { value: ethers.utils.parseEther(price) })
        // Wait for the transaction to be mined
        const receipt = await tx.wait()

        // Check if the transaction was successfully completed
        if (receipt.status === 1) {
          console.log('Domain minted!' + CONTRACT.BAT_NAME_SERVICE.SCAN + '/' + tx.hash)
          toast({
            title: 'Domain minted!',
            description: `${CONTRACT.BAT_NAME_SERVICE.SCAN}/${tx.hash}`,
            status: 'success',
            duration: 3000,
            isClosable: true
          })
          setLoading({
            message: 'Minting Record...',
            status: true
          })

          // Set the record for the domain
          tx = await contract.setRecord(domain, record)
          await tx.wait()

          console.log('Record set! ' + CONTRACT.BAT_NAME_SERVICE.SCAN + '/' + tx.hash)
          toast({
            title: 'Record set!',
            description: `${CONTRACT.BAT_NAME_SERVICE.SCAN}/${tx.hash}`,
            status: 'success',
            duration: 3000,
            isClosable: true
          })

          // Call fetchMints after 2 seconds
          setTimeout(() => {
            fetchMints()
          }, 2000)

          setRecord('')
          setDomain('')
        } else {
          toast({
            title: 'Transaction failed! Please try again',
            status: 'error',
            duration: 3000,
            isClosable: true
          })
        }
      }
    } catch (error) {
      console.log(error)
    }

    setLoading({
      message: '',
      status: false
    })
  }

  const updateDomain = async () => {
    if (!record || !domain) { return }
    setLoading({
      message: `Updating domain ${domain} with record ${record}`,
      status: false
    })
    console.log('Updating domain', domain, 'with record', record)
    try {
      const { ethereum } = window
      if (ethereum) {
        const contract = handleContract(ethereum)
        const tx = await contract.setRecord(domain, record)
        await tx.wait()
        console.log('Record set! ' + CONTRACT.BAT_NAME_SERVICE.SCAN + '/' + tx.hash)

        fetchMints()
        setRecord('')
        setDomain('')
      }
    } catch (error) {
      console.log(error)
    }
    setLoading({
      message: '',
      status: false
    })
  }

  const fetchMints = async () => {
    setLoading2({
      message: 'Loading...',
      status: true
    })
    try {
      const { ethereum } = window
      if (ethereum) {
        const contract = handleContract(ethereum)
        // Get all the domain names from our contract
        const names = await contract.getAllNames()
        // For each name, get the record and the address
        const mintRecords = await Promise.all(names.map(async (name) => {
          const mintRecord = await contract.records(name)
          const owner = await contract.domains(name)
          return {
            id: names.indexOf(name),
            name: name,
            record: mintRecord,
            owner: owner
          }
        }))

        console.log('MINTS FETCHED ', mintRecords)
        setMints(mintRecords)
      }
    } catch (error) {
      console.log(error)
    }
    setLoading2({
      message: '',
      status: false
    })
  }

  const handleContract = (ethereum) => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      CONTRACT.BAT_NAME_SERVICE.ADDRESS,
      CONTRACT.BAT_NAME_SERVICE.ABI,
      signer
    )
    return contract
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
      contract={[CONTRACT.BAT_NAME_SERVICE]}
    >
      <Flex
        direction={'row'}
        align={'center'}
        justify={'space-between'}
        w={'100%'}
        pb={5}
        pt={20}
        px={'10%'}
      >
        {/* Form */}
        <Flex
          direction={'column'}
          align={'center'}
          justify={'center'}
          w={'45%'}
        >
          <Center
            w={'100%'}
            p={10}
            backgroundColor={'rgba( 0, 0, 0, 0.65 )'}
            boxShadow={'0 8px 32px 0 rgba( 31, 38, 135, 0.37 )'}
            backdropFilter={'blur( 10.5px )'}
            borderRadius={'10px'}
            border={'1px solid rgba( 255, 255, 255, 0.18 )'}
            minHeight={'600px'}
            zIndex={'1'}
            position={'relative'}
          >
            {loading.status &&
              (
                <Flex
                  w={'100%'}
                  h={'100%'}
                  align={'center'}
                  direction={'column'}
                  justify={'center'}
                  backgroundColor={'rgba( 0, 0, 0, 0.45 )'}
                  boxShadow={'0 8px 32px 0 rgba( 31, 38, 135, 0.37 )'}
                  backdropFilter={'blur( 10.5px )'}
                  borderRadius={'10px'}
                  border={'1px solid rgba( 255, 255, 255, 0.18 )'}
                  minHeight={'600px'}
                  zIndex={'2'}
                  position={'absolute'}
                  top={'0'}
                  bottom={'0'}
                  left={'0'}
                  right={'0'}
                >
                  <Spinner
                    thickness='6px'
                    speed='0.65s'
                    emptyColor='purple.900'
                    color='purple.700'
                    size='xl'
                  />
                  <Text>{loading.message}</Text>
                </Flex>
              )}

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
                  align={'flex-start'}
                  justify={'center'}
                  w={'90%'}
                >
                  <InputGroup size='lg'>
                    <Input
                      onChange={(event) => setDomain(event.target.value)}
                      textAlign={'center'}
                      fontSize={'2xl'}
                      letterSpacing={1}
                      id='domain'
                      type='text'
                      placeholder='New domain'
                      color='purple.400'
                      backgroundColor={'rgba( 0, 0, 0, 0.65 )'}
                      boxShadow={'0 8px 32px 0 rgba( 31, 38, 135, 0.37 )'}
                      backdropFilter={'blur( 10.5px )'}
                      borderRadius={'10px'}
                      border={'1px solid rgba( 255, 255, 255, 0.18 )'}
                    />
                    <InputRightAddon
                      backgroundColor={'purple.400'}
                      textAlign={'center'}
                      fontSize={'2xl'}
                      letterSpacing={1}
                      color={'white'}
                      children={tld}
                      border={'1px solid rgba( 255, 255, 255, 0.18 )'}
                    />
                  </InputGroup>
                  <FormHelperText>Enter your domain name.</FormHelperText>
                </FormControl>
                <FormControl
                  isRequired
                  as={Flex}
                  direction={'column'}
                  align={'flex-start'}
                  justify={'center'}
                  w={'90%'}
                  mt={10}
                >
                  <InputGroup size='lg'>
                    <Input
                      onChange={(event) => setRecord(event.target.value)}
                      textAlign={'center'}
                      fontSize={'2xl'}
                      letterSpacing={1}
                      id='value'
                      type='text'
                      placeholder='Record...'
                      color='purple.400'
                      backgroundColor={'rgba( 0, 0, 0, 0.65 )'}
                      boxShadow={'0 8px 32px 0 rgba( 31, 38, 135, 0.37 )'}
                      backdropFilter={'blur( 10.5px )'}
                      borderRadius={'10px'}
                      border={'1px solid rgba( 255, 255, 255, 0.18 )'}
                    />
                  </InputGroup>
                  <FormHelperText>Register your domain.</FormHelperText>
                </FormControl>
                <Flex
                  direction={'column'}
                  align={'center'}
                  justify={'center'}
                  w={'25%'}
                  mt={10}
                >
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

          </Center>
        </Flex>

        {/* List */}
        <Flex
          direction={'column'}
          align={'center'}
          justify={'center'}
          w={'45%'}
        >
          <Flex
            w={'100%'}
            align={'flex-start'}
            justify={'flex-start'}
            direction={'column'}
            p={10}
            backgroundColor={'rgba( 0, 0, 0, 0.65 )'}
            boxShadow={'0 8px 32px 0 rgba( 31, 38, 135, 0.37 )'}
            backdropFilter={'blur( 10.5px )'}
            borderRadius={'10px'}
            border={'1px solid rgba( 255, 255, 255, 0.18 )'}
            minHeight={'600px'}
            maxHeight={'600px'}
            zIndex={'1'}
            position={'relative'}
            overflowY={'scroll'}
            scrollBehavior='smooth'
            className={'scrollbar'}
          >
            {loading2.status &&
              (
                <Flex
                  w={'100%'}
                  h={'100%'}
                  align={'center'}
                  direction={'column'}
                  justify={'center'}
                  backgroundColor={'rgba( 0, 0, 0, 0.45 )'}
                  boxShadow={'0 8px 32px 0 rgba( 31, 38, 135, 0.37 )'}
                  backdropFilter={'blur( 10.5px )'}
                  borderRadius={'10px'}
                  border={'1px solid rgba( 255, 255, 255, 0.18 )'}
                  minHeight={'600px'}
                  zIndex={'2'}
                  position={'absolute'}
                  top={'0'}
                  bottom={'0'}
                  left={'0'}
                  right={'0'}
                >
                  <Spinner
                    thickness='6px'
                    speed='0.65s'
                    emptyColor='purple.900'
                    color='purple.700'
                    size='xl'
                  />
                  <Text>{loading.message}</Text>
                </Flex>
              )}

              <Flex
                direction={'column'}
                align={'flex-start'}
                justify={'flex-start'}
                w={'100%'}
              >
                <Heading mb={5}>Recently minted domains!</Heading>
                {mints && mints.length && mints.map(element => (
                  <Flex
                    key={element.id}
                    direction={'row'}
                    justify={'flex-start'}
                    align={'center'}
                    w={'100%'}
                    my={1}
                    p={5}
                    backgroundColor={'rgba( 0, 0, 0, 0.65 )'}
                    boxShadow={'0 8px 32px 0 rgba( 31, 38, 135, 0.37 )'}
                    backdropFilter={'blur( 10.5px )'}
                    borderRadius={'10px'}
                    border={'1px solid rgba( 255, 255, 255, 0.18 )'}
                  >
                    <Flex
                      key={element.id}
                      direction={'column'}
                      align={'flex-start'}
                      justify={'center'}
                      w={'100%'}
                    >
                      <Text fontSize={'large'} fontWeight={'bold'}>{element.name}</Text>
                      <Text fontSize={'md'} color={'gray.500'}>{element.record}</Text>
                    </Flex>
                    <Button
                    _hover={{
                      color: 'purple.400',
                      cursor: 'pointer'
                    }}
                    >
                      <EditIcon />
                    </Button>
                  </Flex>
                ))}
                {(!mints || mints.length === 0) && (
                  <Text>No domains yet ☹</Text>
                )}
              </Flex>

          </Flex>
        </Flex>
      </Flex>
    </Layout>
  )
}

export default Dashboard
