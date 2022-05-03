/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react'
import { FaGithub, FaLinkedin, FaWallet } from 'react-icons/fa'
import { Button, Flex, Icon, IconButton, Image, Link, Text, Tooltip, useColorMode, useToast } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import LOGO from 'public/logo.png'
import MaticIcon from './MaticIcon'
import { CONTRACT } from 'utils/contracts'
import { CurrentAccountContext } from 'context/CurrentAccountContext'

const Layout = ({
  title,
  description,
  contract = [],
  head,
  address = '',
  themes = false,
  children
}) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const toast = useToast()
  const { message, chainIdOk, switchNetwork } = useContext(CurrentAccountContext)

  useEffect(() => {
    if (message) {
      toast({
        title: message.title,
        status: message.status,
        duration: 3000,
        isClosable: true
      })
    }
  }, [message])

  const handleAddress = () => {
    return address.slice(0, 2) + '...' + address.slice(-4)
  }

  return (
    <Flex
      direction={'column'}
      align={'center'}
      justify={'flex-start'}
      w={'100%'}
      minH={['100%', '100%', '100vh', '100vh']}
      bgGradient='linear(to-l, purple.700, purple.900)'
    >
      {head}

      <Flex
        align={'center'}
        justify={'space-between'}
        w={'100%'}
        p={5}
        px={[5, 5, 20, 20]}
      >
        <Flex w={'100%'} display={['none', 'none', 'flex', 'flex']}>
          <Flex
            align={'center'}
            justify={'space-between'}
            marginRight={10}
          >
            <Image
              src={LOGO.src}
              alt={`logo ${title}`}
              w={[5, 5, 20, 20]}
              h={[5, 5, 20, 20]}
            />
            <Flex
              display={['none', 'none', 'flex', 'flex']}
              direction={'column'}
              align={'flex-start'}
              justify={'center'}
              mx={5}
              w={'100%'}
            >
              <Text
                fontSize={'2xl'}
                fontWeight={'bold'}
                letterSpacing={1}
              >
                {title}
              </Text>
              <Text
                fontSize={'md'}
                fontWeight={'normal'}
                letterSpacing={1}
                lineHeight={0.75}
              >
                {description}
              </Text>

            </Flex>
          </Flex>
        </Flex>

        <Flex
          width={'50%'}
          flexDirection={'row'}
          justifyContent={'flex-end'}
          align={'center'}
        >
          <Text>
            {chainIdOk
              ? <Text color={'purple.400'}>Connected to <Link href={'https://polygonscan.freshstatus.io/'} isExternal>Polygon Testnet</Link></Text>
              : <Text color={'red.600'}>Wrong network</Text>
            }
          </Text>
        </Flex>

        <Text px={'5'}>|</Text>

        <Flex
          display={['none', 'none', 'flex', 'flex']}
          align={'center'}
          justify={'space-between'}
        >
          <Icon as={FaWallet} w={5} h={5} />
          <Text px={3}>{handleAddress()}</Text>
        </Flex>

        {themes && (
          <Tooltip
            display={['none', 'none', 'block', 'block']}
            hasArrow
            label={'Change theme'}
            bg={'gray.900'}
            color={'white'}
          >
            <IconButton
              mx={2}
              _hover={{
                cursor: 'pointer',
                color: 'purple.300'
              }}
              onClick={toggleColorMode}
              icon={
                colorMode === 'light'
                  ? <MoonIcon w={5} h={5} />
                  : <SunIcon w={5} h={5} />
              }
            />
          </Tooltip>
        )}
        {contract.map((ctr, index) => (
          <Tooltip
            display={['none', 'none', 'block', 'block']}
            key={ctr.title + index}
            hasArrow
            label={ctr.title}
            bg={'gray.900'}
            color={'white'}
          >
            <IconButton
              mx={2}
              _hover={{
                cursor: 'pointer',
                color: 'purple.300'
              }}
              as={Link}
              href={`${CONTRACT.SCAN}${ctr.contract}`}
              isExternal
              icon={
                <MaticIcon
                  w={'75%'}
                  h={'75%'}
                  size={34}
                  _hover={{
                    cursor: 'pointer',
                    color: 'purple.400'
                  }}
                />
              }
            />
          </Tooltip>
        ))}
        <Tooltip
          display={['none', 'none', 'block', 'block']}
          hasArrow
          label={'linkedin'}
          bg={'gray.900'}
          color={'white'}
        >
          <IconButton
            mx={2}
            _hover={{
              cursor: 'pointer',
              color: 'purple.300'
            }}
            as={Link}
            href={'https://www.linkedin.com/in/braianvaylet/'}
            isExternal
            icon={<Icon as={FaLinkedin} w={7} h={7} />}
          />
        </Tooltip>
        <Tooltip
          display={['none', 'none', 'block', 'block']}
          hasArrow
          label={'github'}
          bg={'gray.900'}
          color={'white'}
        >
          <IconButton
            mx={2}
            _hover={{
              cursor: 'pointer',
              color: 'purple.300'
            }}
            as={Link}
            href={'https://github.com/BraianVaylet/buildspace-taco-dao-ui'}
            isExternal
            icon={<Icon as={FaGithub} w={7} h={7} />}
          />
        </Tooltip>
      </Flex>
      <Flex
        w={'100%'}
        h={'100%'}
        align={'center'}
        direction={'column'}
        justify={'center'}
      >
        {!chainIdOk &&
          (
            <Flex
              w={'100%'}
              h={['100%', '100%', '100vh', '100vh']}
              direction={'column'}
              align={'center'}
              justify={'center'}
              backgroundColor={'rgba( 0, 0, 0, 0.45 )'}
              boxShadow={'0 8px 32px 0 rgba( 31, 38, 135, 0.37 )'}
              backdropFilter={'blur( 10.5px )'}
              border={'1px solid rgba( 255, 255, 255, 0.18 )'}
              position={'absolute'}
              top={'0'}
              bottom={'0'}
              left={'0'}
              right={'0'}
              zIndex={'3'}
            >
              <Text fontSize={'3xl'} mb={10}>
                Please connect to a correct network.
              </Text>
              <Flex
                direction={'column'}
                align={'flex-start'}
                justify={'flex-start'}
                mb={10}
              >
                <Text fontWeight={'bold'} fontSize={'2xl'}>Metamask Network Parameters</Text>
                <Text>Network Name: Polygon Mumbai Testnet</Text>
                <Text>New RPC URL: https://matic-mumbai.chainstacklabs.com</Text>
                <Text>Chain ID: 80001</Text>
                <Text>Currency Symbol: MATIC</Text>
                <Text>Block Explorer URL: https://mumbai.polygonscan.com/</Text>
              </Flex>
              <Button onClick={switchNetwork}>Switch Network</Button>
            </Flex>
          )
        }
        {children}
      </Flex>
    </Flex>
  )
}

export default Layout
