
import './App.css';
import { ChakraProvider, Container, Flex, Grid, VStack, extendTheme, Divider } from '@chakra-ui/react';
import Search from './components/Search';
import Header from './components/Header';

const App = () => {

  const theme = extendTheme({
    styles: {
      global: {
        body: {
          bg: "gray.200"
        }
      }
    }
  });

  return (
    <ChakraProvider theme={theme}>
        <VStack spacing={2}>
          <Header />
          <Search />
        </VStack>
    </ChakraProvider>
  );
}

export default App;
