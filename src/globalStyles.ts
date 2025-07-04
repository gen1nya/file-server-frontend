import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
    min-height: 100vh;
  }
  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: none;
  }
`;
