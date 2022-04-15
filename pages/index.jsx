import React from 'react'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Flex, Icon, IconButton, Image, Link, Text, Tooltip } from '@chakra-ui/react'
import logo from 'public/logo.png'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import MaticIcon from 'components/MaticIcon'

const Home = () => {
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
          w={'50%'}
        >
          <Text
            id='top'
            as='h1'
            fontSize={'3xl'}
            fontWeight={900}
            letterSpacing={'1px'}
            color={'white'}
          >
            {"Hi 👋, I'm Braian"}
          </Text>
          <Image src={logo.src} alt={'taco logo'} w={200} />
          <Text
            as='h3'
            my={5}
            fontSize={'5xl'}
            fontWeight={600}
            letterSpacing={'.5px'}
            color={'white'}
          >
            Welcome to BAT NAME SERVICE
          </Text>
          <Text
            as='h4'
            mb={5}
            fontSize={'3xl'}
            fontWeight={300}
            letterSpacing={'.5px'}
            color={'white'}
          >
            Your immortal API on the blockchain!
          </Text>
          <Accordion w={'100%'} allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex='1' textAlign='left'>
                    <Text
                      color={'white'}
                      as={'h2'}
                      fontSize={30}
                      fontWeight={'bold'}>
                        About the project
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} color={'white'}>
                <Text>
                  lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Text>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

        </Flex>
      <Button
        mt={5}
        py={4}
        px={20}
        color={'white'}
        fontSize={'3xl'}
        fontStyle={'none'}
        as={Link}
        href='/panel'
      >
        Enter
      </Button>

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
            as={Link}
            href={''}
            isExternal
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
            as={Link}
            href={'https://www.linkedin.com/in/braianvaylet/'}
            isExternal
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
            as={Link}
            href={'https://github.com/BraianVaylet/buildspace-taco-dao-ui'}
            isExternal
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
