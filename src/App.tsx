import { DailyRatesDashboard } from './components/DailyRatesDashboard';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import styled, { createGlobalStyle } from 'styled-components';

const queryClient = new QueryClient();

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }
  body {
    background: rgb(212,134,171);
    background: linear-gradient(43deg, rgba(212,134,171,1) 0%, rgba(224,179,139,1) 100%);
    background-repeat: no-repeat;
    background-attachment: fixed;
    margin: 0;
    font-family: Poppins, Helvetica, sans-serif;
    padding: 1rem
  }
`;

const Wrapper = styled.main`
  padding: 2rem 1rem;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <QueryClientProvider client={queryClient}>
          <DailyRatesDashboard />
        </QueryClientProvider>
      </Wrapper>
    </>

  );
}

export default App;
