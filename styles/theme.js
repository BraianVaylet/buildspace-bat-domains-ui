import { theme, extendTheme } from '@chakra-ui/react'

const customTheme = extendTheme({
  ...theme,
  initialColorMode: 'light',
  useSystemColorMode: true,
  styles: {
    global: props => ({
      'html, body': {
        fontSize: 'md',
        color: props.colorMode === 'dark' ? 'white' : 'gray.600',
        lineHeight: 'tall',
        scrollBehavior: 'smooth'
      },
      a: {
        color: props.colorMode === 'dark' ? 'purple.300' : 'purple.500'
      }
    })
  },
  colors: {
    brand: {
      primary: 'purple.300',
      secondary: 'blue.400'
    }
  }
})

export default customTheme
