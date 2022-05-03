/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react'
import Link from 'next/link'
import { Link as ChakraLink, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Flex, Icon, IconButton, Image, Text, Tooltip, useToast } from '@chakra-ui/react'
import logo from 'public/logo.png'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import MaticIcon from 'components/MaticIcon'
import { CurrentAccountContext } from 'context/CurrentAccountContext'

// Create a function to render if wallet is not connected yet
const RenderNotConnectedContainer = (action) => (
  <Button
    py={5}
    px={25}
    fontSize={20}
    letterSpacing={1}
    bgGradient='linear(to-l, purple.700, purple.900)'
    color={'white'}
    onClick={action}
  >
    Connect Wallet
  </Button>
)

const RenderConnectedContainer = () => (
  <Button
    py={5}
    px={25}
    fontSize={20}
    letterSpacing={1}
    bgGradient='linear(to-l, purple.700, purple.900)'
    color={'white'}
  >
  <Link href="/dashboard">
    <a>Go to dashboard</a>
  </Link>
  </Button>
)

const Home = () => {
  const toast = useToast()
  const { checkIfWalletIsConnected, checkNetwork, connectWallet, currentAccount, message } = useContext(CurrentAccountContext)

  useEffect(() => {
    checkIfWalletIsConnected()
    checkNetwork()
  }, [])

  useEffect(() => {
    if (message) {
      toast({
        title: message.title,
        status: message.status,
        duration: 3000,
        isClosable: true
      })
    }
  }, [])

  return (
    <Flex
      maxW={'100vw'}
      minH={'100vh'}
      py={50}
      direction={'column'}
      align={'center'}
      justify={'center'}
      bgGradient='linear(to-l, purple.700, purple.900)'
    >
      <Flex
        align={'center'}
        justify={'center'}
        direction={'column'}
        w={['50%', '50%', '100%', '100%']}
      >
        <Text
          id='top'
          as='h1'
          fontSize={['xl', 'xl', '3xl', '3xl']}
          fontWeight={900}
          letterSpacing={'1px'}
          color={'white'}
        >
          {"Hi 👋, I'm Braian"}
        </Text>
        <Image src={logo.src} alt={'taco logo'} w={[150, 150, 200, 200]} />
        <Text
          as='h3'
          my={5}
          fontSize={['2xl', '2xl', '5xl', '5xl']}
          fontWeight={600}
          letterSpacing={'.5px'}
          color={'white'}
        >
          Welcome to BAT NAME SERVICE
        </Text>
        <Text
          as='h4'
          mb={5}
          fontSize={['xl', 'xl', '3xl', '3xl']}
          fontWeight={300}
          letterSpacing={'.5px'}
          color={'white'}
        >
          Your immortal API on the blockchain!
        </Text>
      </Flex>

      <Flex
        align={'center'}
        justify={'center'}
        flexDirection={'column'}
        w={'100%'}
        p={5}
        my={5}
      >
        {
          !currentAccount || currentAccount === null
            ? RenderNotConnectedContainer(connectWallet)
            : RenderConnectedContainer()
        }
      </Flex>

      <Flex
        mt={100}
      >
        <Tooltip hasArrow label={'polygon contract'} bg={'gray.900'} color={'white'}>
          <IconButton
            mx={2}
            _hover={{
              cursor: 'pointer',
              color: 'purple.400'
            }}
            as={ChakraLink}
            href={''}
            isExternal
            bgGradient='linear(to-l, purple.700, purple.900)'
            color={'white'}
            w={50}
            h={50}
            icon={
              <MaticIcon
                w={'100%'}
                h={'100%'}
                size={32}
                _hover={{
                  cursor: 'pointer',
                  color: 'purple.400'
                }}
              />
            }
          />
        </Tooltip>
        <Tooltip hasArrow label={'linkedin'} bg={'gray.900'} color={'white'}>
          <IconButton
            mx={2}
            _hover={{
              cursor: 'pointer',
              color: 'purple.400'
            }}
            as={ChakraLink}
            href={'https://www.linkedin.com/in/braianvaylet/'}
            isExternal
            bgGradient='linear(to-l, purple.700, purple.900)'
            color={'white'}
            w={50}
            h={50}
            icon={<Icon
              as={FaLinkedin}
              w={'100%'}
              h={'100%'}
            />}
          />
        </Tooltip>
        <Tooltip hasArrow label={'github'} bg={'gray.900'} color={'white'}>
          <IconButton
            mx={2}
            _hover={{
              cursor: 'pointer',
              color: 'purple.400'
            }}
            as={ChakraLink}
            href={'https://github.com/BraianVaylet/buildspace-taco-dao-ui'}
            isExternal
            bgGradient='linear(to-l, purple.700, purple.900)'
            color={'white'}
            w={50}
            h={50}
            icon={<Icon
              as={FaGithub}
              w={'100%'}
              h={'100%'}
            />}
          />
        </Tooltip>
      </Flex>
    </Flex>
  )
}

export default Home
