/* eslint-disable react/prop-types */
import React from 'react'
import { FaEthereum, FaGithub, FaLinkedin, FaWallet } from 'react-icons/fa'
import { Flex, Icon, IconButton, Image, Link, Text, Tooltip, useColorMode } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import LOGO from 'public/logo.png'

const Layout = ({
  title,
  description,
  contract = [],
  head,
  chain = false,
  address = '',
  children
}) => {
  const { colorMode, toggleColorMode } = useColorMode()

  const handleAddress = () => {
    return address.slice(0, 2) + '...' + address.slice(-4)
  }

  return (
    <Flex
      direction={'column'}
      align={'center'}
      justify={'space-between'}
      w={'100%'}
      position={'relative'}
    >
      {head}

      <Flex
        align={'center'}
        justify={'space-between'}
        w={'100%'}
        p={5}
        px={20}
        position={'fixed'}
      >
        <Flex
          w={'50%'}
        >
          <Flex
            align={'center'}
            justify={'space-between'}
            marginRight={10}
          >
            <Image
              src={LOGO.src}
              alt={`logo ${title}`}
              w={20}
              h={20}
            />
            <Flex
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
            {chain
              ? <Text color={'purple.400'}>Connected to <Link href={'https://www.rinkeby.io/#stats'} isExternal>Polygon Testnet</Link></Text>
              : <Text color={'red.600'}>Wrong network</Text>
            }
          </Text>
        </Flex>

        <Text px={'5'}>|</Text>

        <Flex
          align={'center'}
          justify={'space-between'}
        >
          <Icon as={FaWallet} w={5} h={5} />
          <Text px={3}>{handleAddress()}</Text>
        </Flex>

        <Tooltip hasArrow label={'Change theme'} bg={'gray.900'} color={'white'}>
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
        {contract.map(ctr => (
          <Tooltip key={ctr.title} hasArrow label={ctr.title} bg={'gray.900'} color={'white'}>
            <IconButton
              mx={2}
              _hover={{
                cursor: 'pointer',
                color: 'purple.300'
              }}
              as={Link}
              href={`https://rinkeby.etherscan.io/address/${ctr.contract}`}
              isExternal
              icon={<Icon as={FaEthereum} w={7} h={7} />}
            />
          </Tooltip>
        ))}
        <Tooltip hasArrow label={'linkedin'} bg={'gray.900'} color={'white'}>
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
        <Tooltip hasArrow label={'github'} bg={'gray.900'} color={'white'}>
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

      {children}

    </Flex>
  )
}

export default Layout
