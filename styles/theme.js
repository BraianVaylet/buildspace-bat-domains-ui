import { theme, extendTheme } from '@chakra-ui/react'

const customTheme = extendTheme({
  ...theme,
  initialColorMode: 'dark',
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
      },
      // Gradient Scroll Bar width
      '::-webkit-scrollbar, .scrollbar::-webkit-scrollbar': {
        width: '10px'
      },
      // Gradient Scroll Bar track
      '::-webkit-scrollbar-track, .scrollbar::-webkit-scrollbar-track': {
        background: props.colorMode === 'dark' ? 'black' : 'white'
      },
      // Gradient Scroll Bar handle
      '::-webkit-scrollbar-thumb, .scrollbar::-webkit-scrollbar-thumb': {
        background: 'linear-gradient(#B794F4, #805AD5)'
      },
      pre: {
        '::-webkit-scrollbar, .scrollbar::-webkit-scrollbar': {
          height: '5px'
        },
        '::-webkit-scrollbar-thumb, .scrollbar::-webkit-scrollbar-thumb': {
          background: '#805AD5'
        }
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
