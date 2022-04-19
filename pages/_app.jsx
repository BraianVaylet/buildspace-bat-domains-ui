/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { ChakraProvider, ColorModeScript, CSSReset } from '@chakra-ui/react'
import { CurrentAccountContextProvider } from 'context/CurrentAccountContext'
import customTheme from '../styles/theme'

function MyApp ({ Component }) {
  return (
    <ChakraProvider theme={customTheme}>
      <CurrentAccountContextProvider>
        <CSSReset />
        <ColorModeScript initialColorMode={customTheme.initialColorMode} />
        <Component />
      </CurrentAccountContextProvider>
    </ChakraProvider>
  )
}

export default MyApp
